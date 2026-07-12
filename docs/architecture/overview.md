# AfterBuy — Architecture Overview

**Status:** Draft 1.0  
**Project type:** Lightweight full-stack product portfolio project  
**Repository path:** `docs/architecture/overview.md`  
**Related documents:**
- `docs/product/project-charter.md`
- `docs/product/feasibility-study.md`
- `docs/product/mvp-scope.md`
- `docs/product/user-journey.md`

---

## 1. Architecture goal

AfterBuy is a lightweight full-stack product built with **Next.js, TypeScript, React, Prisma and Zod**.

The architecture must support a polished frontend experience while showing real engineering maturity across:

- product-oriented UI flows;
- reusable frontend components;
- server-side validation;
- persistence;
- business logic;
- data modeling;
- testing;
- documentation of trade-offs.

The architecture should not make the project feel like a backend platform. The backend exists only to support the product journey:

> add a purchase → persist it → calculate deadlines → surface urgent actions → update lifecycle status

The strongest portfolio signal is a complete and well-structured vertical slice, not architectural ceremony.

---

## 2. Architecture overview

AfterBuy uses a **single Next.js full-stack repository** with clear internal boundaries.

```txt
UI routes and layouts
        ↓
Feature modules
        ↓
Shared UI / hooks / utilities
        ↓
Domain entities and pure business logic
        ↓
Server actions and server queries
        ↓
Repositories / Prisma data access
        ↓
Database
```

The main architectural idea is:

> Next.js owns routing and rendering. Features own product flows. Entities own domain concepts. Server modules own persistence and mutations. Shared modules own reusable primitives.

This keeps the app easy to navigate for frontend reviewers while still showing backend awareness.

---

## 3. Recommended folder structure

```txt
afterbuy/
  prisma/
    schema.prisma
    seed.ts

  src/
    app/
      layout.tsx
      page.tsx

      actions-needed/
        page.tsx
        loading.tsx
        error.tsx

      purchases/
        page.tsx
        loading.tsx
        error.tsx

        new/
          page.tsx

        [purchaseId]/
          page.tsx
          loading.tsx
          error.tsx

          edit/
            page.tsx

      api/
        health/
          route.ts

    features/
      dashboard/
        components/
          DashboardSummary.tsx
          UrgentActionsList.tsx
          RecentPurchases.tsx
        mappers/
          dashboard-view.mapper.ts

      actions-needed/
        components/
          ActionNeededCard.tsx
          ActionsNeededList.tsx
        mappers/
          action-needed-view.mapper.ts

      purchases/
        components/
          PurchaseList.tsx
          PurchaseListItem.tsx
          PurchaseFilters.tsx
          PurchaseListEmptyState.tsx
        mappers/
          purchase-list-view.mapper.ts

      purchase-detail/
        components/
          PurchaseHeader.tsx
          PurchaseDeadlinePanel.tsx
          PurchaseLifecyclePanel.tsx
          PurchaseDocumentsPanel.tsx
          PurchaseTimeline.tsx
        mappers/
          purchase-detail-view.mapper.ts

      purchase-form/
        components/
          PurchaseForm.tsx
          StoreFields.tsx
          ReturnPolicyFields.tsx
          WarrantyFields.tsx
          DocumentReferenceFields.tsx
        hooks/
          usePurchaseForm.ts
        mappers/
          purchase-form.mapper.ts

    entities/
      purchase/
        model/
          purchase.types.ts
          purchase.enums.ts
        lib/
          calculate-return-deadline.ts
          calculate-warranty-expiration.ts
          classify-deadline-urgency.ts
          derive-purchase-lifecycle-status.ts
          normalize-purchase-input.ts

      store/
        model/
          store.types.ts

      return-case/
        model/
          return-case.types.ts
          return-case.enums.ts
        lib/
          derive-return-status.ts

      refund/
        model/
          refund.types.ts
          refund.enums.ts
        lib/
          is-refund-action-needed.ts

      warranty/
        model/
          warranty.types.ts
          warranty.enums.ts
        lib/
          derive-warranty-status.ts

      document/
        model/
          purchase-document.types.ts
          purchase-document.enums.ts
        lib/
          is-receipt-missing.ts

      timeline-event/
        model/
          timeline-event.types.ts
          timeline-event.enums.ts
        lib/
          create-timeline-event-from-mutation.ts

    server/
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

    shared/
      ui/
        Button.tsx
        Input.tsx
        Select.tsx
        Textarea.tsx
        Card.tsx
        Badge.tsx
        StatusBadge.tsx
        DeadlineBadge.tsx
        UrgencyBadge.tsx
        EmptyState.tsx
        ErrorState.tsx
        LoadingState.tsx

      validation/
        purchase.schema.ts
        purchase-filters.schema.ts
        status.schema.ts
        document.schema.ts

      utils/
        date.ts
        money.ts
        result.ts
        url.ts

      hooks/
        useIsMobile.ts

      constants/
        routes.ts
        urgency-thresholds.ts

  tests/
    e2e/
      purchase-lifecycle.spec.ts

  docs/
    product/
    architecture/
    adr/
```

