import { PinnedActionSlip } from "@/features/landing/ui/pinned-action-slip";
import { productStatus } from "@/shared/constants/product-status";

const HEADLINE_ID = "landing-headline";

const primaryCtaClassName =
  "inline-flex h-11 min-h-[44px] items-center justify-center rounded-button bg-[#1a1a1a] px-5 text-sm font-medium text-[#f2ebe0] hover:bg-[#2d2d2d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c41e3a] sm:h-12 sm:px-6";

const secondaryCtaClassName =
  "inline-flex h-11 min-h-[44px] items-center justify-center rounded-button border border-[#8a7d6c] bg-transparent px-5 text-sm font-medium text-[#1a1a1a] hover:border-[#5c5346] hover:bg-[#f2ebe0]/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c41e3a] sm:h-12 sm:px-6";

const navLinkClassName =
  "rounded-button px-2 py-2 text-sm text-[#5c5346] hover:text-[#1a1a1a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c41e3a]";

const featureFlowItems = [
  {
    title: "Start with the action, not the archive.",
    body: "The dashboard is designed to make the most urgent item recognizable quickly. Dates and statuses are shown as context for a decision, not as dashboard decoration.",
    status: "Planned",
  },
  {
    title: "Understand one purchase in full.",
    body: "Open a purchase to see return and warranty dates, refund status, document references, support links and the lifecycle timeline together.",
    status: "Planned",
  },
  {
    title: "Add a purchase with the information that matters.",
    body: "Capture store, dates, and status so deadlines can be estimated and the next action stays accurate as details change.",
    status: "In progress",
  },
] as const;

const availabilityItems = [
  "This page explains the problem, the action-queue mechanism, and an honest split between what you can explore today and what is still being built.",
  "A product preview area exists, but it does not yet offer navigable purchase flows — only a placeholder for now.",
  "The preview runs as a real web product, not a static mockup — scope and availability are stated plainly, not implied.",
  "The product model covers purchases, stores, lifecycle states, document references, and timeline history — the shape the preview is being built around.",
  "Example purchase scenarios for returns, refunds, and warranties are prepared — not yet shown in the interactive preview.",
  "Product status labels and disclosures stay consistent across the landing and preview — so nothing overpromises availability.",
] as const;

const stillBuildingItems = [
  "Finishing the flow to add and edit a purchase with the dates and details that drive deadlines.",
  "Quick updates when a return, refund, or warranty moves forward — with clear confirmation when something changes.",
  "Loading, empty, and error states across the preview so incomplete views read honestly instead of looking broken.",
  "Connecting example purchases to the dashboard, purchase detail, and action queue.",
] as const;

function StatusStamp({ status }: { status: string }) {
  const isProgress = status === "In progress";

  return (
    <span
      className={`status-stamp ${
        isProgress ? "status-stamp--progress" : "status-stamp--planned"
      }`}
    >
      {status}
    </span>
  );
}

