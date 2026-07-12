# AfterBuy — API Design and Backend Boundaries

**Status:** Draft 1.0  
**Repository path:** `docs/architecture/api-design.md`  
**Related documents:**
- `docs/product/project-charter.md`
- `docs/product/feasibility-study.md`
- `docs/product/mvp-scope.md`
- `docs/product/user-journey.md`
- `docs/architecture/overview.md`
- `docs/architecture/frontend.md`
- `docs/architecture/backend.md`
- `docs/architecture/data-model.md`
- `docs/architecture/testing.md`

---

## 1. Purpose

This document defines the **backend/API boundaries** for AfterBuy.

AfterBuy uses **Next.js full-stack** with:

- Server Components for route-level reads;
- Server Actions for internal product mutations;
- server-only query functions for dashboard/list/detail reads;
- Prisma repositories for persistence;
- Zod schemas at input boundaries;
- pure TypeScript domain logic in `entities/*/lib`.

The goal is to show real backend awareness without building a separate backend service or REST-heavy platform.

---

## 2. Backend boundary principles

AfterBuy should follow these backend principles:

1. **Server Actions for internal mutations**  
   Forms and lifecycle controls call Server Actions directly.

2. **Server queries for reads**  
   Dashboard, purchase list, purchase detail, stores and categories are loaded through server-only query functions.

3. **Route Handlers only for API-shaped boundaries**  
   Use Route Handlers for health/demo/export endpoints, not for every internal mutation.

4. **Repositories own Prisma access**  
   Prisma should not be imported in pages, features or entities.

5. **Domain logic stays pure**  
   Deadline calculation, urgency classification and lifecycle derivation live outside React, Next.js and Prisma.

6. **Zod validates all user-controlled input**  
   Client validation improves UX. Server validation protects the write boundary.

7. **Typed results, safe errors**  
   Expected failures return typed errors. UI should not expose raw database or stack errors.

---

## 3. Backend module structure

Recommended structure:

```txt
src/server/
  db/
    prisma.ts

  repositories/
    purchase.repository.ts
    store.repository.ts
    timeline-event.repository.ts

  queries/
    get-dashboard-summary.query.ts
    get-urgent-actions.query.ts
    get-purchase-list.query.ts
    get-purchase-detail.query.ts
    get-stores.query.ts
    get-categories.query.ts

  actions/
    create-purchase.action.ts
    update-purchase.action.ts
    update-return-status.action.ts
    update-refund-status.action.ts
    update-warranty.action.ts
    update-document-metadata.action.ts
    add-timeline-note.action.ts

  mappers/
    prisma-purchase.mapper.ts
    prisma-dashboard.mapper.ts
```

Related shared/domain modules:

```txt
src/entities/*/lib/              # pure business logic
src/entities/*/model/            # domain types/enums
src/shared/validation/           # Zod schemas
src/shared/utils/result.ts        # typed action result
src/shared/constants/routes.ts    # route constants
```

---

## 4. Read-side boundary: server queries

Server queries are application-level read functions. They are called by Server Components or route pages and return feature-ready data.

### 4.1 Required queries

| Query | Used by | Responsibility |
| --- | --- | --- |
| `getDashboardSummary` | Dashboard | Summary counts and high-level state. |
| `getUrgentActions` | Dashboard, Actions Needed | Actionable purchases with reason and urgency. |
| `getPurchaseList` | Purchase list | Filtered list/cards/table data. |
| `getPurchaseDetail` | Purchase detail | Full purchase lifecycle detail. |
| `getStores` | Forms, filters | Store options. |
| `getCategories` | Filters/forms | Category options. |

---

### 4.2 `getDashboardSummary`

Purpose:

- provide compact summary data for the dashboard;
- avoid calculating dashboard statistics in React components.

Recommended signature:

```ts
export type DashboardSummary = {
  totalPurchases: number;
  activeIssues: number;
  returnsDueSoon: number;
  refundsPending: number;
  warrantiesExpiringSoon: number;
  missingReceipts: number;
};

export async function getDashboardSummary(): Promise<DashboardSummary>;
```

Responsibilities:

- call repository read methods;
- use domain logic for urgency/action derivation;
- return a small view-ready object;
- avoid exposing Prisma objects.

