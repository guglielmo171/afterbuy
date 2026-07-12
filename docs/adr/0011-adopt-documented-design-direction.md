# ADR-0011: Adopt the Documented “Utilitarian Premium” Design Direction

- **Status:** Accepted
- **Decision date:** 2026-07-12

## Context

AfterBuy can easily become a generic CRUD or SaaS dashboard because it contains lists, forms, statuses and summary data. That visual direction would weaken the product promise. The design must help users identify financial risk and take action quickly while remaining calm and trustworthy.

The design brief, screen specifications, design system and UX-state documents define a coherent direction that is specific enough to guide implementation and review.

## Decision

AfterBuy will adopt **“Utilitarian Premium”** as its documented product design direction.

The implementation must follow these principles:

- action-first hierarchy, ordered by `overdue`, `due_soon`, `upcoming`, `safe`;
- a neutral visual base with signal colors reserved for semantic urgency;
- balanced information density without dashboard clutter;
- “What -> How” contextual disclosure from dashboard to detail;
- statuses presented as lifecycle progress;
- mobile-first resolution and deliberate desktop layouts;
- calm, practical and action-oriented microcopy;
- rewarding empty states that communicate resolution rather than missing data;
- functional, literal iconography and high-legibility typography.

The design documents are the source of truth for screen hierarchy, component states, microcopy and acceptance criteria. Implementation may refine details only when usability, accessibility or technical evidence justifies the change and the documents are updated.

## Alternatives considered

### Generic SaaS dashboard

Rejected because bento grids, decorative KPIs and excessive cards would obscure the action-first product identity.

### Marketing-led expressive visual style

Rejected because gradients, decorative illustrations and dramatic motion would conflict with the product's utility and trust requirements.

### Spreadsheet-like dense interface

Rejected because it would optimize raw information display at the cost of urgency and calm decision-making.

### Screen-by-screen ad hoc design

Rejected because visual rules and states would drift across dashboard, list, detail and landing page.

### Copying a component-library theme

Rejected because the design must express AfterBuy's semantics rather than inherit a generic product personality.

## Consequences

### Positive

- The product has a distinctive and defensible visual identity.
- Urgency and next actions govern hierarchy consistently.
- Marketing and application surfaces can share one product language.
- Mobile and accessibility requirements are explicit.
- Review criteria are available before implementation.

### Negative

- Generic library defaults often require restyling.
- The constrained palette limits decorative freedom.
- Every new component must preserve semantic color rules and calm density.
- Design changes require documentation updates rather than isolated CSS edits.

## Trade-offs

The project gives up rapid assembly from generic templates in exchange for product specificity and trust. The visual system remains restrained so that implementation effort is concentrated on hierarchy, state and interaction rather than decoration.

## Portfolio value

The documented direction shows that design is connected to product strategy and measurable UX goals. It helps the project stand out as a product-engineering case study rather than a collection of polished components.

## Related documents

- `docs/design/design-brief.md`
- `docs/design/screen-specs.md`
- `docs/design/design-system.md`
- `docs/design/ux-states.md`
- `docs/design/impeccable-review.md`
- `docs/product/project-charter.md`
- `docs/product/user-journey.md`
- `docs/adr/0012-use-impeccable-as-design-quality-gate.md`
- `docs/adr/0013-maintain-lightweight-design-system.md`
