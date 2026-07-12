# ADR-0017: Use the Landing Page as the Entry Point to the Demo/Application

- **Status:** Accepted
- **Decision date:** 2026-07-12

## Context

The public entry point must help visitors understand AfterBuy before they interact with seeded product data. The original application architecture used the dashboard at `/`, while the later landing-page decision requires an explicit marketing route and a non-ambiguous application entry.

The CTA must never point to a missing route or imply that an unavailable flow can be used. Its label and destination must reflect the current product status.

## Decision

The landing page will be the **public root route `/`** and the application dashboard entry will be **`/app`**.

The landing's primary CTA will be governed by the central `productStatus` source:

- `Open App` when the current vertical slice is accessible;
- `Try the Demo` when the route opens resettable seeded data;
- `Preview in progress` linking to the product-status section when no public application route is reliable.

The CTA must target a real route. No non-functional button or placeholder URL is allowed. The header CTA, hero CTA and final CTA must share the same state and destination.

Application navigation may preserve existing routes such as `/purchases` and `/actions-needed` or later place them under an `/app` namespace, but `/app` remains the canonical dashboard entry and all internal links must be consistent. There must be only one dashboard implementation; `/` must not duplicate the dashboard after the landing is introduced.

Visitors entering the demo must see a nearby disclosure that the preview may use seeded data and does not require personal purchase information or real documents.

## Alternatives considered

### Keep the dashboard at `/` and place marketing at `/about` or `/product`

Rejected because the public root should explain the product and current state before exposing the work-in-progress application.

### Separate landing domain

Rejected because it would fragment deployment, design consistency and status management.

### CTA directly to a screenshot or video

Rejected as the primary path because the goal is to provide a real interactive preview when available.

### Always show `Open App`

Rejected because the label would be misleading when only seed data or no stable preview exists.

### Hide the CTA until the MVP is complete

Rejected because the landing should remain useful during development and can route to product status when necessary.

## Consequences

### Positive

- The public journey becomes product context -> accurate expectation -> working preview.
- `/` has a stable marketing and portfolio purpose.
- CTA behavior remains honest as the build evolves.
- The app has a clear canonical entry point.
- Landing and demo can deploy together.

### Negative

- Existing route specifications that assumed the dashboard at `/` must be updated.
- Navigation and tests must account for the `/app` entry.
- The central status configuration becomes a release-critical dependency.
- Deep links still need clear back-navigation to the application shell and landing when appropriate.

## Trade-offs

The project accepts a small routing migration to gain a stronger public product narrative and eliminate ambiguity between marketing and application surfaces. It does not require every functional route to move under `/app` immediately, only a single canonical dashboard entry and consistent navigation.

## Portfolio value

The decision creates a coherent recruiter journey and demonstrates that marketing, routing and product availability are part of the application architecture. It also prevents the common portfolio problem of a polished landing disconnected from a real demo.

## Related documents

- `docs/marketing/landing-page-brief.md`
- `docs/marketing/landing-page-structure.md`
- `docs/marketing/landing-page-copy.md`
- `docs/marketing/wip-transparency.md`
- `docs/architecture/frontend.md`
- `docs/design/screen-specs.md`
- `docs/adr/0014-integrate-real-landing-page-in-nextjs.md`
- `docs/adr/0015-communicate-work-in-progress-transparently.md`
- `docs/adr/0016-distinguish-available-demo-and-planned-features.md`
