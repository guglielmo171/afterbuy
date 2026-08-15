import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PurchaseSummary } from "@/features/purchases/ui/purchase-summary";
import { ReturnPanel } from "@/features/purchases/ui/return-panel";
import { getPurchaseById } from "@/server/repositories/purchase-repository";
import { routes } from "@/shared/constants/routes";
import { getTodayCalendarDate } from "@/shared/lib/today";

type PurchaseDetailPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PurchaseDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const purchase = await getPurchaseById(id);

  return {
    title: purchase
      ? `${purchase.productName} · AfterBuy`
      : "Purchase not found · AfterBuy",
  };
}

export default async function PurchaseDetailPage({
  params,
}: PurchaseDetailPageProps) {
  const { id } = await params;
  const purchase = await getPurchaseById(id);
  const currentDate = getTodayCalendarDate();

  if (!purchase) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-6">
        <Link
          href={routes.app}
          className="text-sm text-neutral-500 underline-offset-2 hover:text-neutral-700 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
        >
          Back to dashboard
        </Link>
      </div>

      <PurchaseSummary purchase={purchase} />

      {purchase.returnCase ? (
        <ReturnPanel
          purchaseId={purchase.id}
          returnCase={purchase.returnCase}
          currentDate={currentDate}
        />
      ) : (
        <p className="mt-6 text-sm text-neutral-700">
          No return window is tracked for this purchase.
        </p>
      )}
    </div>
  );
}
