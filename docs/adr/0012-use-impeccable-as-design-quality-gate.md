# ADR-0012: Use Impeccable as a Design Quality Gate

- **Status:** Accepted
- **Decision date:** 2026-07-12

## Context

A documented design direction is not sufficient if implementation drifts toward generic AI-generated UI, duplicate components, weak mobile behavior or decorative complexity. The existing Impeccable review identified concrete issues in summary density, quick actions, component duplication, post-resolution feedback, mobile search behavior, 320px support and action-reason mapping. Those issues were corrected in the design documents.

The project needs a repeatable review mechanism that tests whether design decisions remain coherent without turning Impeccable into a runtime dependency or a substitute for product judgment.

## Decision

Impeccable will be used as a **design quality gate at defined milestones**:

1. after design direction and screen specifications are drafted;
2. after shared UI and the first representative product screen are implemented;
3. before the public landing/demo release;
4. after major visual or interaction changes that affect cross-screen patterns.

The review must evaluate:

- fidelity to the action-first product hierarchy;
- generic AI/SaaS anti-patterns;
- component duplication and unnecessary abstraction;
- mobile behavior at 320px, 390px, 768px and desktop;
- loading, empty, error and post-resolution states;
- accessibility baseline and focus behavior;
- copy and status consistency;
- whether screenshot and landing claims match the actual build.

Review findings must be classified, resolved or explicitly accepted as trade-offs in the relevant design/ADR documentation. Impeccable is an advisory quality gate, not the design system, coding standard or source of business logic.

## Alternatives considered

### No formal design review

Rejected because drift and generic patterns would likely be detected only near publication.

### Use Impeccable as a one-time prompt

Rejected because quality needs verification against implemented screens, not only initial specifications.

### Let the coding agent redesign autonomously

Rejected because implementation convenience must not override product and design sources of truth.

### Adopt a full external design framework

Rejected because external conventions cannot replace product-specific review criteria.

### Visual review only at the end

Rejected because late structural corrections are more expensive and can create inconsistent components.

## Consequences

### Positive

- Design drift is detected early.
- Anti-patterns and duplicate components receive explicit review.
- The quality process is visible and repeatable.
- Implementation remains aligned with UX and portfolio goals.
- Findings become documented engineering/design decisions.

### Negative

- Review cycles add work and may surface changes after code exists.
- The quality of the gate still depends on good prompts, evidence and human judgment.
- Not every recommendation should be accepted automatically.
- Visual checks require representative real screens, not only text specifications.

## Trade-offs

The project accepts periodic review overhead to reduce genericity and late redesign. Impeccable recommendations remain subordinate to the product scope, accessibility, technical feasibility and documented design direction.

## Portfolio value

The gate demonstrates an iterative design-engineering workflow: define, implement, inspect, correct and document. It shows that AI-assisted design is controlled by explicit standards rather than accepted uncritically.

## Related documents

- `docs/design/design-brief.md`
- `docs/design/screen-specs.md`
- `docs/design/design-system.md`
- `docs/design/ux-states.md`
- `docs/design/impeccable-review.md`
- `docs/marketing/landing-page-brief.md`
- `docs/adr/0011-adopt-documented-design-direction.md`
- `docs/adr/0013-maintain-lightweight-design-system.md`
