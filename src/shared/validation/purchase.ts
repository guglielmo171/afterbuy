import { z } from "zod";
import { calendarDateSchema } from "@/shared/validation/calendar-date";

const purchaseFieldsSchema = z.object({
  productName: z.string().trim().min(1),
  storeName: z.string().trim().min(1),
  purchaseDate: calendarDateSchema,
  priceCents: z.number().int().min(0),
  currency: z.string().min(1).default("EUR"),
  returnPolicyDays: z.number().int().min(0).optional(),
});

export const createPurchaseInputSchema = purchaseFieldsSchema;

export const updatePurchaseInputSchema = purchaseFieldsSchema.extend({
  id: z.string().min(1),
});

export type CreatePurchaseInput = z.output<typeof createPurchaseInputSchema>;
export type UpdatePurchaseInput = z.output<typeof updatePurchaseInputSchema>;
