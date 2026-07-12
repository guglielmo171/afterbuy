# AfterBuy

**Keep the value of every purchase within reach.**

[![Status](https://img.shields.io/badge/status-work--in--progress-amber)](#-work-in-progress)
[![Stack](https://img.shields.io/badge/stack-Next.js%20%7C%20React%20%7C%20TypeScript%20%7C%20Prisma-blue)](#-tech-stack)
[![Design](https://img.shields.io/badge/design-Utilitarian%20Premium-neutral)](#-design-direction)

> Product preview · work in progress. AfterBuy is being built as a focused full-stack vertical slice.

---

## What is AfterBuy

AfterBuy is a **post-purchase utility** that turns the messy aftermath of buying something into a clear, action-oriented personal dashboard.

Returns, pending refunds, warranty dates and proof of purchase tend to disappear across inboxes, store accounts and memory. AfterBuy brings the next action back into view — before a deadline becomes a missed opportunity.

It is not an archive of receipts. It is not a generic SaaS dashboard. It answers one question within seconds of opening:

> **What needs attention today or this week so I don't lose money, time or support rights?**

---

## The problem

After checkout, useful information spreads out:

- A return window expires in one email thread.
- A refund update sits in another.
- A receipt is buried in a store account you rarely open.
- Warranty details surface only when something breaks.

The result is not just clutter. **A missed deadline can mean lost money, lost time or a support right that is harder to use.**

Most people track this across screenshots, paper drawers, spreadsheets and memory. The information exists — it is just never in one place, and never shaped as a next action.

---

## The solution

AfterBuy structures the post-purchase lifecycle into three steps:

1. **See what matters** — urgent return windows, pending refunds, expiring warranties and missing receipts surface above everything else.
2. **Keep the context together** — each purchase has its dates, statuses, notes and reference links in one place.
3. **Move the lifecycle forward** — update a return, refund or warranty state and keep the history readable from purchase to resolution.

The dashboard is designed to make the most urgent item recognizable within 3 seconds. Dates and statuses are context for a decision, not dashboard decoration.

---

## Target users

| User | Context |
|------|---------|
| **Power shopper** | Frequent online buyer juggling multiple return windows across stores. Needs speed and efficiency. |
| **Value protector** | Buyer of high-ticket items (electronics, furniture) who prioritizes warranty longevity and support rights. |
| **Family manager** | Handles purchases for multiple people. Needs a single source of truth for receipts and deadlines. |
| **Organized freelancer** | Tracks work-related purchases for tax and expense purposes. Needs clean receipt references. |
| **Offline shopper** | Buys in physical stores but wants a digital place to track receipts and warranties. |

---

## Key features (MVP)

| Feature | Status |
|---------|--------|
| Add a purchase with store, category, date, price, return policy and warranty duration | Available |
| Automatic return deadline and warranty expiration calculation (server-side) | Available |
| Urgency classification: overdue, due-soon, upcoming, safe | Available |
| Dashboard with urgent action cards ordered by severity | Available |
| Actions Needed view: all actionable purchases in one place | Available |
| Purchase list with filters by status, store, category and urgency | Available |
| Purchase detail with lifecycle status, document references and timeline | Available |
| Update return, refund and warranty status with inline feedback | In progress |
| Purchase form with React Hook Form + Zod validation (client and server) | In progress |
| Seeded demo data with realistic post-purchase scenarios | Available |
| Responsive, mobile-first interface | Available |

---

## User journey

The MVP journey is intentionally focused:

```
Open dashboard → see urgent actions → open purchase detail → update lifecycle status → dashboard reflects the change
```

The critical flow end-to-end: **create a purchase → deadline is calculated server-side → urgent action appears on dashboard → update return/refund status → timeline records the change → dashboard urgency updates.**

Full journey documented in [`docs/product/user-journey_UPDATED.md`](docs/product/user-journey_UPDATED.md).

---

## Tech stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Framework** | Next.js 15 (App Router) | Server Components, Server Actions, routing, full-stack in one repo |
| **Language** | TypeScript (strict) | End-to-end type safety |
| **Styling** | Tailwind CSS | Utility-first, design token alignment, no CSS bloat |
| **Forms** | React Hook Form + Zod | Inline validation, typed schemas, client + server reuse |
| **Persistence** | Prisma + SQLite | Lightweight, realistic data model, switchable to PostgreSQL |
| **Validation** | Zod | Shared between client forms and Server Actions |
| **Testing** | Vitest + Testing Library + Playwright | Unit, component, and E2E coverage |
| **Architecture** | Feature-based with explicit layers | Readable, testable, interview-friendly |

---

## Architecture overview

AfterBuy uses a **single Next.js full-stack repository** with clear internal boundaries — no monorepo ceremony, no separate backend service.

```
app/               → Next.js routing, layouts, loading/error boundaries (Server Components by default)
features/          → Product-specific UI flows: dashboard, purchases, purchase-detail, purchase-form
entities/          → Pure domain logic: deadline calculation, urgency classification, status derivation
server/            → Repositories, Server Actions, server queries, Prisma access
shared/            → Reusable UI primitives, validation schemas, formatting utilities
```

### Layer rules

- **`entities/`** contains zero React, Next.js or Prisma imports. Pure TypeScript, unit-testable with fixed dates.
- **`server/`** owns Prisma. Repositories hide data access details from actions and queries.
- **`features/`** compose shared UI and map server data into view models. Never call Prisma directly.
- **`app/`** pages are thin: validate params, call queries, compose feature components.

### Data flow

```
Read:  route page → server query → repository → Prisma → domain logic → mapper → UI
Write: form → Server Action → Zod validation → domain logic → repository (transaction) → revalidate → redirect
```

### Key decisions

- **Server Actions for mutations**, not REST endpoints. Internal product mutations are form-driven.
- **Server Components by default**, Client Components only for interactive controls (forms, filters, status updates).
- **Business logic outside React.** Deadlines, urgency and lifecycle status live in pure functions.
- **No authentication, no real uploads, no merchant integrations in MVP** — these are deliberately deferred to the roadmap.

Full architecture: [`docs/architecture/overview.md`](docs/architecture/overview.md).

---

## Data model

Seven persisted entities centered around `Purchase`:

```
Store ──< Purchase >── ReturnCase
                    >── Refund
                    >── Warranty
                    >── PurchaseDocument
                    >── TimelineEvent
```

### Key modeling choices

- **Money in integer cents** (`priceCents`), never floating point.
- **Calendar-date semantics** with explicit `currentDate` parameter in all time-sensitive functions.
- **Enums for statuses** (ReturnStatus, RefundStatus, WarrantyStatus, DocumentType, TimelineEventType).
- **Derived types** (UrgencyLevel, PurchaseLifecycleStatus, ActionReason) calculated server-side, never persisted in MVP.
- **Timeline events generated by Server Actions**, not React components — they reflect real lifecycle changes.
- **Purchase creation in a Prisma transaction**: creates Purchase + ReturnCase + Refund + Warranty + Documents + TimelineEvents atomically.

### Zod validation at every input boundary

Seven schemas covering create, update, status changes, documents and filters. Client validation improves UX; server-side validation protects data integrity.

Full data model with Prisma schema, Zod schemas and business rules: [`docs/architecture/data-model.md`](docs/architecture/data-model.md).

---

## Testing strategy

A focused testing approach that protects the critical product behavior:

| Level | Tool | Scope |
|-------|------|-------|
| **Unit** | Vitest | Domain logic: deadline calc, warranty expiration, urgency, refund/receipt checks |
| **Validation** | Vitest | Zod schemas: create, update, filters, status changes |
| **Component** | Testing Library | Forms (validation messages, pending state), badges (status, deadline, urgency), empty/error states |
| **E2E** | Playwright | One critical flow: create purchase → see urgent action → update status → verify dashboard |

> Testing priority: business logic > validation > user flows > component details > repository internals.

Full strategy: [`docs/architecture/testing.md`](docs/architecture/testing.md).

---

## Product decisions

AfterBuy is built with conscious scope control. Every excluded feature is a documented choice, not an oversight:

| Decision | Rationale |
|----------|-----------|
| No authentication | User accounts add complexity before the single-user flow is complete. |
| No real file uploads | Document storage, OCR and cloud buckets are future scope. |
| No merchant integrations | Amazon, PayPal, Zalando, banking APIs are explicitly out of MVP. |
| No email parsing | Gmail/Outlook inbox parsing shifts the project toward integrations. |
| No push notifications | Background jobs and delivery are future infrastructure. |
| No multi-user | Collaborations, households and sharing are post-MVP. |
| No native mobile app | The responsive web app covers mobile use. |

All 17 Architecture Decision Records: [`docs/adr/`](docs/adr/).

---

## Design direction

**"Utilitarian Premium"** — a functional aesthetic that avoids both the corporate SaaS look and the generic startup template.

### Principles

- **Priority of Action** — the most urgent financial risk always occupies the highest visual position.
- **Contextual Disclosure** — show *what* (product + urgency) on the dashboard, show *how* (manuals, support links, order numbers) only in detail.
- **Status as Progress** — `Return Planned → Returned → Refunded` feels like a win, not a label change.
- **Signal Colors** reserved exclusively for urgency (red = overdue, amber = due-soon, blue = upcoming, green = safe). Never decorative.
- **Rewarding Emptiness** — empty states are "resolved", not "missing". Example: _"Everything is under control. Enjoy your purchases."_
- **Mobile-First Resolution** — designed for the user holding a physical product in one hand and the phone in the other.
- **Server is Source of Truth** — no React component calculates deadlines or urgency. Components render pre-computed values.

### Visual identity

- Typography: Inter, high-legibility sans-serif. Dates and prices treated as primary data.
- Palette: Neutral base (`#FAFAFA` → `#171717`) with signal colors only for urgency.
- Density: Balanced — dense enough to be useful, spaced enough to breathe.
- Shadows: Minimal. Flat and utilitarian, not layered.

Design system: [`docs/design/design-system.md`](docs/design/design-system.md).

---

## Design quality process

AfterBuy uses the **Impeccable method** as a design quality gate. The process:

1. **Design brief** defines product feel, target users and UX goals before any screen is designed.
2. **Screen specifications** define every screen with: objective, user question, layout, components, states (loading, empty, error, edge cases), mobile variant, desktop variant, acceptance criteria.
3. **Design system** defines tokens, component specs (with TypeScript Props), accessibility requirements and anti-patterns.
4. **UX states & microcopy** covers every empty state, error message, validation message and CTA with ready-to-use Italian copy.
5. **Impeccable review** stress-tests all design documents against product anchors, flags inconsistencies and mandates corrections before implementation.

The result: a coding agent receives implementable specs, not vague design direction.

Key design docs:
- [`docs/design/design-brief.md`](docs/design/design-brief.md)
- [`docs/design/screen-specs.md`](docs/design/screen-specs.md)
- [`docs/design/design-system.md`](docs/design/design-system.md)
- [`docs/design/ux-states.md`](docs/design/ux-states.md)
- [`docs/design/impeccable-review.md`](docs/design/impeccable-review.md)

---

## Landing page strategy

The landing page is integrated into the Next.js application and serves as the entry point to both the product demo and the case study.

### Structure

```
Hero (problem + value + screenshot + CTA)
  → Problem narrative
  → Value sequence (see → understand → act)
  → Feature flow with real previews and status labels
  → "What works now" (verifiable inventory)
  → "Work in progress" (honest disclosure of current limits)
  → Planned improvements (direction, not promises)
  → Final CTA to demo
```

### Transparency rules

- Every feature carries an explicit status: `Available`, `Demo data`, `In progress`, `Planned`, `Not in the MVP`.
- The demo declares it uses seed data and does not store real receipts or personal documents.
- No "Coming soon", no invented metrics, no fake testimonials, no AI claims for date arithmetic.
- CTA label is dynamic: `Open App` when the slice is deployed, `Try the Demo` when seed data is accessible, `Preview in progress` when nothing is navigable.

Landing docs:
- [`docs/marketing/landing-page-brief.md`](docs/marketing/landing-page-brief.md)
- [`docs/marketing/landing-page-structure.md`](docs/marketing/landing-page-structure.md)
- [`docs/marketing/landing-page-copy.md`](docs/marketing/landing-page-copy.md)
- [`docs/marketing/wip-transparency.md`](docs/marketing/wip-transparency.md)

---

## Architecture Decision Records (ADRs)

17 ADRs document every material architectural choice:

| ADR | Decision |
|-----|----------|
| [ADR-0001](docs/adr/0001-use-nextjs-full-stack.md) | Use Next.js Full-Stack in a Single Repository |
| [ADR-0002](docs/adr/0002-keep-backend-lightweight.md) | Keep the Backend Lightweight and Product-Supporting |
| [ADR-0003](docs/adr/0003-use-feature-based-architecture.md) | Use a Feature-Based Architecture with Explicit Layers |
| [ADR-0004](docs/adr/0004-use-prisma-for-data-modeling.md) | Use Prisma for Data Modeling and Lightweight Persistence |
| [ADR-0005](docs/adr/0005-use-zod-for-validation-boundaries.md) | Use Zod at Validation Boundaries |
| [ADR-0006](docs/adr/0006-keep-business-logic-outside-react-components.md) | Keep Business Logic Outside React Components |
| [ADR-0007](docs/adr/0007-use-server-actions-and-selective-route-handlers.md) | Use Server Actions for Internal Mutations |
| [ADR-0008](docs/adr/0008-defer-auth-uploads-and-external-integrations.md) | Defer Authentication, Uploads and Integrations |
| [ADR-0009](docs/adr/0009-use-vitest-and-playwright-testing-strategy.md) | Use a Focused Testing Strategy |
| [ADR-0010](docs/adr/0010-treat-technical-documentation-as-portfolio-value.md) | Treat Documentation as Portfolio Value |
| [ADR-0011](docs/adr/0011-adopt-documented-design-direction.md) | Adopt "Utilitarian Premium" Design Direction |
| [ADR-0012](docs/adr/0012-use-impeccable-as-design-quality-gate.md) | Use Impeccable as Design Quality Gate |
| [ADR-0013](docs/adr/0013-maintain-lightweight-design-system.md) | Maintain a Lightweight Project-Owned Design System |
| [ADR-0014](docs/adr/0014-integrate-real-landing-page-in-nextjs.md) | Integrate a Real Landing Page in Next.js |
| [ADR-0015](docs/adr/0015-communicate-work-in-progress-transparently.md) | Communicate Work in Progress Transparently |
| [ADR-0016](docs/adr/0016-distinguish-available-demo-and-planned-features.md) | Distinguish Available, Demo and Planned Features |
| [ADR-0017](docs/adr/0017-use-landing-as-entry-point-to-demo.md) | Use the Landing as Entry Point to the Demo |

---

## Work in progress

AfterBuy is intentionally not presented as a finished consumer service. The current work focuses on completing the core flow:

- [ ] Completing the create/edit purchase flow with server-side validation and inline feedback
- [ ] Polishing quick status updates and their confirmation feedback
- [ ] Expanding route-level loading, empty and error states
- [ ] Testing the critical E2E flow: create purchase → urgent action → status update
- [ ] Polish responsive layouts at 320px, 390px and desktop
- [ ] Accessibility audit (focus management, screen reader, contrast)

The product preview uses **example data**. It does not store real receipts, personal documents or connected merchant accounts.

---

## Roadmap

These are directions, not release promises. Ordered by priority after the core flow is complete:

### Next improvements

- Search, URL-based filters and clearer sorting for larger purchase lists
- Archive and export options
- Calendar/email reminder concepts (without committing to notification delivery)
- Receipt-upload placeholders (before any real file-storage decision)
- Demo reset and deployment behavior

### Explicitly outside MVP scope

- Authentication and user accounts
- Real file upload, cloud storage and OCR
- Email inbox parsing (Gmail, Outlook)
- Merchant integrations (Amazon, Zalando, PayPal, banking APIs)
- Push notifications and background jobs
- Multi-user, households and collaboration
- Native mobile app
- AI-based purchase classification
- Legal, fiscal or consumer-rights advice

---

## Screenshots

<!-- Screenshots placeholder — replace with actual screenshots from the running app -->

| Screen | Preview |
|--------|---------|
| Dashboard | `[screenshot: dashboard with urgent actions, summary strip, recent purchases]` |
| Actions Needed | `[screenshot: full action list ordered by urgency]` |
| Purchase Detail | `[screenshot: detail page with deadlines, lifecycle panel, timeline]` |
| Purchase List | `[screenshot: list with filters, desktop table and mobile cards]` |
| Add Purchase | `[screenshot: form with validation and deadline preview]` |

---

## Local setup

```bash
# Clone
git clone <repo-url>
cd afterbuy

# Install dependencies
pnpm install

# Set up environment
cp .env.example .env
# Edit .env if needed (SQLite works out of the box)

# Set up the database
pnpm prisma migrate dev
pnpm db:seed

# Start development server
pnpm dev

# Open http://localhost:3000
```

### Available scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start Next.js dev server |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | Run TypeScript type checking |
| `pnpm test` | Run Vitest unit and component tests |
| `pnpm test:e2e` | Run Playwright E2E tests |
| `pnpm db:migrate` | Run Prisma migrations |
| `pnpm db:seed` | Seed the database with demo data |
| `pnpm db:reset` | Reset and reseed the database |
| `pnpm db:studio` | Open Prisma Studio |

---

## Portfolio value

AfterBuy demonstrates the ability to design and build a credible micro-product — not a generic frontend demo.

### What this project shows

- **Product thinking** applied to a real everyday problem (post-purchase fragmentation → concrete economic loss).
- **UX decisions** around urgency, prioritization and user actions — not just CRUD tables.
- **Frontend architecture** with clear feature boundaries, Server/Client Component split, view models and mappers.
- **Backend awareness** without overengineering: Prisma schema, repositories, Server Actions, Zod validation, typed results.
- **Domain logic** that is pure, framework-independent and unit-tested (deadlines, urgency, lifecycle statuses).
- **Stateful interfaces** with dates, statuses, filters and empty states — not static mockups.
- **Design quality** — documented design direction, screen specs, component specs, anti-patterns, microcopy and accessibility baseline.
- **Scope discipline** — 17 ADRs, explicit non-goals, transparent WIP communication.
- **Documentation** suitable for a product-oriented engineering team.

### Positioning

Positioned for **product-oriented companies, scaleups and mature startups in Berlin and Europe**. The project is frontend-leaning but not frontend-limited: it shows a Software Engineer with strong React/TypeScript/UX/frontend architecture skills who can reason across API contracts, data structures, validation, testing, documentation and product constraints.

---

## What I would improve next

1. **Complete the core E2E flow** — make create → dashboard → detail → status update fully reliable with proper pending/error states.
2. **Expand test coverage** — the Playwright E2E test and domain unit tests are the highest-signal additions.
3. **Replace SQLite with PostgreSQL** for a deployable demo (minimal Prisma schema change).
4. **Add a demo reset endpoint** — let reviewers reset seed data without CLI access.
5. **Polish quick actions with optimistic UI** — inline status updates on urgent action cards with fade+slide animation and toast confirmation.
6. **Accessibility pass** — focus management after form submission, screen-reader testing, reduced-motion support.
7. **Deploy to Vercel** — make the product preview publicly accessible with a real URL behind the landing page CTA.
8. **Add search and URL-based filters** — the filter architecture is designed for it; search params persistence is the next step.

---

## Documentation index

### Product
- [`docs/product/project-charter.md`](docs/product/project-charter.md) — Vision, scope, positioning, success criteria
- [`docs/product/user-journey_UPDATED.md`](docs/product/user-journey_UPDATED.md) — Main user journey and flows
- [`docs/product/feasibility-study_UPDATED.md`](docs/product/feasibility-study_UPDATED.md) — Feasibility analysis
- [`docs/product/mvp-scope_UPDATED.md`](docs/product/mvp-scope_UPDATED.md) — MVP scope and non-goals

### Architecture
- [`docs/architecture/overview.md`](docs/architecture/overview.md) — Architecture overview, layers, data flow
- [`docs/architecture/frontend.md`](docs/architecture/frontend.md) — Frontend architecture, routes, components, states
- [`docs/architecture/backend.md`](docs/architecture/backend.md) — Backend architecture, repositories, actions, queries
- [`docs/architecture/data-model.md`](docs/architecture/data-model.md) — Entities, Prisma schema, Zod schemas, business rules
- [`docs/architecture/api-design.md`](docs/architecture/api-design.md) — API boundaries, Server Actions, Route Handlers
- [`docs/architecture/testing.md`](docs/architecture/testing.md) — Testing strategy, pyramid, tools, scope

### Design
- [`docs/design/design-brief.md`](docs/design/design-brief.md) — Design vision, product feel, visual personality
- [`docs/design/screen-specs.md`](docs/design/screen-specs.md) — Screen-by-screen specifications with acceptance criteria
- [`docs/design/design-system.md`](docs/design/design-system.md) — Tokens, component specs (with Props), anti-patterns
- [`docs/design/ux-states.md`](docs/design/ux-states.md) — UX states, microcopy, tone of voice
- [`docs/design/impeccable-review.md`](docs/design/impeccable-review.md) — Design quality review and corrections

### Marketing
- [`docs/marketing/landing-page-brief.md`](docs/marketing/landing-page-brief.md) — Landing page positioning and strategy
- [`docs/marketing/landing-page-structure.md`](docs/marketing/landing-page-structure.md) — Page structure, components, states
- [`docs/marketing/landing-page-copy.md`](docs/marketing/landing-page-copy.md) — Ready-to-use English copy
- [`docs/marketing/wip-transparency.md`](docs/marketing/wip-transparency.md) — WIP communication rules and vocabulary

### Decisions
- [`docs/adr/`](docs/adr/) — 17 Architecture Decision Records
- [`docs/adr/ADR_README.md`](docs/adr/ADR_README.md) — ADR index and working rules

---

## License

MIT