---

### 4.3 `getUrgentActions`

Purpose:

- return all purchases that require attention;
- power dashboard urgent cards and the Actions Needed screen.

Recommended signature:

```ts
export type UrgentActionReason =
  | 'return_deadline_due_soon'
  | 'return_deadline_overdue'
  | 'refund_pending'
  | 'warranty_expiring_soon'
  | 'receipt_missing';

export type UrgentAction = {
  id: string;
  purchaseId: string;
  productName: string;
  storeName: string;
  reason: UrgentActionReason;
  urgency: 'overdue' | 'due_soon' | 'upcoming' | 'safe' | 'unknown';
  dueDate?: Date;
  pendingSince?: Date;
  description: string;
  href: string;
};

export async function getUrgentActions(): Promise<UrgentAction[]>;
```

Query flow:

```txt
getUrgentActions()
  → purchaseRepository.findActionCandidates()
  → classifyDeadlineUrgency()
  → isRefundActionNeeded()
  → isReceiptMissing()
  → map to UrgentAction[]
```

Rules:

- urgency should be calculated server-side;
- components render urgency, they do not decide it;
- resolved lifecycle states should not remain urgent unless another reason applies.

---

### 4.4 `getPurchaseList`

Purpose:

- load the purchase list with filters;
- support mobile card UI and desktop table-like UI.

Recommended signature:

```ts
export type PurchaseListFilters = {
  status?: string;
  storeId?: string;
  category?: string;
  urgency?: string;
  search?: string;
};

export type PurchaseListItem = {
  id: string;
  productName: string;
  storeName: string;
  category: string;
  purchaseDate: Date;
  priceCents: number;
  currency: string;
  returnStatus: string;
  refundStatus: string;
  warrantyStatus: string;
  urgency: string;
  href: string;
};

export async function getPurchaseList(
  filters: PurchaseListFilters,
): Promise<PurchaseListItem[]>;
```

Responsibilities:

- validate filters with `purchaseFiltersSchema`;
- query compact purchase data;
- derive urgency and lifecycle status;
- return list-friendly data;
- handle invalid filters safely.

---

### 4.5 `getPurchaseDetail`

Purpose:

- load one purchase with full lifecycle data.

Recommended signature:

```ts
export type PurchaseDetail = {
  id: string;
  productName: string;
  category: string;
  priceCents: number;
  currency: string;
  purchaseDate: Date;
  orderNumber?: string;
  notes?: string;
  store: {
    id: string;
    name: string;
    websiteUrl?: string;
    supportUrl?: string;
  };
  returnCase: {
    status: string;
    returnPolicyDays: number;
    returnDeadline?: Date;
    urgency: string;
    returnedAt?: Date;
  };
  refund: {
    status: string;
    expectedRefundCents?: number;
    refundRequestedAt?: Date;
    refundedAt?: Date;
    actionNeeded: boolean;
  };
  warranty: {
    status: string;
    durationMonths?: number;
    expiresAt?: Date;
    urgency: string;
  };
  documents: Array<{
    id: string;
    type: string;
    label?: string;
    isAvailable: boolean;
    referenceUrl?: string;
  }>;
  timeline: Array<{
    id: string;
    type: string;
    title: string;
    description?: string;
    occurredAt: Date;
  }>;
};

export async function getPurchaseDetail(
  purchaseId: string,
): Promise<PurchaseDetail | null>;
```

Responsibilities:

- return `null` or trigger `notFound()` if the purchase does not exist;
- include all related lifecycle records;
- sort timeline events by `occurredAt` descending or ascending depending on UI decision;
- return feature-ready data, not raw Prisma output.

---

### 4.6 `getStores` and `getCategories`

Purpose:

- provide filter/form options;
- keep forms and filters server-backed but simple.

Recommended signatures:

```ts
export type StoreOption = {
  id: string;
  name: string;
  defaultReturnPolicyDays?: number;
  supportUrl?: string;
};

export async function getStores(): Promise<StoreOption[]>;

export type CategoryOption = {
  value: string;
  label: string;
};

export async function getCategories(): Promise<CategoryOption[]>;
```

`getCategories` can return static options from shared constants or derive categories from enums. It does not require a category table in MVP.

