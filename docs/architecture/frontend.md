# AfterBuy — Frontend Architecture

**Status:** Draft 1.0  
**Repository path:** `docs/architecture/frontend.md`  
**Related documents:**
- `docs/architecture/overview.md`
- `docs/product/mvp-scope.md`
- `docs/product/user-journey.md`

---

## 1. Frontend architecture goal

The AfterBuy frontend should demonstrate strong React and TypeScript engineering without becoming over-abstracted.

The frontend must make the core product promise visible:

> “What do I need to act on before I lose money, time or support rights?”

This means the UI should prioritize:

- urgent actions;
- deadlines;
- statuses;
- lifecycle clarity;
- form quality;
- responsive behavior;
- empty/error/loading states.

The frontend should not feel like a generic CRUD dashboard. It should feel like an action-oriented post-purchase assistant.

---

## 2. Rendering approach

Use the Next.js App Router with a pragmatic mix of Server Components and Client Components.

### Prefer Server Components for

- route pages;
- dashboard data composition;
- purchase list initial render;
- purchase detail read-only sections;
- server-side data loading;
- SEO/static page shell where relevant.

### Use Client Components for

- forms;
- interactive filters;
- status update controls;
- dropdowns/selects;
- optimistic or pending UI;
- expandable timeline/details if needed.

Default rule:

> Start as a Server Component. Convert to a Client Component only when interaction requires client-side state or browser APIs.

---

## 3. Route-level structure

Recommended routes:

```txt
src/app/
  page.tsx                         # Dashboard

  actions-needed/
    page.tsx                       # All actionable purchases
    loading.tsx
    error.tsx

  purchases/
    page.tsx                       # Purchase list
    loading.tsx
    error.tsx

    new/
      page.tsx                     # Add purchase

    [purchaseId]/
      page.tsx                     # Purchase detail
      loading.tsx
      error.tsx

      edit/
        page.tsx                   # Edit purchase
```

Route pages should compose feature components and call server queries. They should stay thin.

Example responsibility split:

```txt
src/app/purchases/page.tsx
  - validates search params
  - calls getPurchaseList()
  - renders PurchaseFilters and PurchaseList

src/features/purchases/components/PurchaseList.tsx
  - displays list/card/table UI
  - handles empty list presentation
  - delegates badges to shared UI
```

---

## 4. Feature modules

Use feature folders to group product flows.

```txt
features/
  dashboard/
  actions-needed/
  purchases/
  purchase-detail/
  purchase-form/
```

A feature may contain:

```txt
components/
hooks/
mappers/
types.ts
```

### Feature responsibilities

Features should:

- organize product-specific UI;
- compose shared UI primitives;
- map query data into display models;
- manage local UI concerns;
- expose clear components to route pages.

Features should not:

- call Prisma;
- contain reusable domain logic;
- duplicate validation rules;
- become dumping grounds for unrelated UI.

---

## 5. Shared UI foundation

Create a small reusable UI layer.

Required components:

```txt
Button
Input
Select
Textarea
Card
Badge
StatusBadge
DeadlineBadge
UrgencyBadge
EmptyState
ErrorState
LoadingState
```

### UI component principles

- keep components accessible by default;
- expose simple props;
- avoid styling variants that are not used;
- keep domain-specific components small;
- make states visually consistent;
- prefer composition over large configurable components.

### UI component examples

`StatusBadge` should support:

- return status;
- refund status;
- warranty status;
- lifecycle status.

`DeadlineBadge` should communicate:

- overdue;
- due soon;
- upcoming;
- safe;
- unknown.

`EmptyState` should support:

- title;
- description;
- optional action;
- optional icon.

The UI foundation exists to make the product consistent, not to build a design system for its own sake.

---

## 6. Dashboard architecture

The dashboard is the main product surface.

It should answer:

> “What should I check today or this week?”

Recommended structure:

```txt
features/dashboard/
  components/
    DashboardSummary.tsx
    UrgentActionsList.tsx
    UrgentActionCard.tsx
    RecentPurchases.tsx
  mappers/
    dashboard-view.mapper.ts
```

Data loaded by the route:

```txt
getDashboardSummary()
getUrgentActions()
```

