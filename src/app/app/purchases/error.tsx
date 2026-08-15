"use client";

type PurchasesErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function PurchasesError({ error, reset }: PurchasesErrorProps) {
  return (
    <div className="mx-auto max-w-xl rounded-card border border-neutral-200 bg-white p-6 shadow-card sm:p-8">
      <h1 className="text-xl text-neutral-900">Something went wrong</h1>
      <p className="mt-2 text-sm text-neutral-700">
        We could not load this purchase screen. Please try again.
      </p>
      {process.env.NODE_ENV === "development" ? (
        <p className="mt-4 text-xs text-neutral-500">{error.message}</p>
      ) : null}
      <button
        type="button"
        onClick={reset}
        className="mt-6 inline-flex min-h-11 items-center justify-center rounded-button bg-neutral-900 px-5 text-sm font-medium text-white transition-colors hover:bg-neutral-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
      >
        Try again
      </button>
    </div>
  );
}