This structure is intentionally modular but not heavy. It avoids a monorepo and avoids artificial package boundaries.

---

## 4. Layer responsibilities

### `app/`

`app/` owns Next.js routing, layouts and route-level loading/error boundaries.

Responsibilities:

- define pages and route segments;
- load server-side data by calling query functions;
- compose feature components;
- define `loading.tsx` and `error.tsx` for route-level states;
- expose minimal Route Handlers only when useful.

What should not live here:

- Prisma calls;
- business logic;
- complex view logic;
- reusable UI primitives;
- form internals.

Pages should be thin composition layers.

---

### `features/`

`features/` owns product-specific UI flows.

Examples:

- dashboard;
- actions needed;
- purchase list;
- purchase detail;
- purchase form.

Responsibilities:

- organize components around user-facing flows;
- map server/query data into view models;
- compose entity data into readable UI;
- contain feature-specific hooks;
- handle local UI concerns such as filter panels or form sections.

What should not live here:

- direct Prisma queries;
- raw database types as UI contracts;
- reusable generic UI primitives;
- cross-feature domain rules.

A feature should answer: “How does this product flow appear and behave?”

---

### `entities/`

`entities/` owns domain concepts and pure business logic.

Examples:

- purchase;
- store;
- return case;
- refund;
- warranty;
- document;
- timeline event.

Responsibilities:

- define domain types and enums;
- contain pure functions for date/status/urgency logic;
- expose business rules that are independent from React, Next.js and Prisma;
- make critical behavior unit-testable.

What should not live here:

- React components;
- Server Actions;
- Prisma Client;
- browser APIs;
- route-specific code.

An entity module should be understandable even outside Next.js.

---

### `shared/`

`shared/` owns reusable building blocks that are not specific to one feature.

Responsibilities:

- UI primitives;
- generic badges and states;
- reusable validation schemas;
- formatting utilities;
- date and money helpers;
- route constants;
- generic hooks.

What should not live here:

- feature-specific UI;
- business logic tied to one entity;
- broad “miscellaneous” dumping ground.

Shared code should be small, boring and genuinely reusable.

---

### `server/`

`server/` owns backend-facing code inside the Next.js application.

Responsibilities:

- Prisma client setup;
- repositories;
- server-side queries;
- Server Actions;
- Prisma-to-domain mapping;
- persistence orchestration;
- server-only validation before writes.

What should not live here:

- React components;
- browser-only hooks;
- visual UI logic;
- business rules that can be pure and tested in `entities/`.

The server layer should be lightweight but explicit enough to show backend awareness.

---

## 5. Main data flow

### Read flow

```txt
app route/page
  → server query
    → repository
      → Prisma
    → domain logic for derived values
  → feature view mapper
  → feature components
  → shared UI components
```

Example:

```txt
src/app/page.tsx
  → getDashboardSummary()
  → getUrgentActions()
  → DashboardSummary
  → UrgentActionsList
```

Read queries should return display-ready or feature-ready data, not raw Prisma models.

---

### Mutation flow

```txt
feature form / action UI
  → Server Action
    → Zod validation
    → input normalization
    → domain logic
    → repository / Prisma transaction
    → timeline event creation
    → revalidate route/path
  → typed action result
  → UI pending/success/error state
```

Example:

```txt
PurchaseForm
  → createPurchaseAction(formData)
  → createPurchaseSchema.safeParse()
  → calculateReturnDeadline()
  → calculateWarrantyExpiration()
  → purchaseRepository.createWithLifecycle()
  → revalidatePath("/")
  → redirect("/purchases/:id")
```

---

## 6. Frontend architecture summary

The frontend should be **feature-first** and **component-driven**.

Priorities:

- clear screen composition;
- reusable UI primitives;
- form quality;
- status/deadline readability;
- mobile-first responsive behavior;
- deliberate loading/error/empty states;
- minimal client-side state.

