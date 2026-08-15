import { z } from "zod";
import { calendarDateSchema } from "@/shared/validation/calendar-date";
import type {
  CreatePurchaseInput,
  UpdatePurchaseInput,
} from "@/shared/validation/purchase";
import type { CalendarDate } from "@/shared/lib/calendar-date";
import type { PurchaseRecord } from "@/server/mappers/purchase";

export const purchaseFormSchema = z.object({
  productName: z.string().trim().min(1, "Product name is required"),
  storeName: z.string().trim().min(1, "Store name is required"),
  purchaseDate: calendarDateSchema,
  priceEur: z
    .string()
    .trim()
    .min(1, "Price is required")
    .refine((value) => parsePriceEurToCents(value) !== null, {
      message: "Enter a valid price in EUR",
    }),
  returnPolicyDays: z
    .string()
    .refine(
      (value) => {
        const trimmed = value.trim();
        if (trimmed === "") {
          return true;
        }

        const days = Number(trimmed);
        return Number.isInteger(days) && days >= 0;
      },
      { message: "Enter a whole number of days or leave blank" },
    ),
});

export type PurchaseFormValues = z.infer<typeof purchaseFormSchema>;

export function parsePriceEurToCents(value: string): number | null {
  const normalized = value.trim().replace(",", ".");
  if (!normalized) {
    return null;
  }

  const amount = Number(normalized);
  if (!Number.isFinite(amount) || amount < 0) {
    return null;
  }

  return Math.round(amount * 100);
}

function formValuesToPurchaseFields(
  values: PurchaseFormValues,
): Omit<CreatePurchaseInput, "currency"> & { currency: "EUR" } {
  const priceCents = parsePriceEurToCents(values.priceEur);
  if (priceCents === null) {
    throw new Error("Invalid price");
  }

  const trimmedReturnPolicyDays = values.returnPolicyDays.trim();

  return {
    productName: values.productName.trim(),
    storeName: values.storeName.trim(),
    purchaseDate: values.purchaseDate as CalendarDate,
    priceCents,
    currency: "EUR",
    returnPolicyDays:
      trimmedReturnPolicyDays === ""
        ? undefined
        : Number(trimmedReturnPolicyDays),
  };
}

export function purchaseFormToCreateInput(
  values: PurchaseFormValues,
): CreatePurchaseInput {
  return formValuesToPurchaseFields(values);
}

export function purchaseFormToUpdateInput(
  id: string,
  values: PurchaseFormValues,
): UpdatePurchaseInput {
  return {
    id,
    ...formValuesToPurchaseFields(values),
  };
}

export function purchaseRecordToFormValues(
  record: PurchaseRecord,
): PurchaseFormValues {
  return {
    productName: record.productName,
    storeName: record.storeName,
    purchaseDate: record.purchaseDate,
    priceEur: (record.priceCents / 100).toFixed(2),
    returnPolicyDays:
      record.returnCase?.returnPolicyDays !== undefined
        ? String(record.returnCase.returnPolicyDays)
        : "",
  };
}

const serverFieldToFormField: Record<string, keyof PurchaseFormValues> = {
  productName: "productName",
  storeName: "storeName",
  purchaseDate: "purchaseDate",
  priceCents: "priceEur",
  returnPolicyDays: "returnPolicyDays",
};

export function mapServerFieldErrors(
  fieldErrors: Record<string, string[]>,
): Partial<Record<keyof PurchaseFormValues, string>> {
  const mapped: Partial<Record<keyof PurchaseFormValues, string>> = {};

  for (const [key, messages] of Object.entries(fieldErrors)) {
    if (key === "_root" || messages.length === 0) {
      continue;
    }

    const formField = serverFieldToFormField[key];
    if (formField) {
      mapped[formField] = messages[0];
    }
  }

  return mapped;
}
