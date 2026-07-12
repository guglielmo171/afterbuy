# ADR-0003: Use a Feature-Based Architecture with Explicit Internal Layers

- **Status:** Accepted
- **Decision date:** 2026-07-12

## Context

AfterBuy contains several related product flows: dashboard, actions needed, purchase list, purchase form and purchase detail. A flat component directory would make ownership unclear, while a package-heavy or monorepo architecture would be disproportionate for the MVP.

The codebase must remain easy to navigate for frontend reviewers and must keep React UI, domain logic and server persistence from becoming entangled.

## Decision

AfterBuy will use a **feature-based architecture with explicit `app`, `features`, `entities`, `shared` and `server` boundaries** inside one repository.

Responsibilities are:

- `app/`: Next.js routes, layouts, route loading/error boundaries and thin page composition;
- `features/`: user-facing product flows, feature components, view mappers and local UI concerns;
- `entities/`: domain types, enums and framework-independent business logic;
- `shared/`: genuinely reusable UI primitives, validation utilities, formatting and constants;
- `server/`: Prisma client, repositories, server queries, Server Actions and persistence mappers.

Features may compose entities and shared UI, but they must not import Prisma. Entities must not import React, Next.js or database code. Pages must not contain business logic or direct data access. Internal boundaries are preferred over separate packages until independent versioning or deployment becomes a real need.

## Alternatives considered

### File-type folders

A global `components/`, `hooks/`, `services/` structure was rejected because related product code would become scattered and feature ownership would be less visible.

### Domain-driven packages or monorepo

Rejected because package tooling and dependency management would create ceremony without current reuse or deployment needs.

### Route-only colocation

Rejected as the only organization model because complex feature code would become coupled to Next.js route structure.

### Flat application structure

Rejected because it would invite direct imports across UI, domain and persistence concerns.

## Consequences

### Positive

- Product flows are easy to locate and reason about.
- Domain logic remains testable without React or Next.js.
- Server code is visible but isolated.
- Shared UI stays small and intentionally reusable.
- Future refactoring into packages remains possible if the project grows.

### Negative

- Some concepts require mapping between database, domain and view models.
- Developers must enforce dependency direction through review and conventions.
- Small files may appear more numerous than in a flat structure.
- Incorrect use of `shared/` could still create a dumping ground.

## Trade-offs

The project accepts a moderate number of folders and mappers to gain clarity and testability. It deliberately avoids stronger physical isolation because the current scope does not justify monorepo or package overhead.

## Portfolio value

The structure makes architectural judgment visible during code review. It demonstrates feature ownership, separation of concerns and the ability to keep a frontend-oriented codebase maintainable without overengineering it.

## Related documents

- `docs/architecture/overview.md`
- `docs/architecture/frontend.md`
- `docs/architecture/backend.md`
- `docs/architecture/api-design.md`
- `docs/architecture/data-model.md`
- `docs/adr/0001-use-nextjs-full-stack.md`
- `docs/adr/0006-keep-business-logic-outside-react-components.md`
