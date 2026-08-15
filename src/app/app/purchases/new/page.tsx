import type { Metadata } from "next";
import Link from "next/link";
import { PurchaseForm } from "@/features/purchases/ui/purchase-form";
import { routes } from "@/shared/constants/routes";

export const metadata: Metadata = {
  title: "Add purchase · AfterBuy",
};

const emptyFormValues = {
  productName: "",
  storeName: "",
  purchaseDate: "",
  priceEur: "",
  returnPolicyDays: "",
};

export default function NewPurchasePage() {
  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-6">
        <Link
          href={routes.app}
          className="text-sm text-neutral-500 underline-offset-2 hover:text-neutral-700 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
        >
          Back to dashboard
        </Link>
        <h1 className="mt-3 text-xl text-neutral-900">Add purchase</h1>
        <p className="mt-2 text-sm text-neutral-700">
          Record what you bought so AfterBuy can track return deadlines.
        </p>
      </div>

      <PurchaseForm mode="create" defaultValues={emptyFormValues} />
    </div>
  );
}
