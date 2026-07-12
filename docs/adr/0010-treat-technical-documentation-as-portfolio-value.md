# ADR-0010: Treat Technical Documentation as Part of the Portfolio Value

- **Status:** Accepted
- **Decision date:** 2026-07-12

## Context

AfterBuy is both a product and a portfolio case study. Source code alone cannot communicate every scope decision, rejected alternative, UX rationale or backend boundary quickly to a recruiter, engineering manager or product team.

A minimal README would make the project harder to evaluate, while enterprise-scale documentation for every detail would become costly and stale. The documentation must support implementation and explain engineering judgment without replacing readable code.

## Decision

Technical and product documentation will be treated as a **first-class deliverable and acceptance criterion**.

The repository will maintain:

- product charter, feasibility, MVP scope and user journey;
- architecture overview, frontend, backend, data model, API and testing documents;
- ADRs for material decisions;
- design brief, screen specifications, design system, UX states and review findings;
- landing-page brief, structure, copy and WIP policy;
- a concise README that connects problem, demo, architecture, screenshots, setup and roadmap.

Documentation must explain context, decisions and trade-offs, not restate implementation line by line. It must be updated when a material decision changes. Future capabilities must be clearly separated from MVP behavior.

## Alternatives considered

### README only

Rejected because it would compress product, architecture, design and trade-offs into an unreadable overview or omit important reasoning.

### Documentation after implementation

Rejected because architecture and design documents are being used to guide implementation, not merely describe it retrospectively.

### Generated API documentation only

Rejected because signatures do not explain product rationale or scope decisions.

### Enterprise-style exhaustive specifications

Rejected because they would create maintenance burden and make the portfolio harder to scan.

### External case-study site only

Rejected because repository-local documentation should remain available to reviewers and coding agents.

## Consequences

### Positive

- Reviewers can understand the project before reading every file.
- Architectural intent and scope boundaries are explicit.
- Coding agents receive a stable source of truth.
- The repository demonstrates communication and ownership.
- Trade-offs remain visible when implementation details evolve.

### Negative

- Documentation requires maintenance and review.
- Stale documents can become more harmful than missing documents.
- Some reasoning is duplicated across specialized documents and ADR summaries.
- The team must decide which changes are material enough to document.

## Trade-offs

The project accepts ongoing documentation cost in exchange for clearer implementation guidance and stronger portfolio communication. Documents remain concise, decision-oriented and linked rather than attempting to be a complete knowledge base.

## Portfolio value

This decision directly supports the intended audience. It demonstrates product thinking, written communication, architectural judgment and the ability to make a codebase legible to people beyond its author.

## Related documents

- `README.md`
- `docs/product/project-charter.md`
- `docs/product/feasibility-study.md`
- `docs/product/mvp-scope.md`
- `docs/architecture/overview.md`
- `docs/architecture/testing.md`
- `docs/design/impeccable-review.md`
- `docs/marketing/landing-page-brief.md`
- `docs/adr/README.md`
