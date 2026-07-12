# ADR-0008: Defer Authentication, Real Uploads and External Integrations

- **Status:** Accepted
- **Decision date:** 2026-07-12

## Context

Authentication, authorization, real receipt storage, OCR, inbox parsing, merchant APIs, banking/payment integrations and notification delivery are plausible future capabilities. They are not required to validate the core AfterBuy promise: making purchases, deadlines, statuses and urgent actions understandable.

Adding these capabilities would introduce security, privacy, storage, asynchronous processing, third-party reliability and deployment concerns. They would also shift attention away from the frontend-led product slice.

## Decision

The MVP will deliberately defer:

- authentication and user accounts;
- roles, authorization and multi-tenancy;
- real file upload and cloud storage;
- OCR and document processing;
- email inbox parsing;
- merchant, marketplace, payment or banking integrations;
- real refund tracking;
- queues, cron jobs and notification delivery;
- native mobile applications and multi-user collaboration.

`PurchaseDocument` will represent metadata or mock references only. Demo data will be seeded and must not contain personal documents. Future capabilities may be documented as `Planned` or `Not in the MVP`, but they must not be represented as available.

Reconsideration requires evidence that the core vertical slice is complete, tested and polished, and that the proposed capability directly improves the product rather than merely expanding technical scope.

## Alternatives considered

### Add authentication first

Rejected because it would make onboarding and ownership concerns dominate before the product value is proven.

### Implement receipt upload without OCR

Rejected because storage, privacy, deletion and deployment concerns still exceed the MVP value.

### Mock integrations as if they were real

Rejected because it would misrepresent product maturity and weaken trust.

### Build one real merchant or email integration

Rejected because integration reliability and account security would become a separate project.

### Add scheduled reminders

Rejected because background jobs and delivery infrastructure are not necessary for the first vertical slice.

## Consequences

### Positive

- The MVP remains achievable and polishable.
- Sensitive data and security exposure are minimized.
- The architecture stays focused on the main user journey.
- Marketing copy can clearly distinguish current capabilities from roadmap ideas.
- Testing remains deterministic and local-friendly.

### Negative

- The preview is not a personal multi-user service.
- Document management is intentionally simulated through metadata.
- Some visitors may expect automated imports or reminders and must be given clear disclosure.
- Future implementation may require new ownership and authorization fields in the data model.

## Trade-offs

The project gives up automation breadth to deliver a complete manual workflow with credible engineering. The decision protects trust by preferring an honest limitation over a shallow or insecure imitation of production integrations.

## Portfolio value

Explicit non-goals demonstrate prioritization, security awareness and the ability to prevent scope creep. The decision also supports an honest case-study narrative rather than inflating the project with unfinished integrations.

## Related documents

- `docs/product/project-charter.md`
- `docs/product/feasibility-study.md`
- `docs/product/mvp-scope.md`
- `docs/product/user-journey.md`
- `docs/architecture/backend.md`
- `docs/architecture/data-model.md`
- `docs/marketing/wip-transparency.md`
- `docs/adr/0002-keep-backend-lightweight.md`
- `docs/adr/0015-communicate-work-in-progress-transparently.md`
- `docs/adr/0016-distinguish-available-demo-and-planned-features.md`