Dashboard UI should show:

- summary cards;
- urgent actions;
- recent purchases;
- no urgent actions empty state;
- dashboard loading state;
- dashboard error state.

The dashboard should not calculate urgency in the component. Urgency should already be derived by server/domain logic.

---

## 7. Actions needed architecture

The Actions Needed view lists all actionable purchases.

Recommended structure:

```txt
features/actions-needed/
  components/
    ActionsNeededList.tsx
    ActionNeededCard.tsx
    ActionReason.tsx
  mappers/
    action-needed-view.mapper.ts
```

Each action card should show:

- product name;
- store;
- reason for action;
- urgency badge;
- deadline date or pending duration;
- direct link to detail;
- optional quick status action.

This view should be more action-oriented than a normal purchase list.

---

## 8. Purchase list architecture

The purchase list should work on mobile and desktop.

Recommended structure:

```txt
features/purchases/
  components/
    PurchaseList.tsx
    PurchaseListItem.tsx
    PurchaseListCard.tsx
    PurchaseFilters.tsx
    PurchaseListEmptyState.tsx
  mappers/
    purchase-list-view.mapper.ts
```

### Desktop

Desktop can use a table-like layout with:

- product;
- store;
- category;
- purchase date;
- price;
- return status;
- refund status;
- warranty status;
- urgency.

### Mobile

Mobile should use cards with:

- product/store first;
- most relevant deadline;
- urgency badge;
- primary action link.

### Filters

Required filters:

- status;
- store;
- category;
- urgency.

Should-have:

- search by product/store name;
- URL search params for filter state.

Filter values should be validated with `purchaseFiltersSchema` before server queries run.

---

## 9. Purchase detail architecture

The detail page should explain the purchase lifecycle, not just display raw data.

Recommended structure:

```txt
features/purchase-detail/
  components/
    PurchaseHeader.tsx
    PurchaseDeadlinePanel.tsx
    PurchaseLifecyclePanel.tsx
    PurchaseReturnSection.tsx
    PurchaseRefundSection.tsx
    PurchaseWarrantySection.tsx
    PurchaseDocumentsPanel.tsx
    PurchaseTimeline.tsx
  mappers/
    purchase-detail-view.mapper.ts
```

The detail page should show:

- summary;
- store;
- price;
- purchase date;
- return deadline;
- warranty expiration;
- return/refund/warranty statuses;
- receipt/manual/support metadata;
- notes;
- timeline;
- lifecycle actions.

Mutation controls should call Server Actions and show inline pending/error states.

---

## 10. Form architecture

Use **React Hook Form + Zod**.

Recommended structure:

```txt
features/purchase-form/
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
```

### Form responsibilities

The form should:

- collect required and optional purchase data;
- show inline validation messages;
- disable submit while pending;
- prevent duplicate submissions;
- preserve values after server errors;
- show form-level mutation errors;
- support create and edit mode;
- map UI values into action input.

### Required fields

- product name;
- store;
- category;
- purchase date;
- price;
- return policy days;
- warranty duration months.

### Optional fields

- order number;
- manual URL;
- support URL;
- receipt/document reference;
- notes.

### Validation

Client-side validation uses Zod through React Hook Form.

Server-side validation must run again inside Server Actions.

Client validation is for UX. Server validation is the real write boundary.

---

## 11. Form submission flow

Recommended create flow:

```txt
PurchaseForm
  → submit
  → createPurchaseAction(input)
  → server validates with createPurchaseSchema
  → server normalizes input
  → server calculates deadlines
  → server persists purchase + lifecycle records
  → server creates timeline events
  → server revalidates affected routes
  → user navigates to detail page
```

The form may show calculated deadline previews, but previews are not the source of truth. Final values are calculated server-side using shared domain functions.

---

## 12. Client state strategy

Keep client state minimal.

Use local component state for:

- open/closed panels;
- selected tab;
- temporary UI interactions;
- local pending indicators;
- controlled filter widgets before applying.

Use React Hook Form for form state.

Use URL search params for filters as a should-have.

Avoid adding a global state library in the MVP unless a real cross-route state problem appears.

