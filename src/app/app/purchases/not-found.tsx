import Link from "next/link";
import { routes } from "@/shared/constants/routes";

export default function PurchaseNotFound() {
  return (
    <div className="mx-auto max-w-xl rounded-card border border-neutral-200 bg-white p-6 text-center shadow-card sm:p-8">
      <h1 className="text-xl text-neutral-900">Purchase not found</h1>
      <p className="mt-2 text-sm text-neutral-700">
        This purchase does not exist or may have been removed.
      </p>
      <Link
        href={routes.app}
        className="mt-6 inline-flex min-h-11 items-center justify-center rounded-button bg-neutral-900 px-5 text-sm font-medium text-white transition-colors hover:bg-neutral-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
      >
        Back to dashboard
      </Link>
    </div>
  );
}
