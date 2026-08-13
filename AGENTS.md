# AfterBuy — agent guide

## Stack e struttura

- AfterBuy is a frontend-led, lightweight full-stack product built with Next.js App Router, TypeScript, React, Prisma, SQLite, Zod, React Hook Form, Vitest, Testing Library and Playwright.
- The intended structure is `src/app` (routes and boundaries), `src/features` (product flows), `src/entities` (pure domain), `src/shared` (small reusable primitives, validation and utilities), `src/server` (Prisma, repositories, queries and Server Actions), `prisma` (schema and seed), and `tests/e2e`.
- Public source of truth: `README.md`, `docs/editorial/product-contract.md`, other files in `docs/editorial/`, `PRODUCT.md`, and `DESIGN.md`. The product contract wins on domain, statuses, urgency, dates, scope, and routes. Do not treat the current Prisma schema as the contract.
- Local working notes (`docs/product/`, `docs/architecture/`, `docs/design/`, `docs/marketing/`, `docs/adr/`, the local workflow file, and `prompts/`) may be absent on a public clone. If they are present, they do not override the contract.
- For app UI changes, follow `DESIGN.md`, `docs/editorial/design.md`, and the visual rules in the product contract. For landing or public-preview copy, follow `docs/editorial/public-preview.md`. Keep WIP labels and CTA destination centrally configured.
- Preserve the MVP boundary in the product contract. Slice 1 is the return loop only. Authentication, real uploads/OCR, integrations, notifications, jobs, payments, multi-user features, delete/archive, and fake import are out of scope.

## Comandi e definizione di done

- Use the package manager, scripts and versions declared in the checked-in `package.json`; do not invent commands or add a second package manager.
- If a required command or environment value is not yet configured, make that limitation explicit instead of pretending verification succeeded.
- Before finishing a change, run the relevant available checks (at least lint, typecheck, focused tests, build or E2E when affected). Report checks run and checks not run, with reasons.
- A feature is done only when its stated user-visible flow works, server inputs are validated where applicable, loading/empty/error states are covered where applicable, and the implementation respects the documented responsive and accessibility requirements.
- Use deterministic dates in tests; do not make critical tests depend on the machine clock or unseeded data.

## Convenzioni di implementazione

- Default to Server Components for route reads. Use Client Components only for forms, filters, lifecycle controls and browser interactions.
- Pages compose; they do not contain domain rules or direct data access. Keep core rules as pure TypeScript in `entities/*/lib`; pass `currentDate` explicitly to time-sensitive rules.
- Only `src/server` repositories, DB setup and seed/test setup may import Prisma. Use explicit query shapes and map persistence data before it reaches client components.
- Validate all mutation and query input with canonical Zod schemas in `src/shared/validation`; validate again server-side before persistence.
- Use Server Actions for internal mutations and route handlers only for deliberate API-shaped boundaries. Use transactions for purchase creation and related lifecycle/timeline records.
- Store money in integer cents with currency default EUR. Store document metadata and references only—never real files or personal documents.
- Follow the two visual worlds in the product contract: landing uses the Pinned Action Slip world; `/app` uses utilitarian premium, a neutral palette, and semantic signal colours only for urgency. Do not mix materials. Mobile-first layouts, visible focus, AA contrast, and text in addition to colour for status.
- Use the approved English landing copy in `docs/editorial/public-preview.md` verbatim unless that file explicitly permits a status-dependent variation. Keep all WIP labels and CTA destination centrally configured. Product language and metadata are English.

## Regole operative dell'agente

- **Think Before Coding:** inspect the affected flow, existing conventions and cited documents; ask when an unresolved choice would materially change scope.
- **Simplicity First:** choose the smallest implementation that satisfies the documented vertical slice. Do not add dependencies or abstractions without a current use.
- **Surgical Changes:** touch only files needed for the task. Do not refactor, reformat or clean up unrelated code; preserve existing user changes.
- **Goal-Driven Execution:** state the observable outcome, implement it, verify it, and report the result and remaining limitations.
- Never expose raw database errors, claim unavailable features, fabricate screenshots/metrics/testimonials, or create dead routes and CTA targets.
- Keep public-preview status centralised so CTA labels, disclosures and feature availability cannot drift.
- Do not commit, push, deploy, alter CI/infrastructure, or modify documentation beyond the task unless explicitly asked.
