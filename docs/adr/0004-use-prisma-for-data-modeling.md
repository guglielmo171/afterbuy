# ADR-0004: Use Prisma for Data Modeling and Lightweight Persistence

- **Status:** Accepted
- **Decision date:** 2026-07-12

## Context

The MVP must persist purchases and their post-purchase lifecycle. The model includes `Store`, `Purchase`, `ReturnCase`, `Refund`, `Warranty`, `PurchaseDocument` metadata and `TimelineEvent`, with one-to-one and one-to-many relationships, enums, timestamps and transactional creation.

The persistence layer must be realistic enough to demonstrate data modeling and query design, but simple enough for local development, tests and a portfolio demo.

## Decision

AfterBuy will use **Prisma as the ORM and schema source for the MVP data model**.

Prisma access will be restricted to `server/db`, repository modules and seed/test setup. Pages, feature components, entities and shared modules must not import Prisma Client. Repository functions will use deliberate `select` and `include` shapes and map results to domain or feature-ready contracts.

Creation of a purchase and its initial lifecycle records will run in a Prisma transaction. Money will be stored as integer cents. Documents will store metadata and references only, not files. SQLite will be used for local development and tests; a PostgreSQL-compatible database may be used for a deployed demo when durable shared persistence is required.

## Alternatives considered

### Raw SQL

Rejected because it would increase boilerplate and migration effort for a small project without adding meaningful product value.

### Drizzle ORM

Viable and type-safe, but rejected because Prisma provides a familiar schema, migration workflow, relation model and portfolio readability that fit the current scope.

### In-memory or JSON persistence

Rejected because it would weaken relationship modeling, transactions and realistic data access behavior.

### Local storage or IndexedDB

Rejected because the source of truth would remain client-side and would not prove server persistence.

### Full repository abstraction over a custom data mapper

Rejected as unnecessary. A small repository layer around Prisma is sufficient.

## Consequences

### Positive

- The data model is explicit and inspectable in one schema.
- Migrations, seed data and relations are straightforward.
- Transactions support consistent lifecycle creation.
- SQLite makes local setup and tests lightweight.
- Prisma is recognizable to reviewers and integrates well with TypeScript.

### Negative

- Prisma types can leak if repository boundaries are not enforced.
- SQLite and production serverless persistence have different operational characteristics.
- ORM-generated queries still require deliberate selection and indexing.
- Switching ORMs later would require repository and migration work.

## Trade-offs

The project chooses developer speed and schema clarity over lower-level query control. Portability is preserved primarily through repositories and domain contracts, not by pretending the ORM is interchangeable at no cost.

## Portfolio value

Prisma makes the relationship model, lifecycle transaction and persistence trade-offs visible. It supports a credible backend story while keeping attention on product behavior rather than database infrastructure.

## Related documents

- `docs/product/mvp-scope.md`
- `docs/architecture/data-model.md`
- `docs/architecture/backend.md`
- `docs/architecture/api-design.md`
- `docs/architecture/testing.md`
- `docs/adr/0002-keep-backend-lightweight.md`
- `docs/adr/0003-use-feature-based-architecture.md`
