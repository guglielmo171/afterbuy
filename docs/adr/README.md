# AfterBuy Architecture Decision Records

This directory contains the initial accepted Architecture Decision Records for AfterBuy.

- **Decision set date:** 2026-07-12
- **Status:** All initial records are `Accepted`
- **Scope:** Product architecture, backend boundaries, testing, design quality and landing/demo communication

## Decision index

| ADR | Decision | Status |
|---|---|---|
| [ADR-0001](./0001-use-nextjs-full-stack.md) | Use Next.js Full-Stack in a Single Repository | Accepted |
| [ADR-0002](./0002-keep-backend-lightweight.md) | Keep the Backend Lightweight and Product-Supporting | Accepted |
| [ADR-0003](./0003-use-feature-based-architecture.md) | Use a Feature-Based Architecture with Explicit Internal Layers | Accepted |
| [ADR-0004](./0004-use-prisma-for-data-modeling.md) | Use Prisma for Data Modeling and Lightweight Persistence | Accepted |
| [ADR-0005](./0005-use-zod-for-validation-boundaries.md) | Use Zod at Validation Boundaries | Accepted |
| [ADR-0006](./0006-keep-business-logic-outside-react-components.md) | Keep Business Logic Outside React Components | Accepted |
| [ADR-0007](./0007-use-server-actions-and-selective-route-handlers.md) | Use Server Actions for Internal Mutations and Selective Route Handlers | Accepted |
| [ADR-0008](./0008-defer-auth-uploads-and-external-integrations.md) | Defer Authentication, Real Uploads and External Integrations | Accepted |
| [ADR-0009](./0009-use-vitest-and-playwright-testing-strategy.md) | Use a Focused Testing Strategy with Vitest and Playwright | Accepted |
| [ADR-0010](./0010-treat-technical-documentation-as-portfolio-value.md) | Treat Technical Documentation as Part of the Portfolio Value | Accepted |
| [ADR-0011](./0011-adopt-documented-design-direction.md) | Adopt the Documented “Utilitarian Premium” Design Direction | Accepted |
| [ADR-0012](./0012-use-impeccable-as-design-quality-gate.md) | Use Impeccable as a Design Quality Gate | Accepted |
| [ADR-0013](./0013-maintain-lightweight-design-system.md) | Maintain a Lightweight Project-Owned Design System | Accepted |
| [ADR-0014](./0014-integrate-real-landing-page-in-nextjs.md) | Integrate a Real Product Landing Page into the Next.js Application | Accepted |
| [ADR-0015](./0015-communicate-work-in-progress-transparently.md) | Communicate Work in Progress Transparently | Accepted |
| [ADR-0016](./0016-distinguish-available-demo-and-planned-features.md) | Distinguish Available, Demo, In-Progress and Planned Features | Accepted |
| [ADR-0017](./0017-use-landing-as-entry-point-to-demo.md) | Use the Landing Page as the Entry Point to the Demo/Application | Accepted |

## Working rule

ADRs document decisions that materially constrain implementation. When a decision changes, add a new ADR that supersedes the previous one or update the status of the previous record; do not silently rewrite architectural history after implementation has depended on it.

## Source-of-truth relationship

The ADRs summarize and lock decisions already established in `docs/product/`, `docs/architecture/`, `docs/design/` and `docs/marketing/`. Detailed screen behavior, schemas, copy and acceptance criteria remain in those source documents.
