import type { Prisma } from "@prisma/client";
import { prisma } from "@/server/db/prisma";
import { calculateReturnDeadline } from "@/entities/return-case/lib/calculate-return-deadline";
import { isValidReturnStatusTransition } from "@/entities/return-case/lib/return-status-transition";
import type { ReturnStatus } from "@/entities/return-case/model/types";
import {
  calendarDateToUtcMidnight,
  utcMidnightToCalendarDate,
} from "@/shared/lib/calendar-date";
import type {
  CreatePurchaseInput,
  UpdatePurchaseInput,
} from "@/shared/validation/purchase";
import {
  InvalidReturnStatusTransitionError,
  PurchaseNotFoundError,
  ReturnCaseMissingError,
} from "@/server/errors";
import {
  mapPurchase,
  type PurchaseRecord,
} from "@/server/mappers/purchase";

const purchaseWriteInclude = {
  store: { select: { id: true, name: true } },
  returnCase: {
    select: {
      id: true,
      returnPolicyDays: true,
      returnDeadline: true,
      status: true,
    },
  },
} satisfies Prisma.PurchaseInclude;

type PurchaseWriteClient = Prisma.TransactionClient | typeof prisma;

function resolveReturnPolicyDays(
  override: number | undefined,
  storeDefault: number | null,
): number | undefined {
  if (override !== undefined) {
    return override;
  }

  if (storeDefault !== null) {
    return storeDefault;
  }

  return undefined;
}

async function findOrCreateStoreByName(
  client: PurchaseWriteClient,
  name: string,
) {
  return client.store.upsert({
    where: { name },
    create: { name },
    update: {},
  });
}

async function getMappedPurchase(
  client: PurchaseWriteClient,
  id: string,
): Promise<PurchaseRecord> {
  const row = await client.purchase.findUnique({
    where: { id },
    include: purchaseWriteInclude,
  });

  if (!row) {
    throw new PurchaseNotFoundError();
  }

  return mapPurchase(row);
}

export async function getPurchaseById(
  id: string,
): Promise<PurchaseRecord | null> {
  const row = await prisma.purchase.findUnique({
    where: { id },
    include: purchaseWriteInclude,
  });

  if (!row) {
    return null;
  }

  return mapPurchase(row);
}

export async function createPurchaseRecord(
  input: CreatePurchaseInput,
): Promise<PurchaseRecord> {
  return prisma.$transaction(async (tx) => {
    const store = await findOrCreateStoreByName(tx, input.storeName);
    const returnPolicyDays = resolveReturnPolicyDays(
      input.returnPolicyDays,
      store.defaultReturnPolicyDays,
    );

    const purchase = await tx.purchase.create({
      data: {
        productName: input.productName,
        storeId: store.id,
        purchaseDate: calendarDateToUtcMidnight(input.purchaseDate),
        priceCents: input.priceCents,
        currency: input.currency,
        ...(returnPolicyDays !== undefined
          ? {
              returnCase: {
                create: {
                  returnPolicyDays,
                  returnDeadline: calendarDateToUtcMidnight(
                    calculateReturnDeadline(
                      input.purchaseDate,
                      returnPolicyDays,
                    ),
                  ),
                  status: "not_planned",
                },
              },
            }
          : {}),
        timelineEvents: {
          create: {
            type: "purchased",
            description: "Purchase recorded",
          },
        },
      },
      include: purchaseWriteInclude,
    });

    return mapPurchase(purchase);
  });
}

export async function updatePurchaseRecord(
  input: UpdatePurchaseInput,
): Promise<PurchaseRecord> {
  return prisma.$transaction(async (tx) => {
    const existing = await tx.purchase.findUnique({
      where: { id: input.id },
      include: { returnCase: true },
    });

    if (!existing) {
      throw new PurchaseNotFoundError();
    }

    const store = await findOrCreateStoreByName(tx, input.storeName);
    const returnPolicyDays = resolveReturnPolicyDays(
      input.returnPolicyDays,
      store.defaultReturnPolicyDays,
    );

    const purchaseDateChanged =
      utcMidnightToCalendarDate(existing.purchaseDate) !== input.purchaseDate;

    await tx.purchase.update({
      where: { id: input.id },
      data: {
        productName: input.productName,
        storeId: store.id,
        purchaseDate: calendarDateToUtcMidnight(input.purchaseDate),
        priceCents: input.priceCents,
        currency: input.currency,
      },
    });

    if (returnPolicyDays !== undefined) {
      const returnDeadline = calendarDateToUtcMidnight(
        calculateReturnDeadline(input.purchaseDate, returnPolicyDays),
      );

      if (existing.returnCase) {
        await tx.returnCase.update({
          where: { id: existing.returnCase.id },
          data: {
            returnPolicyDays,
            returnDeadline,
          },
        });
      } else {
        await tx.returnCase.create({
          data: {
            purchaseId: input.id,
            returnPolicyDays,
            returnDeadline,
            status: "not_planned",
          },
        });
      }
    } else if (existing.returnCase && purchaseDateChanged) {
      await tx.returnCase.update({
        where: { id: existing.returnCase.id },
        data: {
          returnDeadline: calendarDateToUtcMidnight(
            calculateReturnDeadline(
              input.purchaseDate,
              existing.returnCase.returnPolicyDays,
            ),
          ),
        },
      });
    }

    return getMappedPurchase(tx, input.id);
  });
}

export async function updateReturnStatusRecord(
  purchaseId: string,
  status: ReturnStatus,
): Promise<PurchaseRecord> {
  return prisma.$transaction(async (tx) => {
    const existing = await tx.purchase.findUnique({
      where: { id: purchaseId },
      include: { returnCase: true },
    });

    if (!existing) {
      throw new PurchaseNotFoundError();
    }

    if (!existing.returnCase) {
      throw new ReturnCaseMissingError();
    }

    const currentStatus = existing.returnCase.status as ReturnStatus;

    if (!isValidReturnStatusTransition(currentStatus, status)) {
      throw new InvalidReturnStatusTransitionError(currentStatus, status);
    }

    await tx.returnCase.update({
      where: { id: existing.returnCase.id },
      data: { status },
    });

    await tx.timelineEvent.create({
      data: {
        purchaseId,
        type: "return_status_changed",
        description: `Return status set to ${status}`,
      },
    });

    return getMappedPurchase(tx, purchaseId);
  });
}
