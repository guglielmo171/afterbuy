# ADR-0013: Maintain a Lightweight Project-Owned Design System

- **Status:** Accepted
- **Decision date:** 2026-07-12

## Context

AfterBuy needs consistent buttons, form controls, cards, badges, states, timelines and responsive list patterns. A broad themed UI library could accelerate initial assembly but would encourage generic visuals, excessive variants and dependency on conventions that do not express the product's urgency semantics.

Building every primitive from scratch would also waste time and could introduce accessibility defects. The project needs a small middle path focused on actual screens.

## Decision

AfterBuy will maintain a **lightweight, project-owned design system** made of documented tokens, a small `shared/ui` layer and a limited set of feature components.

The first shared inventory is intentionally small: `Button`, `Input`, `Select`, `Textarea`, `Card`, `Badge`, `StatusBadge`, `DeadlineBadge`, `EmptyState`, `ErrorState` and `LoadingState`. Components are added only when at least one current screen requires them and abstractions are extracted only after repeated behavior is understood.

The documented design tokens and component contracts are the source of truth. A low-level headless primitive or copied component pattern may be used selectively when it reduces accessibility or interaction risk, but it must be owned in the repository, restyled to AfterBuy tokens and must not turn an external library's theme into the product design authority.

Feature-specific components such as `ActionCard` remain close to product flows. Generic “everything” components, speculative variants and a standalone component-library project are out of scope.

## Alternatives considered

### Comprehensive themed UI library

Rejected because default styling and component breadth would make the application look generic and increase unused surface area.

### Full adoption of an external design system

Rejected because AfterBuy has distinct urgency, density and status semantics that must remain product-specific.

### Build all primitives from raw HTML and CSS

Rejected as a universal rule because accessibility-heavy primitives may benefit from proven low-level behavior.

### Create a standalone design-system package

Rejected because independent versioning, documentation tooling and package release are unnecessary for one application.

### No shared UI layer

Rejected because badges, states and form controls would drift across screens.

## Consequences

### Positive

- UI remains consistent without becoming a separate product.
- The visual identity is not constrained by library defaults.
- Components expose only variants that the product uses.
- Accessibility behavior can be centralized.
- Marketing and app surfaces can share tokens and primitives.

### Negative

- The project owns maintenance and testing of its shared components.
- Some common controls may take longer than importing a complete library.
- Selective primitive adoption requires discipline to avoid mixed styling conventions.
- Component extraction decisions must be revisited as screens mature.

## Trade-offs

The project accepts ownership of a small component surface to gain product specificity. It avoids ideological “from scratch” implementation and allows low-level assistance where it preserves accessibility and does not introduce a competing design language.

## Portfolio value

This decision demonstrates design-system judgment: knowing what to standardize, what to keep feature-specific and how to avoid both copy-paste inconsistency and premature library engineering.

## Related documents

- `docs/architecture/frontend.md`
- `docs/design/design-brief.md`
- `docs/design/screen-specs.md`
- `docs/design/design-system.md`
- `docs/design/impeccable-review.md`
- `docs/marketing/landing-page-structure.md`
- `docs/adr/0011-adopt-documented-design-direction.md`
- `docs/adr/0012-use-impeccable-as-design-quality-gate.md`
