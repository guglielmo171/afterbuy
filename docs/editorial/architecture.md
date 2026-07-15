# AfterBuy — Architecture

## Target shape

AfterBuy is planned as a single Next.js application with TypeScript. The architecture stays intentionally small:

```text
routes and page composition
  → product features and view models
    → plain domain rules and validation
      → server queries or actions
        → repositories and persistence
```

The goal is not to showcase distributed systems. It is to give an action-oriented interface reliable boundaries for input, date-based rules, lifecycle changes, and stored state.

## Rules that matter

- **Product rules stay outside React.** Deadline calculation, urgency, and lifecycle derivation should be plain TypeScript functions with fixed-date tests.
- **The server validates writes.** Client validation improves feedback; server-side parsing remains the boundary before persistence.
- **Persistence is hidden behind a small repository layer.** UI components should not receive raw database models or call Prisma directly.
- **Feature code follows the user journey.** Dashboard, purchase list, detail, and form are product boundaries, not a flat collection of components.
- **Derived state is not casually stored.** Urgency should be calculated from dates and lifecycle state, so it stays current.

## Data model at a glance

`Purchase` is the centre of the model. It belongs to a store and may carry a return case, refund, warranty, document references, and a timeline of meaningful changes.

Money is represented in integer cents. Date-sensitive rules use explicit calendar inputs. Documents are references in the initial scope, not uploaded personal files.

## Testing focus

The first tests should protect the parts that make the product useful: deadline calculation, urgency classification, validation, lifecycle updates, and one end-to-end flow from purchase creation to a visible status change.