Use Client Components only when interactivity requires them:

- forms;
- filters;
- status update controls;
- expandable sections;
- small UI toggles.

Prefer Server Components for pages and read-only sections.

---

## 7. Backend lightweight architecture summary

The backend should support:

- persistence through Prisma;
- Server Actions for internal mutations;
- query functions for dashboard/list/detail;
- Zod validation before database writes;
- pure business logic for deadlines and statuses;
- timeline event creation;
- seeded demo data.

It should not include:

- authentication;
- user accounts;
- authorization layers;
- real uploads;
- OCR;
- queues;
- merchant integrations;
- notification delivery;
- microservices;
- separate API service.

The backend should feel like a product support layer, not a platform.

---

## 8. Data access layer

Use a small repository layer between Prisma and application queries/actions.

The repository layer exists to:

- avoid scattering Prisma calls across pages and actions;
- keep data access testable and replaceable;
- centralize includes/selects;
- hide Prisma-specific details from features;
- coordinate transactions for lifecycle mutations.

Recommended repository examples:

```txt
purchase.repository.ts
  - createWithLifecycle(input)
  - updatePurchase(id, input)
  - findList(filters)
  - findDetail(id)
  - updateReturnStatus(id, status)
  - updateRefundStatus(id, status)
  - updateWarranty(id, input)

store.repository.ts
  - findOrCreateByName(input)
  - findAll()
  - findCategories()

timeline-event.repository.ts
  - create(event)
  - createMany(events)
```

Repositories should not contain UI logic. They may use Prisma transactions, but business decisions should stay in domain functions or service-level orchestration inside Server Actions.

---

## 9. Domain logic layer

Domain logic should live mainly in `entities/*/lib`.

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

Domain logic rules:

- no React imports;
- no Prisma Client imports;
- no browser APIs;
- no database access;
- deterministic output;
- explicit `currentDate` parameter for date-sensitive logic;
- tested with fixed dates.

This is the most important place to show that AfterBuy is not just UI.

---

## 10. Prisma usage

Use Prisma for the MVP persistence model:

- `Store`;
- `Purchase`;
- `ReturnCase`;
- `Refund`;
- `Warranty`;
- `PurchaseDocument`;
- `TimelineEvent`.

Recommended usage:

- keep schema small and readable;
- model relationships explicitly;
- use enums for statuses and document types;
- use `priceCents` instead of floating-point money;
- use calendar-date assumptions consistently;
- use transactions when creating a purchase and related lifecycle records;
- seed realistic demo data.

Avoid:

- premature indexing strategy;
- advanced database optimization;
- soft-delete complexity unless archive is implemented;
- storing real document files;
- exposing Prisma models directly to Client Components.

Prisma is a persistence tool, not the domain model.

---

## 11. Zod validation boundary

Zod should be used at every user-input boundary.

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

Boundary rules:

- forms use Zod for immediate user feedback;
- Server Actions validate again before writing;
- query/search params are validated before use;
- repositories receive already-normalized input;
- invalid data returns typed errors, not raw exceptions.

Client-side validation improves UX. Server-side validation protects data integrity.

---

## 12. Server Actions vs Route Handlers

### Use Server Actions for internal product mutations

Use Server Actions for:

- create purchase;
- update purchase;
- update return status;
- update refund status;
- update warranty information;
- update document metadata;
- add timeline note.

Why:

- these mutations are internal to the app;
- they are directly tied to forms and product actions;
- they reduce unnecessary REST boilerplate;
- they keep the MVP lightweight.

### Use server-side query functions for reads

Use regular server-only query functions for:

- dashboard summary;
- urgent actions;
- purchase list;
- purchase detail;
- stores/categories.

They can be called from Server Components and keep pages clean.

### Use Route Handlers only for API-shaped boundaries

Use Route Handlers for:

- `/api/health`;
- future demo/export endpoint;
- selected public-read API example only if useful;
- integration-style testing boundary if needed.

Do not turn every operation into a REST endpoint. That would make the project heavier without improving the core product.

---

## 13. Form architecture

Use:

- React Hook Form for form state;
- Zod resolver for validation;
- Server Actions for submission;
- typed action result for server errors;
- small field components for readability.

Form responsibilities:

- show inline validation errors;
- preserve input after failed submission;
- disable submit while pending;
- prevent duplicate submission;
- display server-level mutation errors;
- map UI values to server DTOs.