---

## 5. Write-side boundary: Server Actions

Server Actions are the write-side application functions.

They should:

1. receive form/action input;
2. validate with Zod;
3. normalize values;
4. call pure domain logic;
5. persist through repositories;
6. create timeline events when relevant;
7. revalidate affected routes;
8. return typed success/error results or redirect after create.

---

## 6. Action result pattern

Use a small shared result type.

```ts
export type FieldErrors = Record<string, string[]>;

export type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string; fieldErrors?: FieldErrors };
```

Expected failures should return `ActionResult` errors:

- invalid input;
- invalid status;
- purchase not found;
- unsafe status transition;
- persistence failure with safe user-facing message.

Unexpected failures can be logged and converted to a safe generic error.

---

## 7. Recommended Server Actions

### 7.1 `createPurchaseAction`

Purpose:

- create a purchase and its initial lifecycle records.

Recommended input:

```ts
export type CreatePurchaseInput = {
  productName: string;
  category: string;
  store: {
    name: string;
    websiteUrl?: string;
    supportUrl?: string;
  };
  purchaseDate: Date;
  priceCents: number;
  currency: 'EUR' | 'USD' | 'GBP';
  orderNumber?: string;
  notes?: string;
  returnPolicyDays: number;
  warrantyDurationMonths?: number;
  manualUrl?: string;
  supportUrl?: string;
  receipt?: {
    isAvailable: boolean;
    referenceUrl?: string;
    label?: string;
  };
};
```

Recommended output:

```ts
export type CreatePurchaseResult = {
  purchaseId: string;
};
```

Action flow:

```txt
createPurchaseAction(input)
  → createPurchaseSchema.safeParse(input)
  → normalizePurchaseInput()
  → calculateReturnDeadline()
  → calculateWarrantyExpiration()
  → storeRepository.findOrCreateByName()
  → purchaseRepository.createWithLifecycle(transaction)
  → create timeline events
  → revalidatePath('/')
  → revalidatePath('/actions-needed')
  → revalidatePath('/purchases')
  → redirect('/purchases/:id') or return purchaseId
```

Notes:

- if using `<form action={createPurchaseAction}>`, redirect after success is acceptable;
- if using React Hook Form with custom pending/error state, returning `ActionResult<CreatePurchaseResult>` is often easier;
- final deadline calculation must happen server-side.

---

### 7.2 `updatePurchaseAction`

Purpose:

- update editable purchase fields.

Recommended input:

```ts
export type UpdatePurchaseInput = {
  purchaseId: string;
  productName?: string;
  category?: string;
  store?: {
    name?: string;
    websiteUrl?: string;
    supportUrl?: string;
  };
  purchaseDate?: Date;
  priceCents?: number;
  currency?: 'EUR' | 'USD' | 'GBP';
  orderNumber?: string;
  notes?: string;
  returnPolicyDays?: number;
  warrantyDurationMonths?: number;
};
```

Responsibilities:

- validate with `updatePurchaseSchema`;
- recalculate return deadline if `purchaseDate` or `returnPolicyDays` changes;
- recalculate warranty expiration if `purchaseDate` or `warrantyDurationMonths` changes;
- update timeline only for lifecycle-relevant changes;
- revalidate detail, list, dashboard and actions-needed routes.

Avoid:

- creating a timeline event for every minor text edit unless it improves product clarity.

---

### 7.3 `updateReturnStatusAction`

Purpose:

- update return lifecycle status.

Recommended input:

```ts
export type UpdateReturnStatusInput = {
  purchaseId: string;
  status:
    | 'not_planned'
    | 'return_planned'
    | 'returned'
    | 'return_window_expired'
    | 'closed';
  plannedAt?: Date;
  returnedAt?: Date;
  closedAt?: Date;
};
```

Action flow:

```txt
updateReturnStatusAction(input)
  → updateReturnStatusSchema.safeParse(input)
  → get existing purchase/return case
  → validate pragmatic transition
  → purchaseRepository.updateReturnStatus()
  → create timeline event when meaningful
  → revalidate affected routes
  → return ActionResult
```

Timeline mapping:

| New status | Timeline event |
| --- | --- |
| `return_planned` | `return_planned` |
| `returned` | `item_returned` |
| `closed` | optional `note_added` or no event if not useful |

