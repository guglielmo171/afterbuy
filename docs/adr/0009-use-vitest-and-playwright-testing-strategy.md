# ADR-0009: Use a Focused Testing Strategy with Vitest and Playwright

- **Status:** Accepted
- **Decision date:** 2026-07-12

## Context

AfterBuy's most important failure modes are incorrect deadline calculations, inconsistent urgency, invalid mutation input, broken lifecycle updates and a disconnected end-to-end flow. A large test suite aimed at coverage alone would slow the MVP, while relying only on manual QA would make the product logic difficult to trust.

The project needs a testing approach that matches its risk profile and demonstrates engineering maturity without creating a second project around test infrastructure.

## Decision

AfterBuy will use:

- **Vitest** for unit tests, validation tests and selected server/repository tests;
- **Testing Library** for user-visible React component behavior;
- **Playwright** for the critical end-to-end product journey;
- an isolated SQLite test database or repository substitutes where integration cost is justified.

Testing priority is:

1. pure domain logic;
2. Zod validation schemas;
3. critical UI states and form behavior;
4. selected Server Action/query/repository behavior;
5. one critical Playwright flow: create purchase, verify calculated deadlines, open detail, update lifecycle status, verify timeline and dashboard actions.

Tests will use fixed dates and explicit `currentDate` values. Coverage percentages are secondary to protecting business-critical behavior. Manual QA will verify responsive layouts, accessibility basics and state quality before publication.

## Alternatives considered

### Playwright-only testing

Rejected because domain edge cases would be slower and harder to isolate through the browser.

### Unit tests only

Rejected because persistence, routing and the vertical slice need at least one integrated browser-level proof.

### Jest instead of Vitest

Viable, but Vitest was selected for modern TypeScript ergonomics and alignment with the lightweight toolchain.

### Cypress instead of Playwright

Viable, but Playwright was selected for browser automation, reliability and a concise end-to-end setup.

### High global coverage target

Rejected because it encourages low-value tests and can obscure the real risk areas.

### Snapshot-heavy component testing

Rejected because snapshots do not prove user-visible behavior or domain correctness.

## Consequences

### Positive

- Critical date and lifecycle rules receive fast deterministic coverage.
- Validation contracts are protected independently of UI.
- The E2E test proves the complete product story.
- The suite remains small enough to run in CI and maintain.
- Test intent is legible to portfolio reviewers.

### Negative

- Some simple repository code may remain untested.
- Browser tests require database reset and stable seed behavior.
- Selective coverage depends on disciplined risk assessment.
- Visual quality still requires manual or later visual regression review.

## Trade-offs

The project chooses confidence in the highest-risk paths over exhaustive coverage. It accepts a limited number of integration tests because domain and E2E tests provide the strongest value for this product.

## Portfolio value

The strategy demonstrates that testing choices follow product risk. Reviewers can see deterministic business-rule tests and a real full-stack journey rather than a vanity coverage number.

## Related documents

- `docs/product/mvp-scope.md`
- `docs/product/user-journey.md`
- `docs/architecture/testing.md`
- `docs/architecture/backend.md`
- `docs/architecture/api-design.md`
- `docs/adr/0006-keep-business-logic-outside-react-components.md`
- `docs/adr/0007-use-server-actions-and-selective-route-handlers.md`
