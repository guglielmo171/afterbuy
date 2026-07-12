# AfterBuy — Feasibility Study

**Status:** Draft 2.0  
**Project type:** Frontend-leaning full-stack product portfolio project  
**Repository path:** `docs/product/feasibility-study.md`  
**Related document:** `docs/product/project-charter.md`

---

## 1. Context

AfterBuy started as a frontend-leaning product portfolio project focused on post-purchase management: returns, refunds, warranties, receipts, invoices, manuals, support links and deadlines.

The original technical direction allowed a frontend-first implementation with realistic mock data. The updated goal is broader: AfterBuy should demonstrate product engineering maturity, not only UI execution.

The project should now show:

- React and TypeScript frontend architecture;
- form handling and user-friendly validation;
- date-based business logic;
- a small but real data model;
- persistence through a database layer;
- lightweight backend/server-side logic;
- testing across domain logic, components and critical flows;
- documentation of architectural trade-offs.

The project must not become backend-heavy. The backend should support the product story, not become the product itself.

---

## 2. Feasibility summary

AfterBuy is feasible as a portfolio project if it is built as a focused vertical slice instead of a broad post-purchase platform.

The strongest version of the project is not a pure frontend demo and not a complex backend system. It is a small full-stack product with a clear frontend center of gravity.

The recommended approach is:

> **Next.js full-stack in a single repository, using TypeScript, React, React Hook Form, Zod, Prisma, a lightweight database setup, and a focused testing strategy.**

This gives the project enough backend depth to demonstrate software engineering judgment while keeping the implementation manageable.

---

## 3. Stack options evaluated

### Option 1 — Next.js full-stack in a single repository

**Description**

A single Next.js application using the App Router. Frontend screens, server-side mutations, route handlers, validation, data access and Prisma models live in one repository.

**Possible stack**

- Next.js App Router
- React
- TypeScript
- React Hook Form
- Zod
- Prisma
- SQLite for local development, PostgreSQL-compatible deployment if needed
- Vitest
- Testing Library
- Playwright
- Tailwind CSS or CSS Modules

**Strengths**

- Good balance between frontend quality and backend awareness.
- Lets the project show real persistence without creating a separate backend service.
- Supports server-side business logic close to product flows.
- Reduces infrastructure and deployment complexity.
- Strong portfolio signal for product-oriented companies.
- Makes it easier to document trade-offs around validation, persistence, business rules and UI states.
- Keeps the project readable for frontend leads and engineering managers.

**Weaknesses**

- Requires discipline around server/client boundaries.
- Can lead to framework-specific coupling if domain logic is placed directly inside Next.js files.
- Server Actions and caching behavior can introduce complexity if overused.
- Database deployment needs a clear decision for the public demo.

**Portfolio value**

High. This option communicates that the developer can build a polished frontend while understanding data modeling, server logic, validation and testing.

**Feasibility**

High, as long as backend scope is intentionally limited.

**Verdict**

Recommended.

---

### Option 2 — React + Vite frontend-only

**Description**

A pure frontend application built with React and Vite. Persistence would be handled through local storage, IndexedDB, mock data or MSW.

**Possible stack**

- React
- TypeScript
- Vite
- React Router
- React Hook Form
- Zod
- Zustand or Jotai
- TanStack Query with MSW
- Vitest
- Testing Library
- Playwright

**Strengths**

- Fastest path to implementation.
- Simple mental model.
- Very strong for UI architecture and client-side state.
- Easy to deploy and maintain.
- Avoids backend deployment complexity.

**Weaknesses**

- Weaker signal for the updated goal.
- Persistence is less credible if based only on local storage or mocks.
- Data modeling remains mostly conceptual.
- Backend awareness must be documented rather than demonstrated.
- Risks looking like a frontend exercise instead of a micro-product.

**Portfolio value**

Medium. Strong for frontend roles, but weaker for frontend-leaning Software Engineer positioning.

**Feasibility**

Very high technically, but less aligned with the updated positioning.

**Verdict**

Not recommended as the final stack after the updated constraint.

---

### Option 3 — Frontend Next.js + separate backend

**Description**

A Next.js frontend connected to a separate backend service, for example Express, NestJS, FastAPI or Spring Boot.

