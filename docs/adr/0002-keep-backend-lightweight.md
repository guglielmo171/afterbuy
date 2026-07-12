# ADR-0002: Keep the Backend Lightweight and Product-Supporting

- **Status:** Accepted
- **Decision date:** 2026-07-12

## Context

AfterBuy needs enough backend capability to make its product flow credible: persistence, data modeling, server-side validation, lifecycle mutations, dashboard queries and timeline events. At the same time, the product is explicitly frontend-leaning and must not become a backend platform.

The highest-value engineering work is the complete purchase lifecycle and its user experience. Authentication, authorization, queues, integrations, uploads and multi-user infrastructure would increase scope while delaying the visible product.

## Decision

The backend will be a **small internal support layer inside the Next.js application**.

It will include:

- Prisma schema and persistence;
- SQLite for local development and tests;
- a PostgreSQL-compatible option only when needed for the deployed demo;
- repositories as the only Prisma access boundary;
- server-side query functions for dashboard, list and detail reads;
- Server Actions for internal mutations;
- Zod validation at server boundaries;
- pure domain logic for deadlines, urgency and lifecycle rules;
- timeline event creation;
- realistic seed data and limited integration tests.

It will not include authentication, roles, tenants, real uploads, OCR, email parsing, merchant or banking integrations, queues, notifications, payments, an admin platform, a separate service or microservices.

## Alternatives considered

### Frontend-only persistence

Rejected because it would not demonstrate a real server/data layer and would weaken the product's engineering credibility.

### General-purpose REST backend

Rejected because AfterBuy has no external-client requirement in the MVP and most writes are internal form-driven operations.

### Production-grade platform backend

Rejected because accounts, workers, storage and integrations are not required to validate the core product value.

### Separate backend service

Rejected because it would add deployment and contract duplication without improving the main vertical slice.

## Consequences

### Positive

- Backend work stays directly tied to user-visible behavior.
- The codebase remains small enough to finish and polish.
- The server layer still demonstrates repositories, transactions, validation and typed contracts.
- Business-critical logic can be tested independently.
- Future expansion remains possible because boundaries are explicit.

### Negative

- The MVP is not a production-ready multi-user service.
- Some operational concerns are intentionally deferred.
- A public demo may use resettable seed data rather than durable personal data.
- The project shows backend judgment, not deep distributed-systems expertise.

## Trade-offs

The decision favors product completeness and frontend quality over infrastructure breadth. Backend sophistication is measured by clear boundaries and correct behavior, not by the number of services or integrations.

## Portfolio value

A bounded backend shows scope control, prioritization and product engineering maturity. It communicates that the developer understands persistence and server concerns while knowing when not to build a platform.

## Related documents

- `docs/product/feasibility-study.md`
- `docs/product/mvp-scope.md`
- `docs/product/user-journey.md`
- `docs/architecture/overview.md`
- `docs/architecture/backend.md`
- `docs/architecture/data-model.md`
- `docs/architecture/api-design.md`
- `docs/adr/0001-use-nextjs-full-stack.md`
- `docs/adr/0008-defer-auth-uploads-and-external-integrations.md`
