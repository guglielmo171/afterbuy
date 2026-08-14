import {
  PERSISTED_RETURN_STATUSES,
  type ReturnStatus,
} from "@/entities/return-case/model/types";
import {
  utcMidnightToCalendarDate,
  type CalendarDate,
} from "@/shared/lib/calendar-date";

export type ReturnCaseRecord = {
  id: string;
  returnPolicyDays: number;
  returnDeadline: CalendarDate;
  status: ReturnStatus;
};

export type PurchaseRecord = {
  id: string;
  productName: string;
  storeId: string;
  storeName: string;
  purchaseDate: CalendarDate;
  priceCents: number;
  currency: string;
  returnCase: ReturnCaseRecord | null;
};

export type PurchasePersistence = {
  id: string;
  productName: string;
  storeId: string;
  purchaseDate: Date;
  priceCents: number;
  currency: string;
  store: { id: string; name: string };
  returnCase: {
    id: string;
    returnPolicyDays: number;
    returnDeadline: Date;
    status: string;
  } | null;
};

function mapReturnStatus(status: string): ReturnStatus {
  if (
    (PERSISTED_RETURN_STATUSES as readonly string[]).includes(status)
  ) {
    return status as ReturnStatus;
  }

  throw new Error("Invalid persisted return status");
}

export function mapPurchase(row: PurchasePersistence): PurchaseRecord {
  return {
    id: row.id,
    productName: row.productName,
    storeId: row.storeId,
    storeName: row.store.name,
    purchaseDate: utcMidnightToCalendarDate(row.purchaseDate),
    priceCents: row.priceCents,
    currency: row.currency,
    returnCase: row.returnCase
      ? {
          id: row.returnCase.id,
          returnPolicyDays: row.returnCase.returnPolicyDays,
          returnDeadline: utcMidnightToCalendarDate(
            row.returnCase.returnDeadline,
          ),
          status: mapReturnStatus(row.returnCase.status),
        }
      : null,
  };
}
