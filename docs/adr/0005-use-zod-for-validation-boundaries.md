# ADR-0005: Use Zod at Validation Boundaries

- **Status:** Accepted
- **Decision date:** 2026-07-12

## Context

AfterBuy accepts user-controlled purchase data, status changes, document metadata and filter/search parameters. Client-side validation is necessary for useful form feedback, but it cannot be trusted as the write boundary. Duplicated client and server rules would drift and make the behavior difficult to test.

The architecture needs explicit runtime validation because TypeScript types disappear at runtime and external inputs such as `FormData`, URL search parameters and Server Action payloads are not inherently safe.

## Decision

AfterBuy will use **Zod schemas as the runtime validation boundary for forms, Server Actions and validated query parameters**.

Canonical schemas will live in `shared/validation`. React Hook Form may consume the same schemas for client feedback, while Server Actions must parse again before any persistence or domain orchestration. Query filters and URL search parameters will be parsed before repository execution. Invalid server input will return typed field errors or safe application errors rather than raw exceptions.

Required schemas include create/update purchase, return/refund/warranty status updates, document metadata and purchase filters. Input normalization may occur after successful parsing, but validation and normalization must remain distinct concerns where that improves clarity.

## Alternatives considered

### TypeScript types only

Rejected because compile-time types do not validate runtime input.

### Hand-written validation in components and actions

Rejected because rules would be duplicated, inconsistent and harder to test.

### HTML validation only

Rejected because browser constraints improve UX but do not protect server writes or represent cross-field rules.

### A different schema library

Libraries such as Valibot or Yup could work, but Zod was selected for ecosystem familiarity, TypeScript inference and direct integration with the chosen form stack.

### Database constraints as the only protection

Rejected because database failures are too late and do not produce useful field-level feedback.

## Consequences

### Positive

- Client and server can share the same validation contract.
- Runtime input is checked before domain logic and persistence.
- Field errors can be typed and presented consistently.
- Validation rules are easy to unit test.
- API/action contracts become visible even when using Server Actions.

### Negative

- Schemas add runtime parsing and maintenance work.
- UI-specific coercion may require mappers around `FormData` values.
- Shared schemas can become overly broad if create, update and partial inputs are not separated carefully.
- Database invariants are still required for uniqueness and relational integrity.

## Trade-offs

The project accepts repeated validation at client and server execution points to gain both UX quality and trust at the write boundary. Schema reuse does not mean every UI field and persistence model must share one oversized shape.

## Portfolio value

This decision demonstrates awareness of runtime trust boundaries, typed error design and the difference between TypeScript safety and input validation. It also makes Server Action contracts reviewable and testable.

## Related documents

- `docs/product/mvp-scope.md`
- `docs/product/user-journey.md`
- `docs/architecture/frontend.md`
- `docs/architecture/backend.md`
- `docs/architecture/data-model.md`
- `docs/architecture/api-design.md`
- `docs/architecture/testing.md`
- `docs/adr/0007-use-server-actions-and-selective-route-handlers.md`
