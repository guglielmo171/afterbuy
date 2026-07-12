# ADR-0016: Distinguish Available, Demo, In-Progress and Planned Features

- **Status:** Accepted
- **Decision date:** 2026-07-12

## Context

A single “work in progress” label is too coarse for AfterBuy. Some flows may be fully navigable, some may use resettable seeded data, some may be under active implementation and others are intentionally outside the MVP. Without a controlled vocabulary, CTA labels and feature claims can become inconsistent across the landing page.

Status must be textually clear and cannot rely only on color. The application also needs a single source of truth so that header CTA, hero note and feature disclosures do not contradict each other.

## Decision

AfterBuy will use the following controlled feature-status vocabulary:

- **`Available`**: the flow is navigable and works in the current preview;
- **`Demo data`**: the flow is available using seed/reset behavior and no personal documents;
- **`In progress`**: part of the core flow is being implemented or is not reliable enough to expose;
- **`Planned`**: a possible improvement after the current vertical slice, not a release promise;
- **`Not in the MVP`**: deliberately excluded from the current product scope.

A central `productStatus` configuration or server-side content source will govern global CTA label, destination, disclosure and feature labels. Components must not duplicate availability strings independently. Status badges must include text and accessible semantics; color may reinforce but never replace the label.

A capability may be marked `Available` only when a working route or verifiable current-build preview exists. A partial screenshot of a non-navigable flow is `In progress`. Seeded behavior always carries the `Demo data` disclosure.

## Alternatives considered

### Binary available/not available status

Rejected because it cannot distinguish demo behavior, active implementation and intentional non-goals.

### Free-form status copy per section

Rejected because language and expectations would drift across the page.

### Color-only status badges

Rejected because they are inaccessible and semantically ambiguous.

### “Coming soon”, “beta” and “almost ready”

Rejected because they are vague and imply progress or timing without evidence.

### Hard-code CTA state in each component

Rejected because header, hero and final CTA could become inconsistent.

## Consequences

### Positive

- Visitors can understand the exact maturity of each feature.
- CTA and disclosure remain synchronized.
- The landing can evolve incrementally as features become available.
- Accessibility and editorial review have explicit rules.
- Future scope is separated from implementation progress.

### Negative

- Status configuration must be maintained as part of development.
- A feature may require multiple labels when it is available only with demo data.
- Granular status exposes incomplete work more visibly.
- Screenshots and copy must be reviewed when status changes.

## Trade-offs

The project accepts editorial and configuration overhead to avoid ambiguous marketing. Precision is favored over a simpler but misleading global “beta” label.

## Portfolio value

The controlled vocabulary demonstrates product operations thinking and attention to trustworthy communication. It also shows that frontend content and routing state can be modeled rather than scattered across components.

## Related documents

- `docs/marketing/landing-page-brief.md`
- `docs/marketing/landing-page-structure.md`
- `docs/marketing/landing-page-copy.md`
- `docs/marketing/wip-transparency.md`
- `docs/design/design-system.md`
- `docs/adr/0015-communicate-work-in-progress-transparently.md`
- `docs/adr/0017-use-landing-as-entry-point-to-demo.md`
