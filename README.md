# AfterBuy

> Active product build · Work in progress

AfterBuy explores a simple post-purchase problem: after an order is delivered, return windows, pending refunds, warranty dates, and proof of purchase often disappear across emails, store accounts, and memory.

The product is designed around one question:

> What do I need to do today or this week after a purchase?

Rather than treating purchases as a passive archive, AfterBuy is intended to make the next useful action visible: return an item before its window closes, follow up on a refund, or keep the context needed for future support.

[Public Preview](https://afterbuy.vercel.app)

The public deployment is a product preview, not a finished application.

## Current implementation

What is already present in the repository today:

- public product landing and preview shell;
- product, architecture, design and decision documentation;
- initial Prisma domain/data model for purchases, stores, return cases, refunds, warranties, documents and timeline events;
- database migration and seeded example data;
- application scaffolding for the product area.

The interactive core workflow is still being built. The repository intentionally does not present the current preview as a finished end-to-end product.

## Currently building

The first useful vertical slice is focused on turning the documented product model into an executable workflow:

```text
add a purchase
  → validate the input
  → derive the relevant dates
  → surface the most urgent next action
  → persist the purchase and lifecycle state
  → update that lifecycle state from the product UI
```

The implementation direction is frontend-led: the interesting work is where date-based domain rules, validation, lifecycle state, persistence boundaries and responsive product UI meet.

The intended testing focus is the behaviour that carries product risk — especially date/deadline rules, validation, lifecycle updates and the critical user journey — rather than broad coverage for its own sake.

## Product and architecture direction

The project is deliberately scoped around a small number of engineering concerns:

- keep date and urgency rules outside React as plain TypeScript domain logic;
- validate writes at the server boundary, with client-side validation used for UX;
- keep persistence behind a small repository/data-access boundary rather than exposing Prisma models directly to the UI;
- organise feature code around the user journey instead of framework abstractions;
- derive urgency from dates and lifecycle state instead of casually storing duplicate state.

These are target implementation rules for the product build. They should not be read as claims that every layer is already complete.

## Editorial documentation

- [Product](docs/editorial/product.md) — problem, user, first slice, and boundaries.
- [Architecture](docs/editorial/architecture.md) — target technical shape and the rules that matter.
- [Design](docs/editorial/design.md) — interaction and visual direction.
- [Public preview](docs/editorial/public-preview.md) — landing, preview, and WIP communication rules.
- [Key decisions](docs/editorial/decisions.md) — the trade-offs behind the first implementation.

## Deliberate scope boundary

The initial product focuses on:

- purchases;
- deadlines and urgency;
- lifecycle state;
- next useful actions.

Deliberately outside this stage:

- authentication and multi-user accounts;
- personal document uploads/storage;
- OCR;
- inbox or merchant integrations;
- notifications/background jobs;
- a separate backend or distributed architecture.

Those capabilities may be valid future product problems, but they are not required to prove the first workflow.