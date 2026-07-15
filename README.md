# AfterBuy

> Work-in-progress product experiment

AfterBuy explores a simple post-purchase problem: after an order is delivered, return windows, pending refunds, warranty dates, and proof of purchase often disappear across emails, store accounts, and memory.

The product is designed around one question:

> What do I need to do today or this week after a purchase?

Rather than treating purchases as a passive archive, AfterBuy is intended to make the next useful action visible: return an item before its window closes, follow up on a refund, or keep the context needed for future support.

## Current status

AfterBuy is in active development. The published repository currently documents the product direction and implementation choices; the interactive slice is still being built.

This is intentional. The project does not claim accounts, receipt uploads, merchant integrations, notifications, or a finished consumer service.

## What the first slice is meant to prove

```text
add a purchase
  → calculate relevant dates
  → surface an urgent action
  → update its lifecycle state
  → keep the result understandable
```

The implementation is frontend-led: the interesting work is where date-based product rules, validation, lifecycle state, and responsive interface decisions meet.

## Editorial documentation

- [Product](docs/editorial/product.md) — problem, user, first slice, and boundaries.
- [Architecture](docs/editorial/architecture.md) — target technical shape and the rules that matter.
- [Design](docs/editorial/design.md) — interaction and visual direction.
- [Public preview](docs/editorial/public-preview.md) — landing, demo, and WIP communication rules.
- [Key decisions](docs/editorial/decisions.md) — the trade-offs behind the first implementation.

## Scope boundary

The initial product focuses on purchases, deadlines, lifecycle states, and urgent actions. Authentication, personal-document storage, OCR, inbox or merchant integrations, background jobs, and multi-user features are deliberately outside this stage.