**Possible stack**

- Next.js frontend
- Separate REST API backend
- Prisma or backend ORM
- PostgreSQL
- Separate API validation
- Separate deployment pipeline

**Strengths**

- Strong full-stack signal.
- Clear separation between frontend and backend responsibilities.
- Realistic for larger production systems.
- Easier to expose a conventional REST API contract.

**Weaknesses**

- Too much backend weight for AfterBuy MVP.
- More setup, deployment and documentation overhead.
- More context switching.
- Higher risk of unfinished polish.
- The portfolio story may drift away from frontend-leaning engineering.
- Requires maintaining two applications for a product that does not need that complexity yet.

**Portfolio value**

Medium to high, but potentially misaligned. It may communicate full-stack/backend ambition more than frontend-leaning product engineering.

**Feasibility**

Medium. Feasible, but inefficient for this project scope.

**Verdict**

Not recommended for MVP. Keep as a possible future evolution only if the product grows beyond portfolio scope.

---

### Option 4 — Monorepo frontend/backend

**Description**

A monorepo with separate apps and packages, for example:

```txt
apps/
  web/
  api/
packages/
  domain/
  validation/
  ui/
  config/
```

**Strengths**

- Strong architecture signal.
- Shared domain types and validation can be modeled cleanly.
- Good for demonstrating package boundaries.
- Closer to some real company setups.

**Weaknesses**

- Too much ceremony for the current MVP.
- Monorepo tooling becomes part of the project cost.
- More files, more configuration and more decisions to justify.
- Can make the repository feel over-engineered.
- The product value may become hidden behind architecture.

**Portfolio value**

Medium. Useful if the portfolio goal is architecture-heavy, but risky for a focused micro-product.

**Feasibility**

Medium. Technically feasible, but not efficient.

**Verdict**

Not recommended for the first implementation. The project can still use clean internal boundaries without adopting a monorepo.

---

### Option 5 — TanStack Start as a modern alternative

**Description**

A modern full-stack React framework based on TanStack Router, with typed routing, URL state, loaders, server functions and server routes.

**Strengths**

- Very modern and technically interesting.
- Strong type-safety story.
- Excellent fit for URL-driven state such as filters, tabs and purchase list views.
- Good developer narrative for advanced React ecosystem awareness.
- Could differentiate the project from generic Next.js portfolios.

**Weaknesses**

- Higher novelty risk.
- Smaller hiring familiarity compared with Next.js.
- More risk of API churn, documentation gaps or ecosystem friction.
- Could shift attention from the product to the framework choice.
- Less immediately recognizable to non-specialist reviewers.

**Portfolio value**

Potentially high for niche React-heavy audiences, but less predictable for general product-company screening.

**Feasibility**

Medium. Viable, but less safe as the first project in the portfolio sequence.

**Verdict**

Do not use for AfterBuy MVP. Document it as an evaluated alternative. Consider it later for a second or third project if the goal is to show modern React experimentation.

---

## 4. Recommendation stack finale

### Final recommendation

Use:

- **Next.js full-stack in a single repository**
- **TypeScript**
- **React**
- **React Hook Form**
- **Zod**
- **Prisma**
- **SQLite for local development**
- **PostgreSQL-compatible database for deployed demo if real persistence is needed**
- **Vitest**
- **Testing Library**
- **Playwright**
- **Tailwind CSS or CSS Modules**

### Recommended project shape

```txt
src/
  app/
    (dashboard)/
    purchases/
    actions-needed/
    api/
  features/
    dashboard/
    purchases/
    purchase-detail/
    purchase-form/
    actions-needed/
  entities/
    purchase/
    store/
    return-case/
    refund/
    warranty/
    document/
    timeline-event/
  server/
    db/
    repositories/
    actions/
    queries/
  shared/
    ui/
    validation/
    utils/
    hooks/
    constants/
prisma/
  schema.prisma
  seed.ts
docs/
  product/
  architecture/
  adr/
tests/
  e2e/
```

### Why this is the best fit

Next.js full-stack is the strongest fit because AfterBuy needs to demonstrate more than UI, but does not justify a separate backend.