The primary persisted state is the database, not client memory.

---

## 13. Error, loading and empty states

AfterBuy should treat UI states as first-class product design.

### Loading states

Use:

- route-level `loading.tsx` for page loading;
- skeleton cards/rows for dashboard/list/detail;
- inline pending states for status updates;
- disabled submit state for forms.

Required loading states:

- dashboard summary loading;
- urgent actions loading;
- purchase list loading;
- purchase detail loading;
- form submission pending;
- status update pending.

### Empty states

Required empty states:

- no purchases;
- no urgent actions;
- no filter results;
- no timeline events;
- no documents;
- no warranty information;
- no refund expected.

Good empty states include:

- calm title;
- short explanation;
- one clear next action.

Example:

> No urgent actions right now. Your active purchases are under control.

### Error states

Required error states:

- failed dashboard load;
- failed purchase list load;
- failed purchase detail load;
- failed create/update mutation;
- server validation failure;
- invalid filters/search params.

Error messages should be user-facing, not technical.

Example:

> We could not save this change. Your previous data is still safe.

---

## 14. Accessibility and UX guidelines

Minimum accessibility expectations:

- every input has a label;
- validation errors are associated with fields;
- keyboard navigation works for forms and filters;
- buttons have clear text;
- loading states do not remove context;
- errors are visible and understandable;
- links and actions are distinguishable;
- focus states are preserved;
- color is not the only status indicator.

UX tone:

- practical;
- calm;
- action-oriented;
- no alarmist messaging;
- no raw technical errors.

---

## 15. View models and mappers

Avoid passing raw Prisma-shaped data deeply into UI components.

Use feature mappers:

```txt
dashboard-view.mapper.ts
purchase-list-view.mapper.ts
purchase-detail-view.mapper.ts
purchase-form.mapper.ts
```

Mappers can convert:

- cents to display-ready money;
- dates to readable labels;
- statuses to badge variants;
- urgency levels to UI labels;
- optional fields to empty-state flags.

This keeps components simple and avoids coupling UI to persistence details.

---

## 16. Frontend testing focus

Component tests should cover:

- purchase form validation messages;
- disabled submit while pending;
- status badge rendering;
- deadline badge rendering;
- empty states;
- filter behavior;
- action card rendering.

Do not over-test visual layout. Test behavior and product meaning.

Examples:

- invalid price shows validation error;
- invalid support URL shows validation error;
- due-soon urgency renders the correct badge label;
- no urgent actions renders the empty state;
- filter with no results renders the no-results empty state.

---

## 17. Frontend naming conventions

### Components

Use PascalCase:

```txt
PurchaseForm.tsx
UrgentActionsList.tsx
DeadlineBadge.tsx
```

### Hooks

Use `use*`:

```txt
usePurchaseForm.ts
useIsMobile.ts
```

### Mappers

Use `*-view.mapper.ts` or `*-form.mapper.ts`:

```txt
purchase-detail-view.mapper.ts
purchase-form.mapper.ts
```

### Props

Use component name + `Props`:

```txt
PurchaseFormProps
DeadlineBadgeProps
```

### View models

Use `ViewModel` when data is prepared for display:

```txt
PurchaseDetailViewModel
UrgentActionViewModel
```

---

## 18. Frontend anti-patterns to avoid

Avoid:

- putting date/deadline logic in React components;
- duplicating status logic in multiple features;
- passing raw Prisma models into client components;
- making all components Client Components by default;
- introducing global state too early;
- building generic table abstractions before they are needed;
- creating a large design system before the MVP UI exists;
- hiding form errors in toast-only feedback;
- losing user input after mutation errors;
- making empty states generic or decorative;
- treating mobile responsiveness as a late polish step;
- making dashboard cards purely statistical instead of action-oriented.

---

## 19. Frontend success criteria

The frontend architecture is successful when:

- a reviewer can identify main product flows quickly;
- the dashboard communicates urgent actions immediately;
- forms are pleasant and robust;
- statuses and deadlines are readable;
- mobile and desktop layouts both feel intentional;
- UI components are reusable but not over-engineered;
- domain rules are not hidden in components;
- error/loading/empty states are implemented deliberately.
