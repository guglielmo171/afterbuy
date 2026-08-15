export default function PurchasesLoading() {
  return (
    <div className="mx-auto max-w-xl animate-pulse">
      <div className="mb-6 space-y-3">
        <div className="h-4 w-32 rounded bg-neutral-200" />
        <div className="h-7 w-48 rounded bg-neutral-200" />
        <div className="h-4 w-full max-w-md rounded bg-neutral-200" />
      </div>

      <div className="rounded-card border border-neutral-200 bg-white p-6 shadow-card sm:p-8">
        <div className="space-y-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <div className="h-4 w-24 rounded bg-neutral-200" />
              <div className="h-11 w-full rounded-input bg-neutral-100" />
            </div>
          ))}
        </div>
        <div className="mt-8 h-11 w-36 rounded-button bg-neutral-200" />
      </div>
    </div>
  );
}
