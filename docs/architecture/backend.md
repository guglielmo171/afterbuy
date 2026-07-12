# AfterBuy — Backend Lightweight Architecture

**Status:** Draft 1.0  
**Repository path:** `docs/architecture/backend.md`  
**Related documents:**
- `docs/architecture/overview.md`
- `docs/product/feasibility-study.md`
- `docs/product/mvp-scope.md`
- `docs/product/user-journey.md`

---

## 1. Backend architecture goal

AfterBuy includes a real backend/data layer, but it must remain lightweight.

The backend should prove that the product is designed end-to-end:

- persistence;
- data modeling;
- server-side validation;
- mutations;
- server-side queries;
- business logic;
- timeline events;
- tests for critical behavior.

The backend must not become the product. It exists to support the frontend-led user journey.

The architectural boundary is:

> build enough backend to make AfterBuy credible, but not enough to turn it into a backend-heavy platform.

---

## 2. Backend scope

### Include in MVP

- Prisma schema;
- SQLite local database;
- optional PostgreSQL-compatible deployment strategy;
- seed data;
- repositories;
- server-side queries;
- Server Actions for mutations;
- Zod validation before writes;
- pure business logic from `entities/`;
- timeline event creation;
- typed action results;
- route revalidation.

### Exclude from MVP

- authentication;
- real user accounts;
- authorization/roles;
- multi-tenant architecture;
- real file upload;
- cloud storage;
- OCR;
- email parsing;
- merchant integrations;
- queues/background jobs;
- notifications;
- payment/subscription logic;
- admin dashboard;
- separate backend service;
- microservices.

These excluded items can be mentioned in the roadmap or ADRs, but not implemented in the first version.

---

## 3. Server layer structure

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

This keeps backend code visible and understandable without introducing a separate backend app.

---

## 4. Prisma client setup

Use a single Prisma client module:

```txt
src/server/db/prisma.ts
```

Responsibilities:

- instantiate Prisma Client;
- avoid duplicate clients in development;
- keep database access server-only;
- export `prisma` for repositories.

Example shape:

```ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development'
      ? ['query', 'error', 'warn']
      : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
```

Do not import Prisma from React Client Components.

---

## 5. Data model

The MVP data model should include:

- `Store`;
- `Purchase`;
- `ReturnCase`;
- `Refund`;
- `Warranty`;
- `PurchaseDocument`;
- `TimelineEvent`.

### Modeling principles

- keep relationships explicit;
- use enums for statuses;
- use `priceCents` for money;
- use calendar-date assumptions consistently;
- avoid real document storage;
- model documents as metadata/mock references;
- use timestamps for auditability;
- avoid over-modeling users/accounts/auth.

### Suggested relationship shape

```txt
Store
  has many Purchases

Purchase
  belongs to Store
  has one ReturnCase
  has one Refund
  has one Warranty
  has many PurchaseDocuments
  has many TimelineEvents
```

The model should support the primary product journey, not every possible future feature.

---

## 6. Prisma usage rules

Use Prisma inside repositories only.

Allowed:

```txt
server/repositories/*.repository.ts
server/db/prisma.ts
prisma/seed.ts
```

Avoid:

```txt
app/**/*.tsx
features/**/*.tsx
entities/**/*.ts
shared/**/*.ts
```

### Use transactions for lifecycle writes

Creating a purchase should create related records together:

- purchase;
- return case;
- refund record;
- warranty record;
- document metadata if present;
- timeline events.

Use a Prisma transaction so the lifecycle is consistent.

### Use select/include deliberately

Queries should not fetch unnecessary data.

Examples:

- list query returns compact purchase data;
- detail query includes related lifecycle records;
- dashboard query returns only what is needed for summary/action cards.

### Do not expose Prisma models as UI contracts

Map Prisma results to domain or view-ready objects before they reach feature components.

---

## 7. Data access layer

Repositories are the data access layer.

They should provide persistence methods with clear names.

### `purchase.repository.ts`

Suggested methods:

```txt
createWithLifecycle(input)
updatePurchase(id, input)
findList(filters)
findDetail(id)
updateReturnStatus(id, input)
updateRefundStatus(id, input)
updateWarranty(id, input)
updateDocumentMetadata(id, input)
archive(id) // optional
```