export default function LandingPage() {
  return (
    <div className="landing-desk min-h-screen text-[#1a1a1a]">
      <div className="mx-auto max-w-[920px] px-4 pb-16 sm:px-6">
        <header className="flex items-center justify-between gap-4 py-5 sm:py-6">
          <span className="font-thermal text-sm font-semibold uppercase tracking-[0.2em] text-[#1a1a1a]">
            AfterBuy
          </span>
          <div className="flex items-center gap-2 sm:gap-4">
            <nav
              className="hidden items-center gap-1 sm:flex"
              aria-label="Page sections"
            >
              <a href="#how-it-works" className={navLinkClassName}>
                How it works
              </a>
              <a href="#try-now" className={navLinkClassName}>
                Try now
              </a>
              <a href="#product-status" className={navLinkClassName}>
                Product status
              </a>
            </nav>
            <a
              href={productStatus.ctaHref}
              className={primaryCtaClassName}
              aria-label={productStatus.ctaAriaLabel}
            >
              {productStatus.ctaLabel}
            </a>
          </div>
        </header>

        <section className="pb-10 pt-2 sm:pb-14 sm:pt-4" aria-labelledby={HEADLINE_ID}>
          <PinnedActionSlip headlineId={HEADLINE_ID} />

          <div className="mx-auto mt-8 max-w-[720px]">
            <p className="max-w-[52ch] text-base leading-relaxed text-[#3d3830]">
              AfterBuy is a work-in-progress product experiment for returns,
              pending refunds, and warranty dates. It helps make the next useful
              action easier to see.
            </p>

            <p className="mt-3 font-thermal text-xs uppercase tracking-[0.14em] text-[#5c5346]">
              {productStatus.statusLabel}
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href={productStatus.ctaHref}
                className={`${primaryCtaClassName} w-full sm:w-auto`}
                aria-label={productStatus.ctaAriaLabel}
              >
                {productStatus.ctaLabel}
              </a>
              <a
                href="#try-now"
                className={`${secondaryCtaClassName} w-full sm:w-auto`}
              >
                See what works now
              </a>
            </div>

            <p className="mt-4 max-w-[52ch] text-sm leading-relaxed text-[#5c5346]">
              {productStatus.disclosure}
            </p>
          </div>
        </section>

        <section className="mt-6 py-10 sm:py-14">
          <div className="slip-sheet rounded-sm px-5 py-8 sm:px-8 sm:py-10">
            <h2 className="max-w-[16ch] text-2xl font-semibold leading-tight tracking-tight text-[#1a1a1a] sm:text-[1.75rem]">
              The purchase is only the first step.
            </h2>
            <div className="mt-6 max-w-[58ch] space-y-5 text-base leading-relaxed text-[#3d3830]">
              <p>
                After checkout, the useful information spreads out: a return
                window in one email, a refund update in another, a receipt
                somewhere else, and warranty details only when something goes
                wrong.
              </p>
              <p className="text-lg font-medium leading-snug text-[#1a1a1a]">
                The result is not just clutter. A missed deadline can mean lost
                money, lost time or a support right that is harder to use.
              </p>
            </div>
          </div>
        </section>

        <section className="py-8 sm:py-12">
          <h2 className="max-w-[20ch] text-xl font-semibold leading-snug sm:text-2xl">
            A clearer next step after every purchase.
          </h2>
          <p className="mt-5 max-w-[58ch] text-base leading-relaxed text-[#3d3830]">
            AfterBuy is built around one question:{" "}
            <span className="font-medium text-[#1a1a1a]">
              what needs attention today or this week?
            </span>{" "}
            Instead of turning post-purchase information into a passive archive,
            it turns it into a small, readable action queue.
          </p>

          <div className="slip-sheet mt-8 rounded-sm px-5 py-7 sm:px-8 sm:py-9">
            <div className="space-y-7">
              <div>
                <h3 className="text-base font-semibold text-[#1a1a1a]">
                  See what matters
                </h3>
                <p className="mt-2 max-w-[58ch] text-sm leading-relaxed text-[#3d3830] sm:text-base">
                  Urgent return windows, pending refunds, expiring warranties and
                  missing proof of purchase surface before the rest of the list.
                </p>
              </div>
              <div className="border-t border-dashed border-[#c9bba8] pt-7">
                <h3 className="text-base font-semibold text-[#1a1a1a]">
                  Keep the context together
                </h3>
                <p className="mt-2 max-w-[58ch] text-sm leading-relaxed text-[#3d3830] sm:text-base">
                  Each purchase has its dates, statuses, notes and reference links
                  in one place, so the next step does not start with another
                  search.
                </p>
              </div>
              <div className="border-t border-dashed border-[#c9bba8] pt-7">
                <h3 className="text-base font-semibold text-[#1a1a1a]">
                  Move the lifecycle forward
                </h3>
                <p className="mt-2 max-w-[58ch] text-sm leading-relaxed text-[#3d3830] sm:text-base">
                  Update a return, refund or warranty state and keep the history
                  readable—from purchase to resolution.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-8 sm:py-12">
          <h2 className="text-xl font-semibold sm:text-2xl">How it works</h2>
          <p className="mt-3 max-w-[52ch] text-sm text-[#5c5346]">
            Three product flows the first preview is built around — each
            labeled with where it stands today.
          </p>

          <ol className="mt-8 space-y-5">
            {featureFlowItems.map((item) => (
              <li
                key={item.title}
                className="slip-sheet rounded-sm px-5 py-6 sm:px-7 sm:py-7"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <StatusStamp status={item.status} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-[#1a1a1a]">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-[58ch] text-sm leading-relaxed text-[#3d3830] sm:text-base">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section id="try-now" className="py-8 sm:py-12">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            <div className="slip-sheet rounded-sm px-5 py-7 sm:px-7 sm:py-8">
              <p className="font-thermal text-[10px] uppercase tracking-[0.2em] text-[#5c5346]">
                Try now
              </p>
              <h2 className="mt-2 text-xl font-semibold sm:text-2xl">
                What works in the current preview.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#3d3830] sm:text-base">
                The preview is being built as a focused vertical slice. Here is
                what you can read, trust, and explore on this page today:
              </p>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-[#3d3830] sm:text-base">
                {availabilityItems.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span
                      className="font-thermal mt-0.5 shrink-0 text-[#c41e3a]"
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="slip-sheet rounded-sm px-5 py-7 sm:px-7 sm:py-8">
              <p className="font-thermal text-[10px] uppercase tracking-[0.2em] text-[#5c5346]">
                Not yet
              </p>
              <h2 className="mt-2 text-xl font-semibold sm:text-2xl">
                What is still being built.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#3d3830] sm:text-base">
                AfterBuy is intentionally not presented as a finished consumer
                service. The current work is completing the core purchase loop
                — add a purchase, see what needs attention, update a lifecycle
                state — and making that loop reliable on real devices.
              </p>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-[#3d3830] sm:text-base">
                {stillBuildingItems.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span
                      className="font-thermal mt-0.5 shrink-0 text-[#8a7d6c]"
                      aria-hidden="true"
                    >
                      —
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-[#5c5346]">
                The product preview uses example data. It does not store real
                receipts, personal documents, or connected merchant accounts.
                Merchant integrations, inbox parsing, OCR, real refund tracking,
                authentication, and multi-user features remain outside the MVP.
              </p>
            </div>
          </div>
        </section>

        <section id="product-status" className="py-10 sm:py-14">
          <div className="slip-paper mx-auto max-w-[640px] rounded-sm">
            <div className="slip-paper-inner text-center sm:px-10">
              <h2 className="text-xl font-semibold sm:text-2xl">
                See the product in context.
              </h2>
              <p className="mx-auto mt-4 max-w-[48ch] text-base leading-relaxed text-[#3d3830]">
                {productStatus.finalCtaBody}
              </p>
              <div className="mt-6 flex justify-center">
                <a
                  href={productStatus.ctaHref}
                  className={primaryCtaClassName}
                  aria-label={productStatus.ctaAriaLabel}
                >
                  {productStatus.ctaLabel}
                </a>
              </div>
              <p className="mt-4 text-sm text-[#5c5346]">
                {productStatus.supportNote}
              </p>
            </div>
          </div>
        </section>

        <footer className="pt-6 text-sm text-[#5c5346]">
          <p>AfterBuy — a work-in-progress product experiment.</p>
          <p className="mt-2 font-thermal text-xs uppercase tracking-[0.14em]">
            {productStatus.statusLabel}
          </p>
        </footer>
      </div>
    </div>
  );
}
