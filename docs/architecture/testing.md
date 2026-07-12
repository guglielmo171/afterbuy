# AfterBuy — Testing Strategy

**Status:** Draft 1.0  
**Repository path:** `docs/architecture/testing.md`  
**Related documents:**
- `docs/architecture/overview.md`
- `docs/architecture/frontend.md`
- `docs/architecture/backend.md`
- `docs/product/mvp-scope.md`
- `docs/product/user-journey.md`

---

## 1. Testing goal

AfterBuy should include enough testing to show engineering maturity without slowing down the MVP.

The testing strategy should protect the parts that make the product valuable:

- deadline calculations;
- warranty expiration;
- urgency classification;
- validation;
- status updates;
- dashboard urgent actions;
- the main product journey.

The goal is not high coverage for its own sake. The goal is confidence in the business-critical behavior.

---

## 2. Testing pyramid

Recommended testing balance:

```txt
Many unit tests
Some validation and component tests
Few integration/repository tests
One critical E2E flow
```

Testing priority:

1. domain logic;
2. validation schemas;
3. critical UI states;
4. Server Action/repository behavior where feasible;
5. one Playwright journey.

---

## 3. Tools

Recommended tools:

- **Vitest** for unit and validation tests;
- **Testing Library** for React component tests;
- **Playwright** for E2E tests;
- **Prisma test database** or isolated SQLite setup for repository/query tests;
- optional lightweight MSW only if component tests need mocked async boundaries.

Avoid introducing too many test tools. The stack should remain understandable.

---

## 4. Unit tests

Unit tests should cover pure business logic in `entities/*/lib`.

Required test targets:

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

### Date test rules

Date tests must use fixed dates.

Do not rely on the real current date inside tests.

Good:

```txt
currentDate = 2026-07-04
deadline = 2026-07-10
```

Bad:

```txt
currentDate = new Date()
```

### Cases to cover

Deadline calculation:

- standard return policy;
- return policy of 0 days;
- expired deadline;
- deadline due within 7 days;
- deadline due within 30 days;
- month-end dates;
- leap year where relevant.

Warranty calculation:

- standard duration in months;
- duration of 0 months;
- expired warranty;
- expiring soon;
- month-end purchase date.

Urgency classification:

- `overdue`;
- `due_soon`;
- `upcoming`;
- `safe`;
- `unknown`.

Refund logic:

- no refund expected;
- refund pending;
- refund pending beyond threshold;
- refund received.

Receipt logic:

- no documents;
- receipt missing;
- receipt available;
- invoice available but receipt missing.

---

## 5. Validation tests

Validation tests should cover Zod schemas in `shared/validation`.

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

### Cases to cover

Create/update purchase:

- missing product name;
- missing store;
- invalid purchase date;
- future purchase date beyond accepted threshold;
- negative price;
- zero price if allowed;
- invalid currency;
- invalid manual URL;
- invalid support URL;
- negative return policy days;
- negative warranty duration months.

Status updates:

- invalid return status;
- invalid refund status;
- invalid warranty status;
- invalid dates attached to status updates;
- impossible or unsafe transition if transition rules are implemented.

Filters/search params:

- invalid urgency value;
- invalid status value;
- empty search;
- unknown store/category values handled safely.

### Principle

Client and server should reuse the same schemas where possible, but tests should verify that server-side parsing is reliable.

---

## 6. Component tests

Component tests should verify user-visible behavior, not implementation details.

Recommended targets:

```txt
PurchaseForm
PurchaseFilters
StatusBadge
DeadlineBadge
UrgencyBadge
EmptyState
ErrorState
UrgentActionCard
PurchaseTimeline
```

### Purchase form tests

Cover:

- required field messages;
- invalid price message;
- invalid URL message;
- submit button disabled while pending;
- server error message shown;
- edit mode pre-fills values.

### Badge tests

Cover:

- return/refund/warranty statuses render clear labels;
- urgency badge maps `overdue`, `due_soon`, `upcoming`, `safe`, `unknown`;
- deadline badge shows meaningful text for expired and due-soon dates.

### Empty/error/loading tests

Cover:

- no urgent actions empty state;
- no purchases empty state;
- no filter results empty state;
- generic error state message;
- loading skeleton exists for important sections.

### Filters tests

Cover:

- user can select status/store/category/urgency;
- no results state is shown;
- invalid filter values are not rendered as valid choices.

---

## 7. Server Action and query tests

Server Action tests can be added selectively.

Prioritize tests where logic is more than a simple Prisma call.

Recommended targets:

```txt
createPurchaseAction
updateReturnStatusAction
updateRefundStatusAction
getUrgentActions
getDashboardSummary
getPurchaseDetail
```

### What to verify

`createPurchaseAction`:

- rejects invalid input;
- calculates return deadline;
- calculates warranty expiration;
- creates related lifecycle records;
- creates timeline events.

`updateReturnStatusAction`:

- rejects invalid status;
- updates status;
- creates timeline event;
- affects urgent action logic.

`updateRefundStatusAction`:

- marks refund pending/received;
- creates timeline event;
- removes urgent action when refund is received.

`getUrgentActions`:

- returns due-soon returns;
- returns overdue returns;
- returns pending refunds;
- returns expiring warranties;
- returns missing receipt actions;
- does not return resolved actions.

These tests may use an isolated SQLite test database or repository mocks, depending on implementation cost.

---

## 8. Repository/data access tests

Repository tests are useful but should remain limited.

Recommended tests:

