# ADR-0006: Keep Business Logic Outside React Components

- **Status:** Accepted
- **Decision date:** 2026-07-12

## Context

AfterBuy's product value depends on date and lifecycle rules: return deadlines, warranty expiration, urgency classification, pending refund detection, missing receipt detection, lifecycle status derivation and timeline event mapping. If those rules are embedded in components, pages or Prisma queries, they become difficult to test, reuse and reason about.

The UI must render consistent decisions across dashboard, actions needed, purchase list and detail views. Time-sensitive rules also need deterministic tests with an explicit current date.

## Decision

All core business rules will live in **pure TypeScript functions under `entities/*/lib`**, independent of React, Next.js and Prisma.

Examples include:

- `calculateReturnDeadline`;
- `calculateWarrantyExpiration`;
- `classifyDeadlineUrgency`;
- `derivePurchaseLifecycleStatus`;
- `isRefundActionNeeded`;
- `isReceiptMissing`;
- `createTimelineEventFromMutation`;
- `normalizePurchaseInput` where useful.

Time-sensitive functions must accept `currentDate` explicitly and must not hide `new Date()` inside critical logic. Server queries and actions will orchestrate these functions; React components will receive derived values and render them. Client-side deadline previews are estimates only and are never the persisted source of truth.

## Alternatives considered

### Calculate values in React components

Rejected because different screens could implement different rules and testing would require rendering UI for domain behavior.

### Put all logic in Server Actions

Rejected because actions should orchestrate validation, persistence and revalidation rather than own reusable domain rules.

### Put derivations in Prisma queries or database fields

Rejected for MVP because urgency and lifecycle status are contextual derived values, often dependent on the current date, and do not need to be persisted.

### Create a large domain service class

Rejected because small pure functions are clearer, composable and easier to test for this scope.

## Consequences

### Positive

- Critical rules can be tested quickly and deterministically.
- Every screen receives consistent derived values.
- React components remain focused on interaction and presentation.
- Domain behavior is portable beyond Next.js and Prisma.
- Date edge cases and thresholds are visible in code.

### Negative

- Server queries need explicit mapping and orchestration.
- Some types must be translated between Prisma, domain and view models.
- Developers must resist convenience calculations in UI files.
- Pure functions do not eliminate the need for integration tests around persistence and revalidation.

## Trade-offs

The project accepts extra mapping code to gain consistency, portability and confidence. It avoids heavyweight domain frameworks and uses the smallest abstraction that keeps business behavior independent.

## Portfolio value

The separation makes the product's real engineering difficulty visible. Reviewers can inspect and test the rules that protect money and deadlines without navigating UI implementation details.

## Related documents

- `docs/product/mvp-scope.md`
- `docs/product/user-journey.md`
- `docs/architecture/overview.md`
- `docs/architecture/frontend.md`
- `docs/architecture/backend.md`
- `docs/architecture/data-model.md`
- `docs/architecture/testing.md`
- `docs/design/design-system.md`
- `docs/adr/0003-use-feature-based-architecture.md`