It allows the project to show:

- real form submissions;
- server-side validation;
- persistence;
- database modeling;
- business logic outside UI components;
- clean frontend architecture;
- critical path testing;
- realistic product documentation.

The backend remains supporting infrastructure, not the main technical focus.

---

## 5. Why Next.js full-stack is suitable

Next.js full-stack is suitable for AfterBuy because the product has a clear need for small server-side capabilities:

- creating and editing purchases;
- calculating deadlines consistently;
- persisting records;
- updating return/refund/warranty states;
- generating timeline events;
- validating inputs before writing data;
- preparing dashboard queries.

These needs are meaningful enough to justify backend code, but not large enough to justify a separate backend service.

### Recommended usage of Next.js capabilities

Use **Server Actions** for internal mutations such as:

- create purchase;
- update purchase;
- update return status;
- update refund status;
- mark receipt as present/missing;
- add timeline note.

Use **server-side query functions** for:

- dashboard urgent actions;
- purchase list;
- purchase detail;
- filtered purchase data.

Use **Route Handlers** only where an API-shaped boundary is useful, for example:

- health/demo endpoint;
- future public API simulation;
- integration testing boundary;
- downloadable mock export if needed later.

Avoid turning every operation into a REST endpoint unless there is a clear reason.

### What Next.js should not become in this project

Next.js should not be used to create a complex backend platform. Avoid:

- authentication-heavy architecture;
- role-based authorization;
- background queues;
- real file storage;
- OCR processing;
- merchant integrations;
- complex notification systems;
- production-grade multi-user architecture.

---

## 6. Recommended backend level for the MVP

The MVP should include a **lightweight backend/data layer**.

### Include

#### 1. Prisma data model

Minimum entities:

- `Purchase`
- `Store`
- `ReturnCase`
- `Refund`
- `Warranty`
- `PurchaseDocument`
- `TimelineEvent`

The model should be simple but realistic. It should show relationships, statuses, dates and optional fields.

#### 2. Server-side validation

Use Zod schemas for:

- create purchase;
- update purchase;
- update status;
- filters/search params if needed;
- document metadata mock.

Validation should happen both near the form and again before server-side writes.

#### 3. Business logic

Keep business logic in pure TypeScript functions, not inside React components.

Core logic:

- return deadline calculation;
- warranty expiration calculation;
- urgency classification;
- missing receipt detection;
- refund pending classification;
- purchase lifecycle status derivation;
- timeline event creation rules.

#### 4. Persistence

Use Prisma to persist purchases and related records.

Recommended approach:

- local development: SQLite for simplicity;
- deployed demo: PostgreSQL-compatible database only if the demo needs real persistence;
- seed realistic demo data;
- avoid storing real personal documents.

#### 5. Server actions / mutations

Implement a small set of mutations:

- create purchase;
- edit purchase;
- delete/archive purchase if needed;
- update return status;
- update refund status;
- update warranty information;
- add note/timeline event.

#### 6. Query layer

Create explicit server-side queries:

- get dashboard summary;
- get urgent actions;
- get purchase list with filters;
- get purchase detail;
- get stores/categories for filters.

#### 7. Testing

Minimum test coverage:

- unit tests for date and urgency logic;
- unit tests for Zod validation;
- integration-level tests for repository/query functions where feasible;
- component tests for form and status rendering;
- one Playwright flow: create purchase → see urgent dashboard action → update status.

### Exclude from backend MVP

Do not include:

- user accounts;
- real document upload;
- cloud storage;
- OCR;
- email parsing;
- merchant API integrations;
- background jobs;
- notification delivery;
- multi-tenant architecture;
- payment/subscription logic;
- admin dashboard.

---

## 7. What to keep out to avoid scope creep

AfterBuy can easily become too broad because the post-purchase domain includes many tempting features.

The MVP must stay focused on:

> purchases + deadlines + statuses + urgent actions.

### Explicitly out of scope

