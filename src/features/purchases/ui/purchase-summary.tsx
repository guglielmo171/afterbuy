import Link from "next/link";
import type { PurchaseRecord } from "@/server/mappers/purchase";
import { routes } from "@/shared/constants/routes";

type PurchaseSummaryProps = {
  purchase: PurchaseRecord;
};

function formatPrice(priceCents: number, currency: string): string {
  const amount = (priceCents / 100).toFixed(2);
  return currency === "EUR" ? `€${amount}` : `${amount} ${currency}`;
}

export function PurchaseSummary({ purchase }: PurchaseSummaryProps) {
  return (
    <section
      aria-labelledby="purchase-summary-heading"
      className="rounded-card border border-neutral-200 bg-white p-6 shadow-card sm:p-8"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <h1 id="purchase-summary-heading" className="text-xl text-neutral-900">
          {purchase.productName}
        </h1>
        <Link
          href={routes.purchaseEdit(purchase.id)}
          className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-button border border-neutral-300 bg-white px-5 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
        >
          Edit
        </Link>
      </div>

      <dl className="mt-6 space-y-4 text-sm">
        <div>
          <dt className="font-medium text-neutral-900">Store</dt>
          <dd className="mt-1 text-neutral-700">{purchase.storeName}</dd>
        </div>
        <div>
          <dt className="font-medium text-neutral-900">Purchase date</dt>
          <dd className="mt-1 text-neutral-700">{purchase.purchaseDate}</dd>
        </div>
        <div>
          <dt className="font-medium text-neutral-900">Price</dt>
          <dd className="mt-1 text-neutral-700">
            {formatPrice(purchase.priceCents, purchase.currency)}
          </dd>
        </div>
      </dl>
    </section>
  );
}
