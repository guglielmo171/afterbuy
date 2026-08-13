# AfterBuy — Public Preview

## Purpose

The landing page should explain the product before it asks a visitor to try a demo. It is an entry point to a work in progress, not a substitute for a finished application.

Primary audience: the product user (frequent online shopper / anyone protecting returns, refunds, and warranties). A reviewer or product-driven company may also look at this page — a quality constraint, not a second narrative.

## Voice

- Concise, calm, practical — explain what happened and offer a next step.
- Product outcomes over implementation artifacts.
- WIP transparency is non-negotiable: no fake metrics, testimonials, or implied availability.
- Avoid: fear-based wording, hype, repository jargon (`endpoint`, `schema`, `seed`, `full-stack`, `shell`, `wiring`).

## Section order

1. Hero — pinned action slip, supporting copy, CTAs, disclosure
2. Problem — *The purchase is only the first step.*
3. Mechanism — *A clearer next step after every purchase.*
4. How it works — three flows with status stamps
5. Try now / Not yet — two-column transparency
6. Close — `#product-status`
7. Footer — minimal

## Message

**Headline (verbatim):** `Keep post-purchase deadlines in view.`

**Supporting copy (verbatim):** `AfterBuy is a work-in-progress product experiment for returns, pending refunds, and warranty dates. It helps make the next useful action easier to see.`

## Navigation

| Label | Target |
|---|---|
| How it works | `#how-it-works` |
| Try now | `#try-now` |
| Product status | `#product-status` |

Header wordmark: `AfterBuy`

## CTA rules

| Product state | Primary CTA | href | Disclosure |
|---|---|---|---|
| No public interactive route | `Preview in progress` | `#product-status` | `This is a work-in-progress preview, not a finished consumer app. The first slice focuses on purchases, deadlines, statuses, and the actions that need attention.` |
| Working demo with example data | `Try the demo` | `/app` (or stable demo route) | `Uses example data. Do not enter personal purchase information.` |
| Resettable demo | `Try the demo` | `/app` (or stable demo route) | `Example data may be reset.` |

**Secondary CTA (hero):** `See what works now` → `#try-now`

`Open App` is appropriate only when it points to a real, stable route with navigable flows.

Do not use `Available` badges without navigable proof.

## What the page should show

1. The fragmented post-purchase problem.
2. A real screenshot or accessible product preview when one exists.
3. The short flow: see what needs attention, understand a purchase, record an update.
4. What a visitor can try now.
5. What remains in progress or deliberately outside the current scope.

Do not use fake testimonials, user numbers, release dates, waitlists, pricing, or invented metrics to compensate for the WIP state.

## Landing body copy

### Hero — pinned action slip

**Instrument label:** `AfterBuy · pick slip`

**Queue label:** `Action queue · ranked by urgency`

**WIP stamp:** `WIP` (aria-label: `Product preview work in progress`)

**Headline:** Keep post-purchase deadlines in view.

**Table columns:** Purchase · Deadline · Status

**Example rows (synthetic):**

| Purchase | Deadline | Status |
|---|---|---|
| Kitchen scale | Warranty · 12 Aug | 1 day left (urgent) |
| Wireless headphones | Return · 14 Aug | 3 days left |
| Desk lamp | Refund check | In progress |

**Slip footer:** `Example data · synthetic preview · not live`

**Figcaption:** `Example action queue — for illustration only, not connected to live purchases.` (followed by row summary for screen readers)

**Table aria-label:** `Example purchase action queue ranked by urgency`

### Hero — supporting block

**Supporting copy:** AfterBuy is a work-in-progress product experiment for returns, pending refunds, and warranty dates. It helps make the next useful action easier to see.

**Status label:** Product preview · work in progress

**Primary CTA:** Preview in progress → `#product-status`

**Secondary CTA:** See what works now → `#try-now`

**Disclosure:** This is a work-in-progress preview, not a finished consumer app. The first slice focuses on purchases, deadlines, statuses, and the actions that need attention.

### Problem

**Headline:** The purchase is only the first step.

After checkout, the useful information spreads out: a return window in one email, a refund update in another, a receipt somewhere else, and warranty details only when something goes wrong.

The result is not just clutter. A missed deadline can mean lost money, lost time or a support right that is harder to use.

### Mechanism

**Headline:** A clearer next step after every purchase.

AfterBuy is built around one question: **what needs attention today or this week?** Instead of turning post-purchase information into a passive archive, it turns it into a small, readable action queue.

**See what matters:** Urgent return windows, pending refunds, expiring warranties and missing proof of purchase surface before the rest of the list.