### `store.repository.ts`

Suggested methods:

```txt
findAll()
findOrCreateByName(input)
findCategories()
```

### `timeline-event.repository.ts`

Suggested methods:

```txt
create(event)
createMany(events)
findByPurchaseId(purchaseId)
```

Repositories should not decide whether a deadline is urgent or whether a refund needs action. That belongs to domain logic.

---

## 8. Server queries

Queries are read-side application functions.

Required queries:

```txt
getDashboardSummary
getUrgentActions
getPurchaseList
getPurchaseDetail
getStores
getCategories
```

### Query responsibilities

Queries should:

- call repositories;
- validate filters/search params if needed;
- apply domain logic for derived values;
- return typed data to pages/features;
- avoid leaking Prisma internals;
- keep route pages thin.

### Example query flow

```txt
getUrgentActions()
  → purchaseRepository.findActionCandidates()
  → classifyDeadlineUrgency()
  → isRefundActionNeeded()
  → isReceiptMissing()
  → map to UrgentAction[]
```

The dashboard and actions-needed views should rely on query output instead of recalculating product rules in components.

---

## 9. Server Actions

Server Actions are the write-side application functions.

Required mutations:

```txt
createPurchase
updatePurchase
updateReturnStatus
updateRefundStatus
updateWarranty
updateDocumentMetadata
addTimelineNote
```

### Action responsibilities

Each Server Action should:

1. receive input from form/action UI;
2. validate input with Zod;
3. normalize values;
4. call pure domain logic where needed;
5. persist data through repositories;
6. create timeline events when relevant;
7. revalidate affected routes;
8. return a typed success/error result or redirect after successful create.

### Typed result pattern

Use a small shared result type:

```ts
export type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };
```

This prevents UI code from parsing thrown exceptions.

---

## 10. Domain logic layer

Domain logic should be framework-independent and located in `entities/*/lib`.

Core functions:

```txt
calculateReturnDeadline(purchaseDate, returnPolicyDays)
calculateWarrantyExpiration(purchaseDate, durationMonths)
classifyDeadlineUrgency(deadline, currentDate)
derivePurchaseLifecycleStatus(purchase)
isRefundActionNeeded(refund, currentDate)
isReceiptMissing(documents)
createTimelineEventFromMutation(mutationType, payload)
normalizePurchaseInput(input)
```

### Rules

Domain logic should:

- accept plain values or domain types;
- return plain values;
- avoid database access;
- avoid React/Next.js imports;
- avoid hidden `new Date()` inside critical functions;
- accept `currentDate` as an argument when time-sensitive;
- be covered by unit tests.

### Why this matters

This layer proves that AfterBuy has real product logic:

- return windows;
- warranty periods;
- refund pending checks;
- receipt availability;
- lifecycle timeline events;
- urgency classification.

---

## 11. Zod validation boundary

Zod validates all user-controlled inputs.

Required schemas:

```txt
createPurchaseSchema
updatePurchaseSchema
updateReturnStatusSchema
updateRefundStatusSchema
updateWarrantySchema
purchaseFiltersSchema
documentMetadataSchema
```

### Validation locations

Use schemas in two places:

1. **Client forms**  
   For immediate UX feedback.

2. **Server Actions / server queries**  
   For real protection before writes or query execution.

### Validation rules

Cover:

- required fields;
- valid dates;
- price greater than or equal to zero;
- valid currency;
- valid URL format;
- valid status values;
- return policy days greater than or equal to zero;
- warranty duration months greater than or equal to zero;
- purchase date not unreasonably far in the future.

Do not trust client validation only.

---

## 12. Server Actions vs Route Handlers

### Server Actions

Use Server Actions for app-internal mutations:

- create purchase;
- update purchase;
- update return/refund/warranty status;
- update document metadata;
- add timeline event/note.

This keeps the MVP lightweight and aligns with form-driven product flows.

### Route Handlers

Use Route Handlers only when an API-shaped boundary is useful:

```txt
GET /api/health
GET /api/demo/export      # optional future idea
GET /api/purchases        # optional public API-style example, not MVP required
```

Route Handlers are not the default for product mutations.

### Decision rule

Ask:

> Is this operation called only by internal UI?

Use Server Action.

> Is this operation meant to behave like an external API endpoint?