- Real authentication.
- Social login.
- Multi-user accounts.
- Team or family sharing.
- Real file uploads.
- Receipt OCR.
- Invoice parsing.
- Email inbox connection.
- Gmail/Outlook imports.
- Amazon/Zalando/Apple/PayPal integrations.
- Real refund tracking from merchants.
- Push notifications.
- Calendar integrations.
- Mobile app.
- AI purchase classification.
- Legal/fiscal advice.
- Advanced analytics.
- Price tracking.
- Budgeting features.
- Browser extension.
- Native receipt scanner.
- Production-grade backend observability.
- Complex authorization.
- Microservices.
- Event-driven architecture.

### Future roadmap only

These can be documented as future ideas, not built in the MVP:

- receipt upload;
- email import;
- calendar reminders;
- warranty claim assistant;
- merchant integrations;
- export to CSV/PDF;
- multi-device sync;
- authenticated accounts.

---

## 8. Trade-off portfolio

### What the recommended stack communicates well

Using Next.js full-stack communicates:

- ability to build a complete product slice;
- frontend architecture maturity;
- backend awareness without overclaiming backend specialization;
- TypeScript-first thinking;
- validation discipline;
- data modeling ability;
- product-focused technical trade-offs;
- ability to test business-critical behavior;
- ability to document architectural decisions.

This matches the intended positioning:

> **Software Engineer frontend-leaning: strong on React, TypeScript, UX and frontend architecture, but capable of reasoning across backend, API, data, validation and testing.**

### What it does not communicate as strongly

The project will not communicate deep backend specialization in:

- distributed systems;
- advanced database optimization;
- event-driven architecture;
- infrastructure automation;
- microservices;
- complex security;
- high-scale API design.

That is acceptable. Those are not the goals of AfterBuy.

### Why this is better than frontend-only

A frontend-only build could still look polished, but the technical story would rely heavily on documentation. A Next.js full-stack build demonstrates the engineering decisions directly in the codebase.

### Why this is better than a separate backend

A separate backend would increase complexity but not necessarily increase the value of the portfolio signal. The project would become harder to finish and polish, while the frontend-leaning positioning would become less clear.

### Why this is safer than TanStack Start

TanStack Start is attractive for modern React architecture, but Next.js is more recognizable to most reviewers. For a first portfolio project, recognizability and execution quality matter more than framework novelty.

---

## 9. Technical risks

### Risk 1 — Backend scope grows too much

**Problem**

The project could drift into authentication, uploads, integrations and notification systems.

**Mitigation**

Define backend as a support layer only:

- CRUD for purchases;
- server validation;
- business logic;
- persistence;
- dashboard queries.

Anything else goes into the roadmap.

---

### Risk 2 — Next.js server/client boundaries become messy

**Problem**

Business logic could end up scattered between React components, Server Actions and database queries.

**Mitigation**

Use clear boundaries:

- `entities/` for domain types and pure business logic;
- `features/` for product UI flows;
- `server/` for data access, queries and actions;
- `shared/validation/` for Zod schemas.

React components should orchestrate UI, not own domain rules.

---

### Risk 3 — Server Actions hide API contracts

**Problem**

If everything is implemented as Server Actions, the project may not show clear API thinking.

**Mitigation**

Document the application contract through:

- Zod schemas;
- query/action signatures;
- ADRs;
- optional Route Handlers for API-shaped examples;
- data model documentation.

---

### Risk 4 — Persistence complicates deployment

**Problem**

SQLite is simple locally but not ideal for serverless deployed persistence. PostgreSQL deployment adds setup.

**Mitigation**

Use a pragmatic split:

- SQLite for local development and tests;
- seeded demo data;
- optional PostgreSQL-compatible database for deployed demo;
- document the persistence trade-off clearly.

---

### Risk 5 — Date logic becomes unreliable

**Problem**

Return deadlines and warranty expiration depend on dates, time zones and edge cases.

**Mitigation**

Keep date logic pure and tested. Define assumptions:

- dates are stored as calendar dates;
- deadlines are calculated in days, not hours;
- urgency thresholds are explicit;
- expired, due soon and safe states are tested.

---

### Risk 6 — The UI becomes a CRUD dashboard

**Problem**

If the product becomes mostly tables and forms, it may lose its product identity.

**Mitigation**

Prioritize:

- urgent actions;
- dashboard clarity;
- lifecycle timeline;
- meaningful empty states;
- user-facing microcopy;
- status badges and deadline badges;
- action-oriented detail pages.

