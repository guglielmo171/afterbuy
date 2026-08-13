# AfterBuy — Product contract

Normative product spec. If this file conflicts with local notes, Prisma, editorial copy, or code, **this file wins**. Change the product by changing this file first.

---

## 1. Product question and user

AfterBuy is a real product. After a purchase, the information that protects value — return windows, pending refunds, warranties, proof of purchase — scatters across emails, store accounts, and memory. A missed deadline is lost money, time, or a support option.

The product answers one question:

> What do I need to do today or this week after a purchase?

It is an action queue, not a receipt archive and not a personal-finance tool.

**User (every surface):** a frequent online shopper — anyone who needs to protect returns, refunds, and warranties. Landing and app both speak to that person.

A reviewer or product-driven company may also look at the landing. That is a quality and credibility constraint (clear problem, visible mechanism, honest WIP, craft). It is not a second audience and must not change the message.

---

## 2. Truth hierarchy

| Layer | Where | Binding? |
|---|---|---|
| This contract | `docs/editorial/product-contract.md` | Yes — domain, statuses, urgency, dates, scope, routes |
| Public editorial | `docs/editorial/*`, `PRODUCT.md`, `DESIGN.md`, `README.md` | Yes for copy, WIP, visual direction — they do not redefine domain |
| Code | Prisma, entities, UI | Implements this file |
| Local working notes | `docs/product/`, `docs/architecture/`, `docs/design/`, `docs/marketing/`, `docs/adr/`, local workflow, `prompts/` | No. May be absent on a public clone. Never override this file |

On a public clone, local folders may not exist. Ignore them. Do not treat the current Prisma schema as this contract.

---

## 3. In scope / out of scope

**In scope (product model):** purchases, stores, calendar deadlines, return / refund / warranty cycles, derived urgency, a small action queue, purchase create/edit, purchase detail, example/seed data, document *metadata* (references only).

**Out of scope:** authentication, real file uploads, OCR, merchant or bank connections, inbox import, automatic refund tracking, notifications, background jobs, payments, multi-user / collaboration, legal advice, waitlists, fake metrics or testimonials, delete / archive / soft-delete.

The first navigable loop is narrower than the model. See §4.

---

## 4. Slice 1 vs later

Delivery sequence, not a second domain. Warranty, refund, archive, and timeline stay in this contract; they are built after the return loop works.

**Slice 1 must be true when it ships.** A user can: add a purchase in a short form; see a calculated **return** deadline; tell from the dashboard whether anything needs attention today or this week; open the detail, update return status, and see the queue change. If any of those four is missing, slice 1 is not done.

**Navigable in slice 1**

| Surface | Behaviour |
|---|---|
| `/app` | Urgent queue: return overdue / due soon only. Minimal summary. Recent purchases (so items without a return still have a home). |
| `/app/purchases/new` and `/:id/edit` | Short form: product, store, date, price, return policy days (if set → `ReturnCase`). |
| `/app/purchases/:id` | Summary + return panel + status update (`not_planned` → `return_planned` → `returned` → `closed`). |
| Seed | A few return cases: overdue, due soon, resolved / nothing to do. |
| Domain + tests | `calculateReturnDeadline`, `classifyDeadlineUrgency`, one E2E of the loop. |
| States | Loading, empty, and error on these screens. |

**Not in slice 1 (contract yes, UI later)**

Purchase list with filters/search, `/app/actions-needed`, warranty UI, refund UI, timeline UI, documents UI, dashboard quick actions.

**Next delivery order:** archive (simple list, then filters if needed) → warranty → refund. Timeline UI, document completeness, and Actions Needed follow if the queue outgrows the dashboard.

`productStatus` becomes a navigable demo only when the four slice-1 steps work — not when `/app` is an empty shell.

---

## 5. Domain: entities, optionality, statuses

`Purchase` is the aggregate. Child records are created when there is something to track, not to fill the schema.

| Entity | Cardinality | Exists when |
|---|---|---|
| Store | 1 per purchase (required) | Find or create by name from the form. No store-admin screen. |
| Purchase | centre | Always |
| ReturnCase | 0..1 | A return policy is present (store default and/or per-purchase override) |
| Refund | 0..1 | The user starts tracking a refund — never at purchase create |
| Warranty | 0..1 | `durationMonths > 0`. Zero or absent → no record (“not tracked”, not “expires today”) |
| PurchaseDocument | 0..n | Optional metadata only — never real files |
| TimelineEvent | 0..n | Written by product mutations, not by a timeline UI |

**Store and return policy.** `Store.defaultReturnPolicyDays` is the default (form may prefill). The value that governs the return cycle is `ReturnCase.returnPolicyDays` (per-purchase override). No store-level warranty default in this version.