Use Route Handler.

For the MVP, almost everything is internal UI.

---

## 13. Timeline event creation

Timeline events should be created by mutations, not manually sprinkled in UI code.

Examples:

```txt
createPurchase
  → purchase_created
  → deadline_calculated

updateReturnStatus
  → return_planned
  → item_returned

updateRefundStatus
  → refund_pending
  → refund_received

updateWarranty
  → warranty_updated

updateDocumentMetadata
  → document_updated
```

Timeline events give backend mutations product meaning. They make the detail page feel like a lifecycle, not a database record.

---

## 14. Caching and revalidation

Keep caching simple.

Use `revalidatePath` after mutations that affect visible data.

Examples:

```txt
createPurchase
  → revalidatePath("/")
  → revalidatePath("/purchases")
  → redirect("/purchases/:id")

updateRefundStatus
  → revalidatePath("/")
  → revalidatePath("/actions-needed")
  → revalidatePath(`/purchases/${purchaseId}`)
```

Avoid complex caching strategies in the MVP.

Do not introduce background refresh, queues or event-driven invalidation.

---

## 15. Error handling

Errors should be safe and user-facing.

### Server Action errors

Return typed errors for expected failures:

- invalid input;
- invalid status;
- purchase not found;
- mutation failed;
- invalid URL/date/price.

Throw only for unexpected failures.

### UI error messages

Do not expose raw database or stack errors.

Use messages like:

```txt
We could not save this change. Your previous data is still safe.
Some fields need your attention before saving.
This purchase could not be loaded.
```

Server logs can contain technical detail. UI should stay calm and practical.

---

## 16. Seed data

Seed data is part of the product demo.

Required scenarios:

1. Electronics purchase with warranty active.
2. Shoes/clothing purchase with return deadline due soon.
3. Returned product with refund pending.
4. Refunded product with closed lifecycle.
5. High-value item with warranty expiring soon.
6. Purchase missing receipt.
7. Purchase with manual/support link.
8. Expired return window.
9. Offline purchase with minimal store data.
10. Older purchase with expired warranty.

Seed data should make the dashboard valuable immediately.

The reviewer should not need to manually create data to understand AfterBuy.

---

## 17. Backend testing focus

Backend/domain tests should cover:

- return deadline calculation;
- warranty expiration calculation;
- urgency classification;
- refund action detection;
- receipt missing detection;
- Zod validation for create/update purchase;
- status update validation;
- repository/query behavior where feasible.

The goal is not exhaustive backend testing. The goal is to protect business-critical behavior.

---

## 18. Backend naming conventions

### Actions

```txt
create-purchase.action.ts
update-return-status.action.ts
update-refund-status.action.ts
```

### Queries

```txt
get-dashboard-summary.query.ts
get-urgent-actions.query.ts
get-purchase-detail.query.ts
```

### Repositories

```txt
purchase.repository.ts
store.repository.ts
timeline-event.repository.ts
```

### Inputs

```txt
CreatePurchaseInput
UpdatePurchaseInput
UpdateRefundStatusInput
```

### Results

```txt
CreatePurchaseResult
UpdateStatusResult
DashboardSummary
UrgentAction
```

### Domain functions

Use verb-based names:

```txt
calculateReturnDeadline
classifyDeadlineUrgency
derivePurchaseLifecycleStatus
isRefundActionNeeded
```

---

## 19. Backend anti-patterns to avoid

Avoid:

- adding authentication before the core product flow is finished;
- creating a separate backend service;
- turning every operation into REST;
- putting Prisma calls in route pages;
- putting business rules inside repositories;
- exposing Prisma types to Client Components;
- skipping server-side validation because the form already validates;
- making seed data unrealistic;
- implementing real uploads;
- adding background jobs for reminders;
- designing for multi-user production before single-user demo value is clear;
- introducing service abstractions with no current need;
- optimizing database performance prematurely.

---

## 20. Backend success criteria

The backend architecture is successful when:

- data is persisted through Prisma;
- the MVP data model is small but realistic;
- Server Actions validate and mutate data safely;
- queries keep UI pages clean;
- domain logic is pure and tested;
- timeline events are created by meaningful mutations;
- seed data makes the product understandable;
- the backend remains easy to explain in an interview.
