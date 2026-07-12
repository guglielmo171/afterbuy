# ADR-0014: Integrate a Real Product Landing Page into the Next.js Application

- **Status:** Accepted
- **Decision date:** 2026-07-12

## Context

AfterBuy will be shown while the product is still being built. A README alone does not provide an immediate product narrative, while a separate static marketing mock would create a false or disconnected representation of the application.

The landing page must explain the problem, current value, available product flow and development status to recruiters and demo visitors. It must use real screenshots and route visitors to a working product preview when one exists.

## Decision

AfterBuy will include a **real marketing landing page as part of the same Next.js application and repository**.

The landing will share the application font, tokens, focus styles, button language and product identity. It will not use a separate theme or standalone site. It will contain:

- a minimal product header;
- hero copy, CTA, product-status note and a real product screenshot;
- problem and value narrative;
- feature flow framed as see, understand and resolve;
- “What works now” before WIP and roadmap content;
- explicit WIP disclosure and planned improvements;
- a final CTA and consistent status note.

The landing will use real build evidence. It must not contain invented metrics, customer logos, testimonials, features or dashboard mockups. SEO metadata, Open Graph content and accessibility must reflect the actual product state.

## Alternatives considered

### README as the only presentation surface

Rejected because it is optimized for repository readers, not for immediate product comprehension and conversion to the demo.

### Separate marketing repository or site builder

Rejected because it would duplicate branding, deployment and status management and could drift from the application.

### Static placeholder landing

Rejected because a non-functional facade would weaken trust and create no reusable product value.

### Dashboard as the public root without context

Rejected because early visitors need to understand the product promise and WIP state before using seeded data.

### Waitlist or pricing landing

Rejected because accounts, pricing and acquisition funnels are outside the MVP.

## Consequences

### Positive

- The product is understandable before the visitor opens the app.
- Marketing and application remain visually and technically consistent.
- The landing becomes a real part of the implementation rather than a presentation artifact.
- Product status and screenshots can evolve with the build.
- The repository tells a coherent product story.

### Negative

- Landing implementation adds work before all application features are complete.
- Screenshots and availability copy must be maintained as the build changes.
- Routing must distinguish landing and app entry clearly.
- SEO and social assets become part of the publication checklist.

## Trade-offs

The project accepts a modest marketing surface because it materially improves portfolio communication and provides a stable public entry point. The landing is kept focused and does not become a separate content or growth platform.

## Portfolio value

The landing demonstrates product positioning, implementation continuity and the ability to communicate unfinished work responsibly. It lets reviewers understand both user value and engineering maturity without starting from repository documentation.

## Related documents

- `docs/marketing/landing-page-brief.md`
- `docs/marketing/landing-page-structure.md`
- `docs/marketing/landing-page-copy.md`
- `docs/marketing/wip-transparency.md`
- `docs/design/design-brief.md`
- `docs/design/design-system.md`
- `docs/adr/0010-treat-technical-documentation-as-portfolio-value.md`
- `docs/adr/0017-use-landing-as-entry-point-to-demo.md`