---

### 7.4 `updateRefundStatusAction`

Purpose:

- update refund status and pending/received dates.

Recommended input:

```ts
export type UpdateRefundStatusInput = {
  purchaseId: string;
  status: 'not_expected' | 'pending' | 'received' | 'issue';
  expectedRefundCents?: number;
  refundRequestedAt?: Date;
  refundedAt?: Date;
};
```

Responsibilities:

- validate with `updateRefundStatusSchema`;
- set `refundRequestedAt` when status becomes `pending` if not provided;
- set `refundedAt` when status becomes `received` if not provided;
- create timeline event;
- ensure dashboard urgent actions are revalidated.

Timeline mapping:

| New status | Timeline event |
| --- | --- |
| `pending` | `refund_pending` |
| `received` | `refund_received` |
| `issue` | `note_added` or future `refund_issue` if added later |

Do not integrate with payment providers in the MVP.

---

### 7.5 `updateWarrantyAction`

Purpose:

- update warranty duration, expiration and status.

Recommended input:

```ts
export type UpdateWarrantyInput = {
  purchaseId: string;
  durationMonths?: number;
  expiresAt?: Date;
  status?: 'active' | 'expiring_soon' | 'expired' | 'unknown';
};
```

Responsibilities:

- validate with `updateWarrantySchema`;
- recalculate `expiresAt` if duration changes;
- derive status from expiration where possible;
- create `warranty_updated` timeline event;
- revalidate dashboard/action/detail views.

Avoid:

- modeling warranty claims;
- adding support ticket workflow;
- adding legal/consumer-right advice.

---

### 7.6 `updateDocumentMetadataAction`

Purpose:

- add or update receipt/manual/support metadata.

Recommended input:

```ts
export type UpdateDocumentMetadataInput = {
  purchaseId: string;
  documentId?: string;
  type: 'receipt' | 'invoice' | 'manual' | 'support_link' | 'other';
  label?: string;
  isAvailable: boolean;
  referenceUrl?: string;
};
```

Responsibilities:

- validate with `documentMetadataSchema`;
- create or update document metadata;
- create `document_updated` timeline event;
- revalidate urgent actions because receipt missing may change.

MVP constraint:

- no file upload;
- no file delete;
- no cloud storage;
- no OCR processing.

---

### 7.7 `addTimelineNoteAction`

Purpose:

- add a lightweight note to the purchase lifecycle.

Recommended input:

```ts
export type AddTimelineNoteInput = {
  purchaseId: string;
  note: string;
  occurredAt?: Date;
};
```

Responsibilities:

- validate note length;
- ensure purchase exists;
- create `note_added` timeline event;
- revalidate purchase detail.

This action is useful but should not become a complex comments/activity system.

---

### 7.8 Optional `archivePurchaseAction`

This should be should-have, not required MVP.

Purpose:

- hide a purchase without hard delete.

Only add it if the UI actually needs it.

Avoid adding soft-delete complexity early. If implemented, add `archivedAt` to `Purchase` and filter archived records out by default.

---

## 8. Route Handlers

Route Handlers should be rare in the MVP.

### 8.1 Required MVP route

```txt
GET /api/health
```

Purpose:

- simple health check for deployed demo;
- useful for showing API-shaped boundary without adding REST ceremony.

Example response:

```json
{
  "ok": true,
  "service": "afterbuy",
  "version": "0.1.0"
}
```

---

### 8.2 Optional future/demo routes

```txt
GET /api/demo/export
GET /api/purchases
GET /api/purchases/:purchaseId
```

Use these only if there is a clear portfolio or demo reason.

Possible reasons:

- demonstrate API contract awareness;
- export seeded demo data;
- support a future public-read example.

Do not implement product mutations as REST endpoints in the MVP unless the UI or external boundary truly needs them.

---

### 8.3 Decision rule

Use this rule:

```txt
Is this operation called only by internal UI?
  → Use Server Action.

Is this operation meant to behave like an external API endpoint?
  → Use Route Handler.
```

For AfterBuy MVP, almost everything is internal UI.

---

## 9. Repository boundaries

Repositories are the data access layer. They should hide Prisma details from Server Actions and queries.