The form should not calculate deadlines directly as the source of truth. It can preview values, but final calculations must happen server-side through shared domain logic.

---

## 14. Empty, loading and error state architecture

Use a mix of route-level and component-level states.

### Route-level states

Use Next.js:

```txt
loading.tsx
error.tsx
not-found.tsx
```

For:

- dashboard load;
- purchase list load;
- purchase detail load.

### Component-level states

Use shared UI components:

```txt
EmptyState
ErrorState
LoadingState
```

For:

- no urgent actions;
- no purchases;
- no filter results;
- no timeline events;
- no documents;
- form submit error;
- inline status update error.

States are part of the product experience, not afterthoughts.

---

## 15. Testing strategy summary

Testing should protect the product-critical behavior without slowing the MVP.

Recommended scope:

- unit tests for domain logic;
- validation tests for Zod schemas;
- repository/query tests where feasible;
- component tests for forms, badges and empty states;
- one Playwright E2E flow for the main journey.

The most important test flow is:

```txt
create purchase
  → deadline calculated
  → purchase appears in list
  → urgent action appears
  → status updated
  → dashboard changes
```

---

## 16. Naming conventions

### Files

Use kebab-case:

```txt
calculate-return-deadline.ts
purchase-list-view.mapper.ts
create-purchase.action.ts
get-urgent-actions.query.ts
```

### React components

Use PascalCase:

```txt
PurchaseForm.tsx
DeadlineBadge.tsx
UrgentActionsList.tsx
```

### Server Actions

Use verb + domain + `.action.ts`:

```txt
create-purchase.action.ts
update-refund-status.action.ts
```

### Queries

Use `get-*` + `.query.ts`:

```txt
get-dashboard-summary.query.ts
get-purchase-detail.query.ts
```

### Repositories

Use singular domain + `.repository.ts`:

```txt
purchase.repository.ts
store.repository.ts
```

### Schemas

Use domain + purpose + `schema`:

```txt
createPurchaseSchema
updatePurchaseSchema
purchaseFiltersSchema
```

### Types

Use domain-oriented names:

```txt
Purchase
PurchaseDetail
PurchaseListItem
CreatePurchaseInput
PurchaseLifecycleStatus
UrgencyLevel
```

Avoid generic names like `Data`, `Item`, `Props2`, `Helper`, `Utils`.

---

## 17. Anti-patterns to avoid

Avoid:

- putting business logic inside React components;
- calling Prisma directly from pages or feature components;
- duplicating validation rules between client and server;
- making every mutation a REST endpoint;
- creating a separate backend service for the MVP;
- introducing authentication before the product flow is complete;
- adding real uploads/OCR/integrations;
- overusing global state;
- using Prisma models directly as UI contracts;
- placing unrelated code in `shared/`;
- building a generic CRUD dashboard without urgent action logic;
- making the timeline a decorative element with no connection to mutations;
- testing snapshots instead of business behavior;
- documenting future roadmap items as MVP features.

The architecture should stay boring, explicit and product-driven.

---

## 18. ADRs to document

Create ADRs for decisions that materially affect the project.

Recommended ADRs:

1. **Use Next.js full-stack single repository**  
   Why this supports frontend architecture plus backend awareness without a separate backend.

2. **Use Prisma for lightweight persistence and data modeling**  
   Why Prisma is enough for the MVP data layer.

3. **Use Zod at form and server boundaries**  
   Why validation is shared and repeated server-side.

4. **Keep business logic outside UI components**  
   Why date/status/urgency rules live in pure TypeScript modules.

5. **Use Server Actions for internal mutations and Route Handlers only when useful**  
   Why the app avoids unnecessary REST boilerplate.

6. **Avoid authentication, uploads and integrations in the MVP**  
   Why these are roadmap items, not first-version scope.

7. **Use feature-based architecture without monorepo ceremony**  
   Why internal boundaries are enough for this portfolio project.

8. **Use a focused testing strategy**  
   Why tests prioritize domain logic, validation and one critical E2E journey.

---

## 19. Final architectural statement

AfterBuy should be built as:

> a polished frontend-led product with a small but real backend/data layer.

The codebase should communicate:

- strong React and TypeScript architecture;
- clear feature boundaries;
- thoughtful UX states;
- real persistence;
- validation discipline;
- testable business logic;
- pragmatic backend awareness;
- conscious scope control.

The architecture is successful when a reviewer can understand the product, navigate the codebase and see the main business rules within a few minutes.