Money: `priceCents` (integer). `currency` default `EUR`.

### Return status (persisted)

`not_planned` | `return_planned` | `returned` | `closed`

`return_window_expired` is **derived** (deadline has passed and status is still `not_planned` or `return_planned`). Show it as urgency in the UI. It is not a button and not a persisted status.

### Refund status (persisted)

`not_expected` | `pending` | `received` | `issue`

If no `Refund` row exists, there is no refund in progress. When the user starts tracking, create the row with default `pending`. Use `not_expected` when a row already exists and the refund will not arrive.

### Warranty (derived, not a persisted source of truth)

`active` | `expiring_soon` | `expired` | `unknown` — derived from `expiresAt` + `currentDate`. Do not persist these as the source of truth. No `claimed` or `completed` in this product.

---

## 6. Persisted vs derived

**Calculated then persisted** (snapshot; recalculate in the same mutation if inputs change):

- `ReturnCase.returnDeadline` from `purchaseDate + returnPolicyDays`
- `Warranty.expiresAt` from `purchaseDate + durationMonths`

**Never persisted** (always derived at read time):

- `UrgencyLevel`
- `ActionReason`
- `PurchaseLifecycleStatus`
- “is this urgent?”

Do not persist an `AttentionItem`. Urgency depends on “today” and goes stale in a table.

---

## 7. Urgency rules

An item enters the queue only when there is time pressure or money currently blocked. Rank by severity; pair colour with text.

| `ActionReason` | Rule |
|---|---|
| `return_deadline_overdue` | `ReturnCase` exists, not `returned` / not `closed`, deadline < today |
| `return_deadline_due_soon` | Same, deadline within 7 calendar days (and not overdue) |
| `refund_pending` | `Refund.status = pending` and pending for ≥ 7 days; `issue` is always queued |
| `warranty_expiring_soon` | `expiresAt` within 30 calendar days and not expired |

**`receipt_missing` is not an `ActionReason`.** Receipt presence is completeness on the purchase detail. It may be a contextual hint when a return or warranty urgency already exists. It must not appear as its own dashboard row.

Slice 1 implements only the two return reasons. Refund and warranty reasons stay specified here for later UI.

---

## 8. Dates, timezone, language

1. Product dates are **calendar dates**, not timestamps.
2. The user enters a day (`2026-08-13`).
3. Persistence: Prisma `DateTime`, **UTC midnight of that calendar day**. Domain code converts to `YYYY-MM-DD` before any arithmetic.
4. Time-sensitive functions take an explicit `currentDate`. Domain code must not call `new Date()`.
5. Runtime “today” (when not under test) is **`Europe/Berlin`**.
6. A return of N days: deadline = purchaseDate + N calendar days (N = 0 → same day). Cover month-end and leap year in domain tests, not in UI.

Product language and page metadata: **English**. Italian i18n is a later evolution, not this version.

---

## 9. Routes

| Route | Role | When |
|---|---|---|
| `/` | Landing | Now |
| `/app` | Dashboard (app entry) | Slice 1 |
| `/app/purchases/new` | Create | Slice 1 |
| `/app/purchases/:id` | Detail | Slice 1 |
| `/app/purchases/:id/edit` | Edit | Slice 1 |
| `/app/purchases` | Purchase list (archive) | After slice 1 |
| `/app/actions-needed` | Dedicated action queue | Later, only if the dashboard queue outgrows one screen |

`/` is the landing, not the dashboard. Do not invent `/app/actions-needed` as a slice-1 destination.

---

## 10. Prisma scaffold is not the contract

The checked-in schema is a non-normative scaffold. Status strings (`not_initiated`, `claimed`, …), `returnPolicyDays` on `Purchase`, missing `returnDeadline`, missing `currency`, and non-cascade deletes must not be copied forward.

When slice 1 is implemented, replace the initial migration to match this file: Prisma enums, policy and deadline on `ReturnCase`, optional 0..1 relations, `onDelete: Cascade` from `Purchase` to children, `currency`, seed cases that exercise return urgency.

Until then the schema in the repo is known debt, not a constraint.

---

## 11. Visual: two worlds, same user

Same user, two moments: understand (`/`) then act (`/app`).

| Surface | World |
|---|---|
| `/` | Pinned Action Slip (kraft / manila / thermal). Memorable; honest WIP. Must remain presentable to a reviewer without becoming a page written for reviewers. |
| `/app` | Utilitarian premium: light neutral surfaces, signal colour only for urgency, paired with text. Action before inventory. |

Do not import slip textures, marker stripes, or clipboard chrome into the app. Do not restyle the landing to match the app shell. Shared tokens may cover focus and urgency; materials stay separate.

Activation is an honest short form, not a fake import. Landing and app copy must not imply inbox or merchant connections.