### 9.1 `purchase.repository.ts`

Recommended methods:

```ts
export const purchaseRepository = {
  createWithLifecycle(input),
  updatePurchase(purchaseId, input),
  findList(filters),
  findDetail(purchaseId),
  findActionCandidates(),
  updateReturnStatus(purchaseId, input),
  updateRefundStatus(purchaseId, input),
  updateWarranty(purchaseId, input),
  upsertDocumentMetadata(purchaseId, input),
};
```

Responsibilities:

- use Prisma transactions where needed;
- centralize include/select logic;
- persist normalized data;
- not decide product urgency rules.

---

### 9.2 `store.repository.ts`

Recommended methods:

```ts
export const storeRepository = {
  findAll(),
  findOrCreateByName(input),
  findCategories(),
};
```

`findCategories` can be static or enum-based. Do not add a category table unless the product needs custom category management.

---

### 9.3 `timeline-event.repository.ts`

Recommended methods:

```ts
export const timelineEventRepository = {
  create(event),
  createMany(events),
  findByPurchaseId(purchaseId),
};
```

Timeline event creation should generally be orchestrated by Server Actions after domain decisions have been made.

---

## 10. Validation boundary

Validation should happen at every user-controlled boundary.

### 10.1 Form boundary

Use React Hook Form + Zod resolver for:

- required field messages;
- invalid URL messages;
- invalid price/date messages;
- disabled/pending form state;
- preserving input after server errors.

### 10.2 Server Action boundary

Every Server Action must validate again:

```txt
input
  → schema.safeParse(input)
  → normalize
  → domain logic
  → repository
```

Do not trust client validation only.

### 10.3 Query/search param boundary

Filter/search params should be validated with `purchaseFiltersSchema`.

Invalid params should:

- fall back to safe defaults;
- optionally show a calm UI message;
- not crash the page.

---

## 11. Domain logic boundary

Business logic should live in pure functions under `entities/*/lib`.

Required functions:

```txt
calculateReturnDeadline
calculateWarrantyExpiration
classifyDeadlineUrgency
derivePurchaseLifecycleStatus
isRefundActionNeeded
isReceiptMissing
createTimelineEventFromMutation
normalizePurchaseInput
```

Rules:

- no Prisma imports;
- no React imports;
- no Next.js imports;
- no hidden `new Date()` inside critical date logic;
- accept `currentDate` as an argument for date-sensitive logic;
- return plain values;
- unit test with fixed dates.

---

## 12. Revalidation strategy

Keep revalidation simple.

Recommended route constants:

```ts
export const routes = {
  dashboard: '/',
  actionsNeeded: '/actions-needed',
  purchases: '/purchases',
  purchaseDetail: (id: string) => `/purchases/${id}`,
};
```

Recommended revalidation:

| Mutation | Revalidate |
| --- | --- |
| `createPurchaseAction` | `/`, `/actions-needed`, `/purchases`, then detail route after redirect. |
| `updatePurchaseAction` | `/`, `/actions-needed`, `/purchases`, `/purchases/:id`. |
| `updateReturnStatusAction` | `/`, `/actions-needed`, `/purchases`, `/purchases/:id`. |
| `updateRefundStatusAction` | `/`, `/actions-needed`, `/purchases`, `/purchases/:id`. |
| `updateWarrantyAction` | `/`, `/actions-needed`, `/purchases`, `/purchases/:id`. |
| `updateDocumentMetadataAction` | `/`, `/actions-needed`, `/purchases/:id`. |
| `addTimelineNoteAction` | `/purchases/:id`. |

Example:

```ts
revalidatePath(routes.dashboard);
revalidatePath(routes.actionsNeeded);
revalidatePath(routes.purchases);
revalidatePath(routes.purchaseDetail(purchaseId));
```

Avoid complex caching, background refresh, queues or event-driven invalidation in the MVP.

---

## 13. Error handling

### 13.1 Expected errors

Return typed errors for:

- invalid input;
- invalid filter/search params;
- purchase not found;
- invalid status;
- unsafe transition;
- mutation failed;
- invalid URL/date/price.

Example:

```ts
return {
  ok: false,
  error: 'Some fields need your attention before saving.',
  fieldErrors: parsed.error.flatten().fieldErrors,
};
```

