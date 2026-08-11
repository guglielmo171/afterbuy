// Central product status — single source for CTA labels, disclosures and WIP copy.
// Update this when the vertical slice becomes navigable in /app.
export type ProductState = "vertical_slice" | "preview_seed" | "in_progress";

export const productStatus: {
  state: ProductState;
  statusLabel: string;
  ctaLabel: string;
  ctaHref: string;
  ctaAriaLabel: string;
  disclosure: string;
  finalCtaBody: string;
  supportNote: string;
} = {
  state: "in_progress",
  statusLabel: "Product preview · work in progress",
  ctaLabel: "Preview in progress",
  ctaHref: "#product-status",
  ctaAriaLabel:
    "Read what you can explore today and what is still in progress",
  disclosure:
    "This is a work-in-progress preview, not a finished consumer app. The first slice focuses on purchases, deadlines, statuses, and the actions that need attention.",
  finalCtaBody:
    "The interactive preview is still being built. Read what you can explore today and what remains in progress in the sections above.",
  supportNote: "Product preview · work in progress · no personal data required",
};