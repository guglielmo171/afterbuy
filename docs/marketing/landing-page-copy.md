# AfterBuy — Landing Page Copy

La copy è in inglese perché il portfolio è posizionato verso aziende product-oriented in Europa/Berlino. Le label di stato possono restare in inglese; l'app mantiene la localizzazione prevista dai documenti di design.

## Header

- Logo: `AfterBuy`
- Navigation: `How it works` · `Product status`
- Primary CTA: `Open App` *(fallback: `Try the Demo`)*

## Hero

**Status label:** `Product preview · work in progress`

**H1:** `Keep the value of every purchase within reach.`

**Body:** `Returns, pending refunds, warranty dates and proof of purchase tend to disappear across inboxes, store accounts and memory. AfterBuy brings the next action back into view.`

**Primary CTA:** `Open App`

**Secondary CTA:** `See what works now`

**Transparency note:** `AfterBuy is an in-progress full-stack product. The current preview focuses on purchases, deadlines, statuses and urgent actions.`

**Screenshot alt text:** `AfterBuy dashboard showing an urgent return, a pending refund and purchase status information.`

## Problem

**H2:** `The purchase is only the first step.`

`After checkout, the useful information spreads out: a return window in one email, a refund update in another, a receipt somewhere else, and warranty details only when something goes wrong.`

`The result is not just clutter. A missed deadline can mean lost money, lost time or a support right that is harder to use.`

## Value proposition

**H2:** `A clearer next step after every purchase.`

`AfterBuy is built around one question: what needs attention today or this week? Instead of turning post-purchase information into a passive archive, it turns it into a small, readable action queue.`

### `See what matters`
`Urgent return windows, pending refunds, expiring warranties and missing proof of purchase surface before the rest of the list.`

### `Keep the context together`
`Each purchase has its dates, statuses, notes and reference links in one place, so the next step does not start with another search.`

### `Move the lifecycle forward`
`Update a return, refund or warranty state and keep the history readable—from purchase to resolution.`

## Feature flow

### `1. Start with the action, not the archive.`
`The dashboard is designed to make the most urgent item recognizable quickly. Dates and statuses are shown as context for a decision, not as dashboard decoration.`

**Status:** `Available in the product preview`

### `2. Understand one purchase in full.`
`Open a purchase to see return and warranty dates, refund status, document references, support links and the lifecycle timeline together.`

**Status:** `Available in the product preview`

### `3. Add a purchase with the information that matters.`
`The add/edit flow captures the essential details, calculates deadline estimates and validates the data before it is saved.`

**Status:** `In progress — shown when the flow is available`

## What works now

**H2:** `What works in the current preview.`

`The project is being built as a focused vertical slice. These are the capabilities intended to be present and testable in the current product preview:`

- `Purchase records with store, category, date, price and lifecycle context.`
- `Calculated return and warranty deadlines.`
- `Urgency classification for overdue, due-soon and upcoming actions.`
- `Dashboard and Actions Needed views that prioritize actionable purchases.`
- `Purchase detail with return, refund and warranty states, references and timeline.`
- `Seeded example data that demonstrates realistic post-purchase scenarios.`

**Note:** `Availability is updated with the app. If a flow is not accessible in the preview, it is listed below as in progress or planned—not presented as complete.`

## Work in progress

**H2:** `What is still being built.`

`AfterBuy is intentionally not presented as a finished consumer service. The current work is focused on completing the core flow and making it reliable across validation, persistence, loading states and responsive use.`

- `Completing the create and edit purchase flow with server-side validation.`
- `Polishing quick status updates and their confirmation feedback.`
- `Expanding route-level loading, empty and error states.`
- `Testing the critical flow: create a purchase, see an urgent action, update its status.`

`The product preview uses example data. It does not store real receipts, personal documents or connected merchant accounts.`

## Planned improvements

**H2:** `Planned after the core flow is complete.`

`These are directions, not release promises.`

- `Search, URL-based filters and clearer sorting for larger purchase lists.`
- `Archive and export options for purchase records.`
- `Calendar or email reminder concepts, without committing to notification delivery yet.`
- `Receipt-upload placeholders before any real file-storage decision.`
- `More polished demo reset and deployment behavior.`

`Merchant integrations, inbox parsing, OCR, real refund tracking, authentication and multi-user features remain outside the MVP.`

## Final CTA

**H2:** `See the product in context.`

`Open the current preview to explore the post-purchase flow with seeded example data.`

**Primary CTA:** `Open App`

**Support note:** `Product preview · work in progress · no personal data required`

## Accessibility labels

- Hero CTA: `Open the AfterBuy product preview`
- Status anchor: `Read what works now and what is in progress`
- Screenshot: use the supplied descriptive alt text; no “image of”.
