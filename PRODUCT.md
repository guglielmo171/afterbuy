# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js App Router, TypeScript, React, Prisma, SQLite, Tailwind CSS, Vitest, Playwright — established in repository.

## Users

Primary user on every surface: a frequent online shopper who needs to protect returns, refunds, and warranties. Landing and app both speak to that person.

A reviewer or product-driven company may also look at the landing. That is a quality and credibility constraint (clarity, mechanism, honest WIP, craft), not a second audience that changes the message.

## Product Purpose

AfterBuy helps frequent online shoppers see whether any purchase requires attention before a return window, refund, or warranty deadline is missed. It turns fragmented post-purchase information into a small, readable action queue rather than a passive archive.

Success for the landing: a first-time visitor understands the mechanism, trusts the WIP disclosure, and knows exactly what is available to explore today.

## Positioning

The product is built around one question — *what needs attention today or this week?* — with dates, lifecycle states, and urgency surfaced as context for a decision, not dashboard decoration. Neighboring tools either archive receipts passively or expand into finance, integrations, and accounts; AfterBuy stays narrow on deadlines, statuses, and the next action.

## Operating Context

- Public route `/` is the landing; `/app` is the product preview shell.
- Product state is centralized in `productStatus` — CTA label, href, disclosures, and WIP vocabulary must not drift across surfaces.
- Approved English marketing copy lives in project marketing/editorial docs and must be used verbatim unless explicitly revised at source.
- E2E tests enforce WIP honesty (no fake “Available” badges, no premature “Open App” or “Try the Demo” CTAs when the slice is not navigable).

## Capabilities and Constraints

**In scope (MVP):** purchases, deadlines, lifecycle statuses, urgent actions, dashboard prioritization, purchase detail context, create/edit flow with validation, example/seed data.

**Explicitly out of scope:** authentication, real file uploads/OCR, merchant or bank integrations, automatic refund tracking, notifications, multi-user features, legal advice, pricing, waitlists, fake metrics or testimonials.

**Current build state:** landing and app shell exist; interactive purchase flows are in progress; seeded data is not yet wired to UI; primary CTA links to `#product-status` until `/app` offers a navigable slice.

## Brand Commitments

- Name: **AfterBuy**
- Voice: concise, calm, practical — explains what happened and offers a next step; no fear-based wording or overpromising.
- WIP transparency is non-negotiable on public surfaces.
- Design direction (app): action before inventory; neutral surfaces; signal colour reserved for urgency with text pairing; mobile-first with 44px touch targets and AA contrast.

## Evidence on Hand

- Product contract (`docs/editorial/product-contract.md`) and other editorial docs under `docs/editorial/`. The contract is normative for domain, scope, and routes.
- Implemented landing at `src/app/page.tsx` (incumbent, subject to rethink).
- Design tokens in `tailwind.config.ts` (neutral palette, signal colours, Inter stack).
- No real dashboard screenshot yet; hero may use an honest wireframe built from tokens until `/app` is demoable.
- No testimonials, user counts, release dates, or customer logos — must not be fabricated.

## Product Principles

1. **Action before archive** — urgency and the next step lead; context supports the decision.
2. **Honest preview** — say what works, what uses example data, and what is planned; never imply finished consumer service.
3. **Narrow MVP** — purchase → date → urgent action → lifecycle update; defer integrations and platform expansion.
4. **Explicit time logic** — dates and urgency are product rules in plain TypeScript, not UI decoration.
5. **Calm specificity** — precise dates, states, and labels over decorative marketing language.

## Accessibility & Inclusion

WCAG 2.1 AA contrast, visible focus, semantic headings, descriptive labels for previews, reduced-motion support, keyboard-usable CTAs and in-page navigation.