---

### Risk 7 — TanStack Start novelty distracts from the product

**Problem**

A modern alternative may make the project feel experimental instead of polished.

**Mitigation**

Do not use it for the first version. Mention it in the feasibility study and ADR as an evaluated alternative.

---

## 10. Testing feasibility

The project should include enough testing to show engineering maturity without slowing delivery.

### Unit tests

Test pure functions:

- `calculateReturnDeadline`
- `calculateWarrantyExpiration`
- `classifyDeadlineUrgency`
- `derivePurchaseStatus`
- `isRefundActionNeeded`
- `isReceiptMissing`
- `createTimelineEvent`

### Validation tests

Test Zod schemas:

- required fields;
- invalid dates;
- negative prices;
- invalid status transitions;
- optional receipt/manual/support fields.

### Component tests

Test:

- purchase form validation messages;
- status badge rendering;
- deadline badge rendering;
- empty states;
- filter behavior;
- dashboard urgent action cards.

### E2E tests

Minimum Playwright flow:

1. Open dashboard.
2. Add a purchase.
3. Confirm return deadline is calculated.
4. Confirm purchase appears in the list.
5. Confirm urgent action appears if deadline is near.
6. Update return/refund status.
7. Confirm dashboard changes.

---

## 11. Final decision

AfterBuy should be built with **Next.js full-stack in a single repository**.

This is the best fit because it supports the updated positioning without overcomplicating the project.

The MVP should include a small backend/data layer with:

- Prisma schema;
- local/deployable persistence strategy;
- server-side validation;
- Server Actions for mutations;
- server-side queries;
- pure business logic;
- tests for critical logic and flows.

The MVP should avoid:

- real authentication;
- real uploads;
- external integrations;
- background jobs;
- complex backend architecture;
- monorepo complexity;
- backend-heavy infrastructure.

---

## 12. ADR decisions to document

Create the following ADRs:

### ADR 001 — Use Next.js full-stack single repository

**Decision**

Use Next.js as both the frontend framework and lightweight backend layer.

**Rationale**

AfterBuy needs to demonstrate frontend architecture plus backend awareness, but does not require a separate backend service.

---

### ADR 002 — Use Prisma for lightweight persistence and data modeling

**Decision**

Use Prisma to model purchases, stores, returns, refunds, warranties, documents and timeline events.

**Rationale**

The project needs a real data model and persistence layer without becoming backend-heavy.

---

### ADR 003 — Use Zod for validation at form and server boundaries

**Decision**

Use Zod schemas for form validation, server-side input validation and filter/search parameter validation.

**Rationale**

This keeps validation explicit, reusable and testable.

---

### ADR 004 — Keep business logic outside UI components

**Decision**

Place date calculations, urgency classification and lifecycle rules in pure TypeScript domain utilities.

**Rationale**

This improves maintainability and makes critical product logic easy to test.

---

### ADR 005 — Use Server Actions for internal mutations and Route Handlers only when useful

**Decision**

Use Server Actions for product mutations and Route Handlers only for API-like boundaries.

**Rationale**

This keeps the backend lightweight while still showing API awareness where relevant.

---

### ADR 006 — Do not use a separate backend or monorepo for MVP

**Decision**

Avoid separate backend services and monorepo structure for the first version.

**Rationale**

They add architectural overhead without improving the core portfolio signal enough.

---

### ADR 007 — Evaluate TanStack Start but do not adopt it for MVP

**Decision**

TanStack Start is acknowledged as a modern alternative but not selected for the first AfterBuy implementation.

**Rationale**

It is promising, but Next.js is safer, more recognizable and better aligned with fast portfolio execution.

---

## 13. Final recommendation statement

AfterBuy should evolve from a frontend-only prototype into a **lightweight full-stack product**.

The correct level of ambition is:

> polished frontend + real data model + server validation + persistence + tested business logic.

The wrong level of ambition is:

> separate backend platform + authentication + uploads + integrations + production infrastructure.

This keeps AfterBuy credible as a micro-product while supporting the target positioning: a frontend-leaning Software Engineer capable of building product-quality software end to end.
