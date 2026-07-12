# ADR-0007: Use Server Actions for Internal Mutations and Selective Route Handlers

- **Status:** Accepted
- **Decision date:** 2026-07-12

## Context

Most AfterBuy writes originate from the application's own forms and lifecycle controls. Building a REST endpoint for every operation would add request/response boilerplate without an external client requirement. At the same time, using implicit framework features without documented contracts could hide API thinking.

Reads and writes also have different needs: route pages need server-side query functions, while public or operational endpoints need an HTTP-shaped boundary.

## Decision

AfterBuy will use the following boundary rules:

- **Server-side query functions** for dashboard, actions, purchase list, purchase detail, stores and categories;
- **Server Actions** for app-internal mutations such as create/update purchase, update return/refund/warranty state, update document metadata and add timeline notes;
- **Route Handlers** only for operations that intentionally behave like HTTP APIs.

`GET /api/health` is the only required MVP Route Handler. Export or public read endpoints may be added later only when they provide clear demo or integration value.

Every Server Action must validate input with Zod, call domain logic, persist through repositories, create timeline events when relevant, revalidate affected routes and return a typed result or redirect after successful creation. Server Actions must not import directly into unrelated client code as a replacement for application boundaries.

Decision rule:

```txt
Internal UI operation -> Server Action
External/API-shaped operation -> Route Handler
Read composition for Server Components -> server query function
```

## Alternatives considered

### REST Route Handlers for all operations

Rejected because the MVP has no external consumer and the additional transport layer would duplicate types and error handling.

### Server Actions for reads and writes

Rejected as a universal rule. Explicit query functions are clearer for read composition and testing.

### GraphQL or tRPC

Rejected because the product does not need a generalized client/server API layer.

### Separate backend API

Rejected because it violates the lightweight backend boundary.

### Direct Prisma calls from pages

Rejected because data access would become scattered and contracts would leak into UI composition.

## Consequences

### Positive

- Internal form flows remain concise.
- Read and write boundaries are explicit.
- Zod schemas and typed results document contracts.
- Route Handlers remain available when a real HTTP boundary exists.
- The project avoids unnecessary REST ceremony.

### Negative

- Server Actions are framework-specific.
- External clients cannot reuse internal mutations without new Route Handlers.
- Caching and revalidation behavior must be tested carefully.
- API awareness must be communicated through docs and signatures rather than endpoint count.

## Trade-offs

The project prioritizes internal product velocity over transport-layer generality. It keeps a path to external APIs without paying their cost before a consumer exists.

## Portfolio value

This decision shows that API design is about boundaries and consumers, not automatically exposing every operation as REST. The health endpoint, typed contracts, query layer and action signatures make backend reasoning visible without overbuilding.

## Related documents

- `docs/architecture/overview.md`
- `docs/architecture/frontend.md`
- `docs/architecture/backend.md`
- `docs/architecture/api-design.md`
- `docs/architecture/testing.md`
- `docs/adr/0001-use-nextjs-full-stack.md`
- `docs/adr/0005-use-zod-for-validation-boundaries.md`
