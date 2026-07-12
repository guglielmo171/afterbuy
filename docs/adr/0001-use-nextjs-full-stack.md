# ADR-0001: Use Next.js Full-Stack in a Single Repository

- **Status:** Accepted
- **Decision date:** 2026-07-12

## Context

AfterBuy must demonstrate strong frontend engineering while also proving that the product has real persistence, validation, server-side mutations, data modeling and testable business logic. The core product journey is a focused vertical slice: create a purchase, persist it, calculate deadlines, surface urgent actions and update lifecycle states.

A frontend-only application would weaken the credibility of persistence and backend boundaries. A separate backend or monorepo would add deployment, API and infrastructure work that the MVP does not need. The chosen architecture must remain understandable to frontend leads and engineering managers while supporting a complete product flow.

## Decision

AfterBuy will use **Next.js App Router as a full-stack framework in a single repository**, with TypeScript across UI, server code and domain modules.

Next.js will own routing, rendering and server integration. Server Components will be the default for route-level reads and composition. Client Components will be introduced only for forms, filters, status controls and browser-dependent interactions. The same repository will contain the application, Prisma schema, tests and technical documentation.

This decision does not authorize a framework-centric architecture. Domain rules, validation contracts and data access boundaries must remain explicit and testable outside React components.

## Alternatives considered

### React and Vite frontend-only

Rejected because local storage, IndexedDB or mock APIs would make the product easier to build but would underrepresent persistence, server validation and backend awareness.

### Next.js frontend with a separate backend

Rejected for the MVP because it would duplicate contracts, deployments and infrastructure without creating proportional product value.

### Frontend/backend monorepo

Rejected because package boundaries and monorepo tooling would add ceremony to a small vertical slice.

### TanStack Start

Considered as a modern React alternative, but rejected for the first portfolio project because ecosystem novelty could distract from the product and reduce reviewer familiarity.

## Consequences

### Positive

- One language and one repository cover the complete flow.
- The project can show real server-side validation, persistence and mutations.
- Deployment and local development remain simpler than a multi-service solution.
- Server Components support a server-first read model with minimal client state.
- The architecture is recognizable to product-oriented React teams.

### Negative

- Server/client boundaries require discipline.
- Server Actions and framework caching can hide architectural contracts if they are not documented.
- Some implementation details will be coupled to Next.js.
- Database deployment still needs a deliberate local/demo strategy.

## Trade-offs

The project accepts moderate Next.js coupling in exchange for a smaller operational surface and a stronger end-to-end portfolio story. Framework-specific entry points are allowed, but business rules and schemas must remain portable plain TypeScript wherever practical.

## Portfolio value

This decision demonstrates the ability to choose a stack based on product scope rather than trend or maximal architecture. It positions AfterBuy as a frontend-led product with credible full-stack depth, not as either a static UI exercise or an unnecessarily distributed system.

## Related documents

- `docs/product/project-charter.md`
- `docs/product/feasibility-study.md`
- `docs/product/mvp-scope.md`
- `docs/product/user-journey.md`
- `docs/architecture/overview.md`
- `docs/architecture/frontend.md`
- `docs/architecture/backend.md`
- `docs/architecture/api-design.md`
