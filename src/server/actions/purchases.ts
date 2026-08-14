"use server";

import { ZodError, type ZodTypeAny } from "zod";
import {
  createPurchaseInputSchema,
  updatePurchaseInputSchema,
} from "@/shared/validation/purchase";
import { updateReturnStatusInputSchema } from "@/shared/validation/return-status";
import {
  createPurchaseRecord,
  updatePurchaseRecord,
  updateReturnStatusRecord,
} from "@/server/repositories/purchase-repository";
import {
  InvalidReturnStatusTransitionError,
  PurchaseNotFoundError,
  ReturnCaseMissingError,
} from "@/server/errors";
import type { PurchaseRecord } from "@/server/mappers/purchase";
import type { ActionResult } from "@/server/actions/result";

function fieldErrorsFromZod(error: ZodError): Record<string, string[]> {
  const { fieldErrors, formErrors } = error.flatten();
  const result: Record<string, string[]> = {};

  for (const [key, messages] of Object.entries(fieldErrors)) {
    if (messages && messages.length > 0) {
      result[key] = messages;
    }
  }

  if (formErrors.length > 0) {
    result._root = formErrors;
  }

  return result;
}

function parseInput<TSchema extends ZodTypeAny>(
  schema: TSchema,
  input: unknown,
):
  | { ok: true; data: TSchema["_output"] }
  | { ok: false; fieldErrors: Record<string, string[]> } {
  const parsed = schema.safeParse(input);
  if (parsed.success) {
    return { ok: true, data: parsed.data };
  }

  return { ok: false, fieldErrors: fieldErrorsFromZod(parsed.error) };
}

function failureFromError(error: unknown): ActionResult<never> {
  if (
    error instanceof PurchaseNotFoundError ||
    error instanceof ReturnCaseMissingError ||
    error instanceof InvalidReturnStatusTransitionError
  ) {
    return { ok: false, error: error.message };
  }

  throw error;
}

export async function createPurchase(
  input: unknown,
): Promise<ActionResult<PurchaseRecord>> {
  const parsed = parseInput(createPurchaseInputSchema, input);
  if (!parsed.ok) {
    return {
      ok: false,
      error: "Invalid input",
      fieldErrors: parsed.fieldErrors,
    };
  }

  try {
    const data = await createPurchaseRecord(parsed.data);
    return { ok: true, data };
  } catch (error) {
    return failureFromError(error);
  }
}

export async function updatePurchase(
  input: unknown,
): Promise<ActionResult<PurchaseRecord>> {
  const parsed = parseInput(updatePurchaseInputSchema, input);
  if (!parsed.ok) {
    return {
      ok: false,
      error: "Invalid input",
      fieldErrors: parsed.fieldErrors,
    };
  }

  try {
    const data = await updatePurchaseRecord(parsed.data);
    return { ok: true, data };
  } catch (error) {
    return failureFromError(error);
  }
}

export async function updateReturnStatus(
  input: unknown,
): Promise<ActionResult<PurchaseRecord>> {
  const parsed = parseInput(updateReturnStatusInputSchema, input);
  if (!parsed.ok) {
    return {
      ok: false,
      error: "Invalid input",
      fieldErrors: parsed.fieldErrors,
    };
  }

  try {
    const data = await updateReturnStatusRecord(
      parsed.data.purchaseId,
      parsed.data.status,
    );
    return { ok: true, data };
  } catch (error) {
    return failureFromError(error);
  }
}