### 13.2 Unexpected errors

For unexpected errors:

- log technical detail server-side;
- return a safe message;
- do not expose stack traces or raw Prisma errors.

Recommended UI messages:

```txt
We could not save this change. Your previous data is still safe.
Some fields need your attention before saving.
This purchase could not be loaded.
Some filters were invalid and have been reset.
```

---

## 14. API contracts by screen

### 14.1 Dashboard

Route:

```txt
src/app/page.tsx
```

Server reads:

```txt
getDashboardSummary()
getUrgentActions()
```

Mutation controls:

- quick status actions may call `updateReturnStatusAction` or `updateRefundStatusAction` if implemented.

---

### 14.2 Actions Needed

Route:

```txt
src/app/actions-needed/page.tsx
```

Server reads:

```txt
getUrgentActions()
```

Mutation controls:

- optional quick status update;
- direct link to purchase detail.

---

### 14.3 Purchase List

Route:

```txt
src/app/purchases/page.tsx
```

Server reads:

```txt
purchaseFiltersSchema.safeParse(searchParams)
getPurchaseList(filters)
getStores()
getCategories()
```

Mutation controls:

- none required;
- optional archive only if implemented.

---

### 14.4 Add Purchase

Route:

```txt
src/app/purchases/new/page.tsx
```

Server reads:

```txt
getStores()
getCategories()
```

Server mutation:

```txt
createPurchaseAction(input)
```

---

### 14.5 Edit Purchase

Route:

```txt
src/app/purchases/[purchaseId]/edit/page.tsx
```

Server reads:

```txt
getPurchaseDetail(purchaseId)
getStores()
getCategories()
```

Server mutation:

```txt
updatePurchaseAction(input)
```

---

### 14.6 Purchase Detail

Route:

```txt
src/app/purchases/[purchaseId]/page.tsx
```

Server reads:

```txt
getPurchaseDetail(purchaseId)
```

Server mutations:

```txt
updateReturnStatusAction(input)
updateRefundStatusAction(input)
updateWarrantyAction(input)
updateDocumentMetadataAction(input)
addTimelineNoteAction(input)
```

---

## 15. Example action implementation shape

This is illustrative, not final code.

```ts
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createPurchaseSchema } from '@/shared/validation/purchase.schema';
import { calculateReturnDeadline } from '@/entities/purchase/lib/calculate-return-deadline';
import { calculateWarrantyExpiration } from '@/entities/purchase/lib/calculate-warranty-expiration';
import { normalizePurchaseInput } from '@/entities/purchase/lib/normalize-purchase-input';
import { purchaseRepository } from '@/server/repositories/purchase.repository';
import { routes } from '@/shared/constants/routes';
import type { ActionResult } from '@/shared/utils/result';

export async function createPurchaseAction(
  input: unknown,
): Promise<ActionResult<{ purchaseId: string }>> {
  const parsed = createPurchaseSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      error: 'Some fields need your attention before saving.',
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const normalized = normalizePurchaseInput(parsed.data);

    const returnDeadline = calculateReturnDeadline(
      normalized.purchaseDate,
      normalized.returnPolicyDays,
    );

    const warrantyExpiration = calculateWarrantyExpiration(
      normalized.purchaseDate,
      normalized.warrantyDurationMonths,
    );

    const purchase = await purchaseRepository.createWithLifecycle({
      ...normalized,
      returnDeadline,
      warrantyExpiration,
    });

    revalidatePath(routes.dashboard);
    revalidatePath(routes.actionsNeeded);
    revalidatePath(routes.purchases);

    return {
      ok: true,
      data: { purchaseId: purchase.id },
    };
  } catch (error) {
    return {
      ok: false,
      error: 'We could not save this purchase. Your previous data is still safe.',
    };
  }
}
```

If using redirect after success:

```ts
redirect(routes.purchaseDetail(purchase.id));
```

Choose one create flow and keep it consistent with the form architecture.

---

## 16. Timeline event boundary

Timeline events should be created inside Server Actions or repository transactions, not in UI components.

Recommended responsibility split:

```txt
Server Action
  → validates mutation
  → decides mutation type
  → createTimelineEventFromMutation()
  → repository persists data + event
```