```txt
purchaseRepository.createWithLifecycle
purchaseRepository.findList
purchaseRepository.findDetail
purchaseRepository.updateReturnStatus
purchaseRepository.updateRefundStatus
```

### What to verify

- purchase is persisted;
- related records are created;
- detail query includes store, return case, refund, warranty, documents and timeline;
- filters return expected records;
- status updates persist correctly.

Do not over-invest in repository tests if they become expensive to maintain. Domain and E2E tests are more important for the portfolio signal.

---

## 9. E2E testing

Use Playwright for one critical journey.

Required E2E flow:

```txt
1. open dashboard
2. create a purchase
3. confirm return deadline is calculated
4. confirm warranty expiration is calculated
5. confirm purchase appears in list
6. open purchase detail
7. update return/refund status
8. confirm timeline records the update
9. confirm dashboard urgent actions update
```

This test demonstrates the whole product slice:

- frontend form;
- validation;
- Server Action;
- Prisma persistence;
- domain logic;
- dashboard query;
- lifecycle update;
- UI state change.

### E2E test data

Use seeded test data or reset database before each run.

The E2E test should not depend on manual setup.

Recommended command shape:

```txt
pnpm db:reset:test
pnpm test:e2e
```

---

## 10. Manual QA checklist

Before publishing the project, manually verify:

### Dashboard

- urgent actions are visible with seed data;
- no urgent actions empty state works;
- summary cards match seeded data;
- dashboard error state is present.

### Purchases

- list loads;
- filters work;
- no-results empty state works;
- mobile card layout is usable;
- desktop table/list is readable.

### Purchase form

- required validation works;
- invalid URL validation works;
- negative price validation works;
- submit pending state works;
- server error does not lose input;
- successful create navigates to detail.

### Purchase detail

- deadlines are visible;
- return/refund/warranty statuses are clear;
- documents empty state works;
- timeline renders meaningful events;
- status updates change the page.

### Responsive

- dashboard mobile layout works;
- purchase list mobile layout works;
- form is usable on mobile;
- detail page does not overflow.

---

## 11. Test file organization

Recommended organization:

```txt
src/
  entities/
    purchase/
      lib/
        calculate-return-deadline.ts
        calculate-return-deadline.test.ts
        calculate-warranty-expiration.ts
        calculate-warranty-expiration.test.ts

    refund/
      lib/
        is-refund-action-needed.ts
        is-refund-action-needed.test.ts

  shared/
    validation/
      purchase.schema.ts
      purchase.schema.test.ts
      status.schema.ts
      status.schema.test.ts

  features/
    purchase-form/
      components/
        PurchaseForm.tsx
        PurchaseForm.test.tsx

    purchases/
      components/
        PurchaseFilters.tsx
        PurchaseFilters.test.tsx

tests/
  e2e/
    purchase-lifecycle.spec.ts
```

Co-locate unit/component tests near the code they test.

Keep E2E tests in `tests/e2e`.

---

## 12. Test naming conventions

Use behavior-focused names.

Good:

```txt
it('classifies a deadline within 7 days as due soon')
it('rejects a negative purchase price')
it('shows an empty state when no urgent actions exist')
it('creates a timeline event when refund status changes')
```

Avoid:

```txt
it('works')
it('renders')
it('handles data')
```

Test names should explain business behavior.

---

## 13. CI strategy

Use GitHub Actions with a minimal pipeline.

Recommended jobs:

```txt
pnpm install
pnpm lint
pnpm typecheck
pnpm test
pnpm test:e2e
pnpm build
```

For MVP, Playwright can run in CI after unit tests are stable.

If E2E setup becomes slow, keep it documented and run manually before release, but aim to include it in CI for the final portfolio version.

---

## 14. Coverage expectations

Do not optimize for arbitrary coverage numbers.

Minimum expectations:

- domain logic: high coverage;
- validation schemas: high coverage;
- UI components: focused behavior coverage;
- repositories/actions: selective coverage;
- E2E: at least one critical flow.

Suggested coverage priority:

```txt
Business logic > validation > user flows > component details > repository internals
```

---

## 15. What not to test

Avoid spending time on:

- snapshot-heavy tests;
- testing CSS implementation details;
- testing third-party library internals;
- testing every Prisma method wrapper;
- testing every small presentational component;
- brittle tests tied to exact layout;
- exhaustive E2E coverage for every edge case.

AfterBuy should show testing judgment, not test volume.

---

## 16. Testing anti-patterns to avoid

Avoid:

- relying on the real current date in tests;
- testing business logic only through UI;
- mocking everything in a way that hides real behavior;
- having E2E tests depend on manual seed data;
- writing tests that duplicate implementation details;
- using snapshots as the main assertion strategy;
- skipping validation tests because forms already show errors;
- skipping E2E because unit tests pass;
- letting flaky date/time behavior enter the suite.

---

## 17. Definition of testing done

Testing is sufficient for MVP when:

- deadline and warranty logic are unit tested;
- urgency classification is unit tested;
- refund and receipt action logic is unit tested;
- create/update Zod schemas are tested;
- purchase form validation is component tested;
- status/deadline badges are component tested;
- empty states are component tested where relevant;
- one Playwright flow covers create purchase → dashboard action → status update;
- test commands are documented in the README.

---

## 18. Portfolio testing message

In the README and architecture docs, describe testing as:

> A focused testing strategy that protects the critical product behavior: deadline calculation, validation, lifecycle status changes and the main user journey.

This communicates maturity better than claiming broad test coverage without focus.
