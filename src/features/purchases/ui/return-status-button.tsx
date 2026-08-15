"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { nextReturnStatus } from "@/entities/return-case/lib/return-status-transition";
import type { ReturnStatus } from "@/entities/return-case/model/types";
import { formatReturnStatusActionLabel } from "@/features/purchases/lib/return-display";
import { updateReturnStatus } from "@/server/actions/purchases";

type ReturnStatusButtonProps = {
  purchaseId: string;
  currentStatus: ReturnStatus;
};

export function ReturnStatusButton({
  purchaseId,
  currentStatus,
}: ReturnStatusButtonProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const nextStatus = nextReturnStatus(currentStatus);

  if (!nextStatus) {
    return null;
  }

  async function handleClick() {
    setError(null);
    setIsPending(true);

    const result = await updateReturnStatus({
      purchaseId,
      status: nextStatus,
    });

    setIsPending(false);

    if (result.ok) {
      router.refresh();
      return;
    }

    setError(result.error);
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={isPending}
        className="inline-flex min-h-11 items-center justify-center rounded-button bg-neutral-900 px-5 text-sm font-medium text-white transition-colors hover:bg-neutral-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending
          ? "Updating…"
          : formatReturnStatusActionLabel(nextStatus)}
      </button>
      {error ? (
        <p className="mt-3 text-sm text-signal-red" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