Recommended timeline events:

| Server Action | Event |
| --- | --- |
| `createPurchaseAction` | `purchase_created`, `deadline_calculated` |
| `updateReturnStatusAction` | `return_planned`, `item_returned` |
| `updateRefundStatusAction` | `refund_pending`, `refund_received` |
| `updateWarrantyAction` | `warranty_updated` |
| `updateDocumentMetadataAction` | `document_updated` |
| `addTimelineNoteAction` | `note_added` |

Timeline events are part of the user experience. They should explain lifecycle changes clearly.

---

## 17. Seed/reset boundary

Seed data should live in:

```txt
prisma/seed.ts
```

Recommended scripts:

```json
{
  "scripts": {
    "db:migrate": "prisma migrate dev",
    "db:seed": "tsx prisma/seed.ts",
    "db:reset": "prisma migrate reset",
    "test": "vitest",
    "test:e2e": "playwright test"
  }
}
```

Do not add a public reset endpoint in MVP unless it is protected or demo-only. For a portfolio project, documented seed scripts are enough.

---

## 18. Testing boundaries

Testing should protect backend behavior without becoming exhaustive.

### 18.1 Unit tests

Test domain logic:

```txt
calculateReturnDeadline
calculateWarrantyExpiration
classifyDeadlineUrgency
derivePurchaseLifecycleStatus
isRefundActionNeeded
isReceiptMissing
createTimelineEventFromMutation
normalizePurchaseInput
```

### 18.2 Validation tests

Test Zod schemas:

```txt
createPurchaseSchema
updatePurchaseSchema
updateReturnStatusSchema
updateRefundStatusSchema
updateWarrantySchema
purchaseFiltersSchema
documentMetadataSchema
```

### 18.3 Server Action/query tests

Add selectively for:

```txt
createPurchaseAction
updateReturnStatusAction
updateRefundStatusAction
getUrgentActions
getDashboardSummary
getPurchaseDetail
```

### 18.4 E2E test

One critical Playwright flow:

```txt
open dashboard
  → create purchase
  → verify calculated deadlines
  → open detail
  → update return/refund status
  → verify timeline
  → verify dashboard urgent actions update
```

---

## 19. Edge cases by API boundary

### 19.1 Create purchase

- missing product name;
- missing store;
- invalid purchase date;
- future purchase date beyond accepted threshold;
- negative price;
- invalid currency;
- invalid manual/support URL;
- negative return policy days;
- negative warranty duration months;
- store exists already;
- duplicate product name exists.

### 19.2 Update status

- invalid status;
- purchase not found;
- repeated submission;
- refund marked received without pending first;
- return planned after return deadline;
- return closed while refund pending;
- invalid dates attached to status update.

### 19.3 Query/filter

- invalid search params;
- no matching purchases;
- empty store/category options;
- urgency changes with current date;
- purchase detail missing related lifecycle records.

### 19.4 Documents

- receipt missing;
- receipt exists but unavailable;
- invoice exists but receipt missing;
- invalid reference URL;
- document update should remove or create urgent action.

---

## 20. What to avoid in the MVP

Avoid:

- creating a separate REST API for all operations;
- adding a separate backend service;
- importing Prisma in React components;
- importing Prisma in `entities/`;
- putting date/status logic inside Server Actions only;
- skipping server-side Zod validation because the form validates;
- exposing raw Prisma models as Client Component props;
- throwing raw database errors to the UI;
- adding authentication before the core flow is complete;
- real uploads, OCR or merchant integrations;
- background jobs/queues/cron reminders;
- over-modeling status transitions as a workflow engine;
- building generic service abstractions with no current need;
- adding Route Handlers just to look more backend-heavy.

---

## 21. Backend/API success criteria

The API/backend boundary is successful when:

- pages are thin and call server queries;
- forms and lifecycle controls call Server Actions;
- all writes validate with Zod server-side;
- Prisma is isolated to repositories and seed scripts;
- domain logic is pure and unit-tested;
- purchase creation uses a transaction for lifecycle consistency;
- urgent actions are derived server-side;
- timeline events are generated by meaningful mutations;
- route handlers are minimal and intentional;
- the backend can be explained clearly in a technical interview.
