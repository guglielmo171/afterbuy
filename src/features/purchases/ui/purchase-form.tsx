"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createPurchase,
  updatePurchase,
} from "@/server/actions/purchases";
import { routes } from "@/shared/constants/routes";
import {
  mapServerFieldErrors,
  purchaseFormSchema,
  purchaseFormToCreateInput,
  purchaseFormToUpdateInput,
  type PurchaseFormValues,
} from "@/features/purchases/lib/purchase-form-schema";

type PurchaseFormProps = {
  mode: "create" | "edit";
  purchaseId?: string;
  defaultValues: PurchaseFormValues;
};

const inputClassName =
  "min-h-11 w-full rounded-input border border-neutral-300 bg-white px-3 text-base text-neutral-900 placeholder:text-neutral-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900";

const labelClassName = "text-sm font-medium text-neutral-900";

const hintClassName = "text-sm text-neutral-500";

const fieldErrorClassName = "text-sm text-signal-red";

function FieldError({ id, message }: { id?: string; message?: string }) {
  if (!message) {
    return null;
  }

  return (
    <p id={id} className={fieldErrorClassName} role="alert">
      {message}
    </p>
  );
}

export function PurchaseForm({
  mode,
  purchaseId,
  defaultValues,
}: PurchaseFormProps) {
  const router = useRouter();
  const [actionError, setActionError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<PurchaseFormValues>({
    resolver: zodResolver(purchaseFormSchema),
    defaultValues,
  });

  async function onSubmit(values: PurchaseFormValues) {
    setActionError(null);

    const result =
      mode === "create"
        ? await createPurchase(purchaseFormToCreateInput(values))
        : await updatePurchase(
            purchaseFormToUpdateInput(purchaseId!, values),
          );

    if (result.ok) {
      router.push(routes.purchaseDetail(result.data.id));
      return;
    }

    if (result.fieldErrors) {
      const mappedErrors = mapServerFieldErrors(result.fieldErrors);
      for (const [field, message] of Object.entries(mappedErrors)) {
        setError(field as keyof PurchaseFormValues, { message });
      }
    }

    setActionError(result.error);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-card border border-neutral-200 bg-white p-6 shadow-card sm:p-8"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="productName" className={labelClassName}>
            Product
          </label>
          <input
            id="productName"
            type="text"
            autoComplete="off"
            className={inputClassName}
            aria-invalid={errors.productName ? "true" : undefined}
            aria-describedby={
              errors.productName ? "productName-error" : undefined
            }
            {...register("productName")}
          />
          <FieldError
            id="productName-error"
            message={errors.productName?.message}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="storeName" className={labelClassName}>
            Store
          </label>
          <input
            id="storeName"
            type="text"
            autoComplete="off"
            className={inputClassName}
            aria-invalid={errors.storeName ? "true" : undefined}
            aria-describedby={errors.storeName ? "storeName-error" : undefined}
            {...register("storeName")}
          />
          <FieldError id="storeName-error" message={errors.storeName?.message} />
        </div>

        <div className="space-y-2">
          <label htmlFor="purchaseDate" className={labelClassName}>
            Purchase date
          </label>
          <input
            id="purchaseDate"
            type="date"
            className={inputClassName}
            aria-invalid={errors.purchaseDate ? "true" : undefined}
            aria-describedby={
              errors.purchaseDate ? "purchaseDate-error" : undefined
            }
            {...register("purchaseDate")}
          />
          <FieldError
            id="purchaseDate-error"
            message={errors.purchaseDate?.message}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="priceEur" className={labelClassName}>
            Price (EUR)
          </label>
          <input
            id="priceEur"
            type="text"
            inputMode="decimal"
            autoComplete="off"
            placeholder="0.00"
            className={inputClassName}
            aria-invalid={errors.priceEur ? "true" : undefined}
            aria-describedby={errors.priceEur ? "priceEur-error" : undefined}
            {...register("priceEur")}
          />
          <FieldError id="priceEur-error" message={errors.priceEur?.message} />
        </div>

        <div className="space-y-2">
          <label htmlFor="returnPolicyDays" className={labelClassName}>
            Return policy (days)
          </label>
          <input
            id="returnPolicyDays"
            type="number"
            min={0}
            step={1}
            inputMode="numeric"
            placeholder="Optional"
            className={inputClassName}
            aria-invalid={errors.returnPolicyDays ? "true" : undefined}
            aria-describedby={
              errors.returnPolicyDays
                ? "returnPolicyDays-error"
                : "returnPolicyDays-hint"
            }
            {...register("returnPolicyDays")}
          />
          <p id="returnPolicyDays-hint" className={hintClassName}>
            Leave blank if there is no return window to track.
          </p>
          <FieldError
            id="returnPolicyDays-error"
            message={errors.returnPolicyDays?.message}
          />
        </div>
      </div>

      {actionError ? (
        <p className="mt-6 text-sm text-signal-red" role="alert">
          {actionError}
        </p>
      ) : null}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-11 items-center justify-center rounded-button bg-neutral-900 px-5 text-sm font-medium text-white transition-colors hover:bg-neutral-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting
            ? "Saving…"
            : mode === "create"
              ? "Add purchase"
              : "Save changes"}
        </button>
      </div>
    </form>
  );
}
