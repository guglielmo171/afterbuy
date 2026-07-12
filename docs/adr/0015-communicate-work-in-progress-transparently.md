# ADR-0015: Communicate Work in Progress Transparently

- **Status:** Accepted
- **Decision date:** 2026-07-12

## Context

AfterBuy will be publicly visible before every planned flow is complete. Presenting the project as finished would mislead visitors, while hiding limitations in small disclaimers would undermine trust. Recruiters also need to distinguish intentional scope decisions from unfinished work.

Transparency is therefore not only marketing copy; it is a product and portfolio behavior that must remain consistent across the landing page, CTA, screenshots and demo data.

## Decision

AfterBuy will communicate its **work-in-progress state explicitly, visibly and consistently**.

The landing and relevant demo surfaces will:

- state that the product is a preview and work in progress;
- describe the current focused vertical slice;
- disclose when seed data is used and when it may be reset;
- state that personal documents and connected accounts are not used;
- place disclosures near the CTA and feature claims, not only in a footer;
- avoid release dates, completion percentages and unsupported promises;
- use real screenshots only for accessible or accurately labeled work;
- keep “What works now”, “Work in progress” and “Planned improvements” as separate concepts.

The WIP policy must be reviewed before each public release. Any claim of availability requires either a working path or verifiable current-build evidence.

## Alternatives considered

### Present the project as a finished product

Rejected because it would create false expectations and damage trust when flows are incomplete or demo-only.

### Hide WIP details in a footer disclaimer

Rejected because users should understand the state before clicking the primary CTA.

### Avoid publishing until the entire MVP is complete

Rejected because build-in-public and early portfolio visibility are intentional goals.

### Use vague labels such as “beta” or “coming soon”

Rejected because they do not explain what works, what is being built or what is deliberately out of scope.

### Publish a roadmap with dates and percentages

Rejected because the project has no basis for release commitments and those numbers would become stale.

## Consequences

### Positive

- Visitors have accurate expectations before entering the demo.
- Intentional non-goals are not confused with missing engineering.
- The project builds credibility through honest scope communication.
- Copy and screenshots are forced to remain grounded in the build.
- The policy supports safe use of seeded demonstration data.

### Negative

- WIP language may reduce the impression of completeness.
- Status copy must be maintained frequently during implementation.
- Feature claims require evidence and may need to be downgraded when unstable.
- The landing cannot rely on aggressive product marketing conventions.

## Trade-offs

The project accepts a more modest marketing tone to preserve trust. It prioritizes credible product engineering over the appearance of a finished commercial service.

## Portfolio value

Transparent WIP communication demonstrates ownership, professional honesty and scope awareness. It turns an unfinished state into evidence of a controlled development process rather than disguising it.

## Related documents

- `docs/marketing/landing-page-brief.md`
- `docs/marketing/landing-page-structure.md`
- `docs/marketing/landing-page-copy.md`
- `docs/marketing/wip-transparency.md`
- `docs/product/mvp-scope.md`
- `docs/adr/0008-defer-auth-uploads-and-external-integrations.md`
- `docs/adr/0016-distinguish-available-demo-and-planned-features.md`
- `docs/adr/0017-use-landing-as-entry-point-to-demo.md`