**Keep the context together:** Each purchase has its dates, statuses, notes and reference links in one place, so the next step does not start with another search.

**Move the lifecycle forward:** Update a return, refund or warranty state and keep the history readable—from purchase to resolution.

### How it works

**Section heading:** How it works

**Intro:** Three product flows the first preview is built around — each labeled with where it stands today.

**Flows:**

1. **Start with the action, not the archive.** `[Planned]` — The dashboard is designed to make the most urgent item recognizable quickly. Dates and statuses are shown as context for a decision, not as dashboard decoration.
2. **Understand one purchase in full.** `[Planned]` — Open a purchase to see return and warranty dates, refund status, document references, support links and the lifecycle timeline together.
3. **Add a purchase with the information that matters.** `[In progress]` — Capture store, dates, and status so deadlines can be estimated and the next action stays accurate as details change.

**Status stamps:** `Planned` (×2), `In progress` (×1). No step numbers. No `Available` without navigable proof.

### Try now

**Kicker:** Try now

**Heading:** What works in the current preview.

**Intro:** The preview is being built as a focused vertical slice. Here is what you can read, trust, and explore on this page today:

**Items:**

- This page explains the problem, the action-queue mechanism, and an honest split between what you can explore today and what is still being built.
- A product preview area exists, but it does not yet offer navigable purchase flows — only a placeholder for now.
- The preview runs as a real web product, not a static mockup — scope and availability are stated plainly, not implied.
- The product model covers purchases, stores, lifecycle states, document references, and timeline history — the shape the preview is being built around.
- Example purchase scenarios for returns, refunds, and warranties are prepared — not yet shown in the interactive preview.
- Product status labels and disclosures stay consistent across the landing and preview — so nothing overpromises availability.

### Not yet

**Kicker:** Not yet

**Heading:** What is still being built.

**Intro:** AfterBuy is intentionally not presented as a finished consumer service. The current work is completing the core purchase loop — add a purchase, see what needs attention, update a lifecycle state — and making that loop reliable on real devices.

**Items:**

- Finishing the flow to add and edit a purchase with the dates and details that drive deadlines.
- Quick updates when a return, refund, or warranty moves forward — with clear confirmation when something changes.
- Loading, empty, and error states across the preview so incomplete views read honestly instead of looking broken.
- Connecting example purchases to the dashboard, purchase detail, and action queue.

**Scope note:** The product preview uses example data. It does not store real receipts, personal documents, or connected merchant accounts. Merchant integrations, inbox parsing, OCR, real refund tracking, authentication, and multi-user features remain outside the MVP.

### Close

**Section id:** `product-status`

**Heading:** See the product in context.

**Body:** The interactive preview is still being built. Read what you can explore today and what remains in progress in the sections above.

**Primary CTA:** Preview in progress → `#product-status`

**Support note:** Product preview · work in progress · no personal data required

### Footer

AfterBuy — a work-in-progress product experiment.

**Status label (repeat):** Product preview · work in progress

## Product status (centralized)

Source: `src/shared/constants/product-status.ts`. Update this block when the vertical slice becomes navigable in `/app`.

| Field | Current value |
|---|---|
| state | `in_progress` |
| statusLabel | Product preview · work in progress |
| ctaLabel | Preview in progress |
| ctaHref | `#product-status` |
| ctaAriaLabel | Read what you can explore today and what is still in progress |
| disclosure | This is a work-in-progress preview, not a finished consumer app. The first slice focuses on purchases, deadlines, statuses, and the actions that need attention. |
| finalCtaBody | The interactive preview is still being built. Read what you can explore today and what remains in progress in the sections above. |
| supportNote | Product preview · work in progress · no personal data required |

## Implementation mapping

| Copy block | Primary location |
|---|---|
| Headline, supporting, section body copy, Try now / Not yet lists | `src/app/page.tsx` |
| CTA labels, disclosure, close body, support note | `src/shared/constants/product-status.ts` |
| Slip labels, example rows, figcaption | `src/features/landing/ui/pinned-action-slip.tsx` |
| Editorial source of truth (this file) | `docs/editorial/public-preview.md` |

When copy changes, update this document first, then align constants and page arrays.

## Forbidden on the landing

- Fake metrics, testimonials, user counts, release dates
- `Available` badges without navigable interactive proof
- `Open App` or `Try the Demo` while `/app` is a placeholder only
- Repository or stack inventory in visitor-facing copy (`/api/health`, Prisma, seed script, migrations, server-side validation, route-level loading)
- Fear-based urgency or overpromising a finished consumer service
