export default function AppPage() {
  return (
    <div className="rounded-card border border-neutral-200 bg-white p-8 text-center shadow-card">
      <span className="inline-block rounded-badge bg-neutral-100 px-3 py-1 text-xs text-neutral-500">
        Product preview · work in progress
      </span>

      <h1 className="mt-4 text-xl text-neutral-900">AfterBuy App</h1>

      <p className="mx-auto mt-4 max-w-[40ch] leading-relaxed text-neutral-700">
        This is the product preview shell. The core vertical slice — purchases,
        deadlines, lifecycle statuses and urgent actions — is being built here.
        Feature screens and interactive flows will appear as they become
        available.
      </p>

      <p className="mx-auto mt-4 max-w-[40ch] text-sm text-neutral-500">
        The preview uses seeded example data and does not require personal
        purchase information or real documents.
      </p>
    </div>
  );
}