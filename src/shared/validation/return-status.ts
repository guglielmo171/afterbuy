import { z } from "zod";
import { PERSISTED_RETURN_STATUSES } from "@/entities/return-case/model/types";

export const updateReturnStatusInputSchema = z.object({
  purchaseId: z.string().min(1),
  status: z.enum(PERSISTED_RETURN_STATUSES),
});

export type UpdateReturnStatusInput = z.output<
  typeof updateReturnStatusInputSchema
>;
