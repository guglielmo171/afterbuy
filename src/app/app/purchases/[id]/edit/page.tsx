import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PurchaseForm } from "@/features/purchases/ui/purchase-form";
import { purchaseRecordToFormValues } from "@/features/purchases/lib/purchase-form-schema";
import { getPurchaseById } from "@/server/repositories/purchase-repository";
import { routes } from "@/shared/constants/routes";

type EditPurchasePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: EditPurchasePageProps): Promise<Metadata> {
  const { id } = await params;
  const purchase = await getPurchaseById(id);

  return {
    title: purchase
      ? `Edit ${purchase.productName} · AfterBuy`
      : "Purchase not found · AfterBuy",
  };
}

export default async function EditPurchasePage({
  params,
}: EditPurchasePageProps) {
  const { id } = await params;
  const purchase = await getPurchaseById(id);

  if (!purchase) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-6">
        <Link
          href={routes.purchaseDetail(id)}
          className="text-sm text-neutral-500 underline-offset-2 hover:text-neutral-700 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
        >
          Back to purchase
        </Link>
        <h1 className="mt-3 text-xl text-neutral-900">Edit purchase</h1>
        <p className="mt-2 text-sm text-neutral-700">
          Update the details for {purchase.productName}.
        </p>
      </div>

      <PurchaseForm
        mode="edit"
        purchaseId={purchase.id}
        defaultValues={purchaseRecordToFormValues(purchase)}
      />
    </div>
  );
}
