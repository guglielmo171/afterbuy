# AfterBuy — MVP Scope

**Status:** Draft 2.0  
**Project type:** Lightweight full-stack product portfolio project  
**Repository path:** `docs/product/mvp-scope.md`  
**Related documents:**
- `docs/product/project-charter.md`
- `docs/product/feasibility-study.md`
- `docs/product/user-journey.md`

---

## 1. MVP statement

AfterBuy MVP is a focused post-purchase management product that helps users understand which purchases need attention now.

The MVP is not a generic purchase archive and not a backend-heavy platform. It is a polished lightweight full-stack vertical slice built with **Next.js, TypeScript, Prisma and Zod**, centered on:

> **purchases + deadlines + statuses + urgent actions**

The product must allow a user to add and manage purchases, automatically calculate return and warranty deadlines, track return/refund/warranty states, persist data, and surface urgent actions through a clear dashboard.

From an engineering perspective, the MVP must demonstrate:

- frontend architecture and UX states;
- realistic forms and validation;
- a small but real data model;
- persistence through Prisma;
- server-side mutations;
- business logic outside React components;
- realistic seed data;
- tests for critical domain logic and one end-to-end product flow.

The backend exists to support the product story. It should remain intentionally small, readable and easy to explain.

---

## 2. MVP scope principles

The MVP should follow these principles:

1. **Action over archive**  
   The product should help users decide what to do next, not only store purchase records.

2. **One coherent vertical slice**  
   It is better to finish one complete product flow than to partially implement many features.

3. **Backend as support layer**  
   The backend should handle persistence, validation, mutations, queries and product logic. It should not become a separate platform.

4. **Business logic must be testable**  
   Date calculations, urgency classification and lifecycle rules should live in pure TypeScript functions.

5. **Realistic but safe data**  
   The MVP should use realistic seed data without storing real receipts, invoices or sensitive personal documents.

6. **Portfolio readability**  
   A reviewer should understand the product, architecture and trade-offs quickly from the repository.

---

## 3. Must-have frontend

### 3.1 Dashboard with urgent actions

The dashboard is the main product surface.

It must show:

- returns due soon;
- overdue return windows;
- refunds still pending;
- warranties expiring soon;
- missing receipt/proof-of-purchase indicators;
- a compact summary of total purchases and active issues.

The dashboard should answer:

> “What should I check today or this week?”

### 3.2 Actions needed view

A dedicated view for actionable items.

It should include:

- all purchases requiring attention;
- reason for action;
- urgency badge;
- deadline date;
- direct link to purchase detail;
- quick status update where appropriate.

Example actions:

- “Return window closes in 3 days”
- “Refund pending for 12 days”
- “Warranty expires this month”
- “Receipt missing”

### 3.3 Purchase list

The purchase list must show a searchable/filterable overview of purchases.

Each row/card should include:

- product name;
- store;
- category;
- purchase date;
- price;
- return status;
- refund status;
- warranty status;
- urgency indicator.

Required filters:

- status;
- store;
- category;
- urgency.

Optional search:

- product name;
- store name.

### 3.4 Add/edit purchase form

The form must allow creating and editing a purchase.

Required fields:

- product name;
- store;
- category;
- purchase date;
- price;
- return policy days;
- warranty duration months.

Optional fields:

- order number;
- manual URL;
- support URL;
- notes;
- receipt/document reference;
- document type;
- document availability.

The form must use:

- React Hook Form for form handling;
- Zod for schema validation;
- user-friendly validation messages;
- disabled/pending state during submission;
- server-side validation before writing to the database.

### 3.5 Purchase detail page

The purchase detail page must show:

- purchase summary;
- store information;
- return deadline;
- warranty expiration;
- return/refund/warranty statuses;
- receipt/manual/support information;
- notes;
- lifecycle timeline;
- actions that can update statuses.

The detail page should make the lifecycle readable, not just display raw fields.

### 3.6 Timeline post-acquisto

Each purchase should show a timeline of important events.

Examples:

- purchase created;
- return deadline calculated;
- return planned;
- item returned;
- refund marked as pending;
- refund received;
- warranty expiration approaching;
- note added.

The timeline can be system-generated from mutations and seed data. It does not need free-form complex activity tracking in the MVP.

### 3.7 Status and deadline UI

The UI must include reusable status components:

- `StatusBadge`;
- `DeadlineBadge`;
- `UrgencyBadge`;
- `EmptyState`;
- `ErrorState`;
- `LoadingState`.

Statuses should be understandable to non-technical users.

### 3.8 Responsive design

The MVP must work well on:

- mobile;
- tablet;
- desktop.

Mobile should prioritize:

- urgent actions;
- purchase cards;
- simple filters;
- direct actions.

Desktop can use more structured layouts such as tables and side panels.

---

## 4. Must-have backend

### 4.1 Persistence with Prisma

The MVP must persist data through Prisma.

Recommended setup:

- SQLite for local development and tests;
- PostgreSQL-compatible database only if the deployed demo needs persistent shared data;
- Prisma seed script for realistic demo data.

Persistence must cover:

- purchases;
- stores;
- return cases;
- refunds;
- warranties;
- mock document metadata;
- timeline events.

No real document upload is required.

---

### 4.2 MVP data model

The MVP data model should be small but realistic.

#### `Store`

Represents the merchant or retailer.

Suggested fields:

- `id`
- `name`
- `websiteUrl`
- `supportUrl`
- `defaultReturnPolicyDays`
- `createdAt`
- `updatedAt`

Relationships:

- one store has many purchases.

#### `Purchase`

Represents a user purchase.

Suggested fields:

- `id`
- `productName`
- `category`
- `priceCents`
- `currency`
- `purchaseDate`
- `orderNumber`
- `notes`
- `storeId`
- `createdAt`
- `updatedAt`

Relationships:

- belongs to one store;
- has one return case;
- has one refund record;
- has one warranty record;
- has many purchase documents;
- has many timeline events.

#### `ReturnCase`

Represents return tracking for a purchase.

Suggested fields:

- `id`
- `purchaseId`
- `returnPolicyDays`
- `returnDeadline`
- `status`
- `returnedAt`
- `createdAt`
- `updatedAt`

Suggested statuses:

- `not_planned`
- `return_planned`
- `returned`
- `return_window_expired`
- `closed`

#### `Refund`

Represents refund tracking.

Suggested fields:

- `id`
- `purchaseId`
- `status`
- `expectedRefundCents`
- `refundRequestedAt`
- `refundedAt`
- `createdAt`
- `updatedAt`

Suggested statuses:

- `not_expected`
- `pending`
- `received`
- `issue`

#### `Warranty`

Represents product warranty.

Suggested fields:

- `id`
- `purchaseId`
- `durationMonths`
- `expiresAt`
- `status`
- `createdAt`
- `updatedAt`

Suggested statuses:

- `active`
- `expiring_soon`
- `expired`
- `unknown`

#### `PurchaseDocument`

Represents metadata for receipts, invoices or manual references.

Suggested fields:

- `id`
- `purchaseId`
- `type`
- `label`
- `isAvailable`
- `referenceUrl`
- `createdAt`
- `updatedAt`

Suggested types:

- `receipt`
- `invoice`
- `manual`
- `support_link`
- `other`

Important constraint:

- documents are metadata/mock references only;
- no real file upload or storage in MVP.

#### `TimelineEvent`

Represents a lifecycle event for a purchase.

Suggested fields:

- `id`
- `purchaseId`
- `type`
- `title`
- `description`
- `occurredAt`
- `createdAt`

Suggested event types:

- `purchase_created`
- `deadline_calculated`
- `return_planned`
- `item_returned`
- `refund_pending`
- `refund_received`
- `warranty_updated`
- `document_updated`
- `note_added`

---

### 4.3 Zod validation

The MVP must use Zod schemas at the boundaries.

Required schemas:

- `createPurchaseSchema`;
- `updatePurchaseSchema`;
- `updateReturnStatusSchema`;
- `updateRefundStatusSchema`;
- `updateWarrantySchema`;
- `purchaseFiltersSchema`;
- `documentMetadataSchema`.

Validation should cover:

- required fields;
- valid dates;
- price greater than or equal to zero;
- valid currency;
- valid URL format for manual/support links;
- valid status values;
- return policy days greater than or equal to zero;
- warranty duration months greater than or equal to zero;
- purchase date not unreasonably far in the future;
- server-side validation before database writes.

Client-side validation improves UX. Server-side validation protects the mutation boundary.

---

### 4.4 Server-side mutations

Use Server Actions for internal product mutations.

Required mutations:

- create purchase;
- update purchase;
- update return status;
- update refund status;
- update warranty information;
- update document metadata;
- add timeline note or system event;
- archive/delete purchase only if it does not add unnecessary complexity.

Each mutation should:

- validate input with Zod;
- call pure business logic where needed;
- persist through Prisma;
- create timeline events when relevant;
- return a typed success/error result;
- trigger UI refresh/revalidation where needed.

---

### 4.5 Server-side queries

Create explicit server-side query functions.

Required queries:

- get dashboard summary;
- get urgent actions;
- get purchase list with filters;
- get purchase detail;
- get stores for filters/forms;
- get categories for filters/forms.

Queries should keep UI components clean and avoid scattering Prisma calls across the frontend.

---

### 4.6 Business logic

Business logic must live outside React components and outside direct Prisma calls where possible.

Required pure functions:

- `calculateReturnDeadline(purchaseDate, returnPolicyDays)`;
- `calculateWarrantyExpiration(purchaseDate, durationMonths)`;
- `classifyDeadlineUrgency(deadline, currentDate)`;
- `derivePurchaseLifecycleStatus(purchase)`;
- `isRefundActionNeeded(refund, currentDate)`;
- `isReceiptMissing(documents)`;
- `createTimelineEventFromMutation(mutationType, payload)`;
- `normalizePurchaseInput(input)` if useful.

Urgency levels:

- `overdue`;
- `due_soon`;
- `upcoming`;
- `safe`;
- `unknown`.

Suggested urgency thresholds:

- overdue: deadline before current date;
- due soon: deadline within 7 days;
- upcoming: deadline within 30 days;
- safe: deadline after 30 days;
- unknown: missing or invalid deadline.

---

### 4.7 Seed data realistici

The MVP must include realistic seed data that shows different product states.

Seed scenarios should include:

1. Electronics purchase with warranty active.
2. Shoes/clothing purchase with return deadline due soon.
3. Returned product with refund pending.
4. Refunded product with closed lifecycle.
5. High-value item with warranty expiring soon.
6. Purchase missing receipt.
7. Purchase with manual/support link.
8. Expired return window.
9. Offline purchase with minimal store data.
10. Older purchase with expired warranty.

Seed data should make screenshots and demo flows understandable without manual setup.

---

### 4.8 Backend tests

Minimum backend/domain test coverage:

- return deadline calculation;
- warranty expiration calculation;
- urgency classification;
- refund action detection;
- receipt missing detection;
- Zod validation for create/update purchase;
- status update validation;
- repository/query behavior where feasible.

The goal is not exhaustive backend testing. The goal is to show that business-critical logic is protected.

---

## 5. Should-have

Should-have items improve the product but are not mandatory for the first working vertical slice.

- Search by product/store name.
- Archive purchase instead of hard delete.
- Filter state reflected in URL search params.
- Sort by urgency, purchase date or price.
- Optimistic UI for simple status updates.
- More polished timeline grouping.
- Clear demo reset/seed instructions.
- Basic route handler for a health/demo endpoint.
- Better error boundaries for failed server actions.
- README screenshots generated from realistic seeded states.
- Lightweight accessibility pass for forms, focus states and labels.
- Component tests for form validation and badge rendering.
- One Playwright flow covering add purchase and update status.

---

## 6. Could-have

Could-have items belong to a later polish pass or roadmap.

- CSV export.
- PDF summary export.
- Calendar reminder mock.
- Email reminder mock.
- Manual upload placeholder UI.
- Receipt upload placeholder UI without real storage.
- Multi-step onboarding.
- Demo mode toggle.
- Basic analytics cards.
- More advanced category management.
- Merchant presets for return policies.
- Public API-style route handlers for selected reads.
- Dark mode.
- More advanced responsive table/card switching.
- Storybook or component playground.

---

## 7. Non-goals

The MVP must avoid features that would turn AfterBuy into a backend-heavy or integration-heavy product.

Explicitly out of scope:

- real authentication;
- real user accounts;
- role-based authorization;
- multi-tenant architecture;
- real file uploads;
- cloud document storage;
- OCR for receipts;
- invoice parsing;
- Gmail/Outlook imports;
- Amazon/Zalando/Apple/PayPal integrations;
- bank or card integrations;
- real refund tracking from merchants;
- push notifications;
- background jobs;
- queues;
- cron-based reminders;
- mobile app;
- browser extension;
- admin dashboard;
- payment/subscription logic;
- complex analytics;
- legal/fiscal advice;
- AI-based purchase classification;
- microservices;
- separate backend service;
- monorepo setup for MVP;
- production-grade observability.

These can be mentioned in a roadmap, but must not be built in the MVP.

---

## 8. Edge cases

### Date and deadline edge cases

- purchase date is today;
- purchase date is in the future;
- return policy is 0 days;
- warranty duration is 0 months;
- leap year and month-end date calculations;
- return deadline already expired;
- warranty already expired;
- missing return policy;
- missing warranty duration;
- timezone assumptions for calendar dates.

### Status edge cases

- refund marked as received without pending state;
- returned item without refund expected;
- return planned after return deadline;
- return status closed while refund is still pending;
- warranty expired while return/refund flow is still active;
- document missing while purchase is otherwise complete.

### Data edge cases

- store has no support URL;
- manual URL is invalid;
- receipt metadata exists but is marked unavailable;
- duplicate product names;
- very high or very low price;
- deleted/archived purchase still referenced by timeline events;
- empty purchase list.

### UI edge cases

- dashboard has no urgent actions;
- all filters return no results;
- server action fails;
- database query fails;
- validation errors from server differ from client-side expectations;
- slow network during mutation;
- user submits form twice.

---

## 9. Empty, error and loading states

### Empty states

Required empty states:

- no purchases yet;
- no urgent actions;
- no results for selected filters;
- no timeline events;
- no documents linked;
- no warranty information;
- no refund expected.

Good empty states should include:

- a short explanation;
- one clear next action;
- calm, practical microcopy.

Example:

> No urgent actions right now. Your active purchases are under control.

### Error states

Required error states:

- failed to load dashboard;
- failed to load purchase list;
- failed to load purchase detail;
- failed to create purchase;
- failed to update status;
- validation failed on server;
- invalid URL/date/price input.

Error states should:

- explain what happened in plain language;
- avoid exposing raw technical errors;
- offer retry or correction where possible;
- preserve user input when form submission fails.

### Loading states

Required loading states:

- dashboard summary loading;
- purchase list loading;
- purchase detail loading;
- form submission pending;
- status update pending;
- filter transition pending if needed.

Loading states should avoid layout jumps and should make the app feel responsive.

---

## 10. Data requirements

### Required entities

The MVP requires:

- `Store`;
- `Purchase`;
- `ReturnCase`;
- `Refund`;
- `Warranty`;
- `PurchaseDocument`;
- `TimelineEvent`.

### Required enums

The MVP should define enums for:

- purchase category;
- return status;
- refund status;
- warranty status;
- document type;
- timeline event type;
- urgency level;
- currency.

### Required derived values

The app should derive:

- return deadline;
- warranty expiration;
- urgency level;
- action-needed reason;
- lifecycle status;
- missing receipt flag;
- refund pending duration;
- warranty remaining time.

### Date assumptions

For MVP simplicity:

- dates are treated as calendar dates, not precise times;
- deadlines are calculated in days or months;
- urgency is calculated relative to the current date;
- timezone behavior should be documented;
- tests should use fixed dates to avoid flaky results.

### Persistence assumptions

For MVP simplicity:

- local development uses SQLite;
- Prisma models are the source of truth for persisted data;
- seed data is used for demo and screenshots;
- real user documents are not stored;
- document fields are metadata/mock references only.

---

## 11. Minimum test scope

### Unit tests

Required:

- deadline calculation;
- warranty expiration;
- urgency classification;
- lifecycle status derivation;
- refund action detection;
- receipt missing detection.

### Validation tests

Required:

- create purchase schema;
- update purchase schema;
- invalid dates;
- invalid URLs;
- negative price;
- invalid statuses.

### Component tests

Recommended:

- purchase form validation;
- status badge rendering;
- deadline badge rendering;
- empty states;
- filter behavior.

### E2E test

Required minimum Playwright flow:

1. open dashboard;
2. create a purchase;
3. confirm return deadline is calculated;
4. confirm purchase appears in the list;
5. confirm urgent action appears when deadline is near;
6. update return/refund status;
7. confirm dashboard changes.

---

## 12. Criteria for “MVP ready for GitHub”

The MVP is ready for GitHub when the repository communicates a complete, polished and credible product slice.

### Product readiness

- The product problem is clear from the README.
- The dashboard immediately communicates urgent actions.
- A user can create, view, filter and update purchases.
- Return, refund and warranty states are understandable.
- Empty states and microcopy make the product feel intentional.
- Seed data demonstrates realistic post-purchase scenarios.

### Frontend readiness

- Main screens are implemented:
  - dashboard;
  - actions needed;
  - purchase list;
  - add/edit purchase form;
  - purchase detail.
- UI is responsive.
- Forms show useful validation errors.
- Loading, empty and error states are handled.
- Components are reusable and not tightly coupled to Prisma.

### Backend readiness

- Prisma schema exists and matches the MVP data model.
- Database can be migrated locally.
- Seed script creates realistic demo data.
- Server Actions implement required mutations.
- Server-side queries support dashboard/list/detail.
- Zod validates inputs before writes.
- Business logic is not hidden in React components.

### Testing readiness

- Unit tests cover deadline and urgency logic.
- Validation tests cover the main schemas.
- At least one critical E2E flow passes.
- Test commands are documented in the README.

### Documentation readiness

- README includes:
  - product overview;
  - screenshots or demo flow;
  - stack;
  - setup instructions;
  - test commands;
  - architecture notes;
  - roadmap/non-goals.
- Product docs include:
  - project charter;
  - feasibility study;
  - MVP scope;
  - user journey;
  - data model/API design;
  - ADRs.
- Trade-offs are explicit:
  - why Next.js full-stack;
  - why Prisma;
  - why Zod;
  - why no separate backend;
  - why no auth/uploads/integrations in MVP.

### Portfolio readiness

- The repository looks like a micro-product, not a coding exercise.
- The project supports a frontend-leaning Software Engineer positioning.
- The code demonstrates product thinking, frontend architecture, validation, persistence, domain logic and testing.
- The MVP can be explained in 2–3 minutes during a technical interview.

---

## 13. Final MVP boundary

Build this:

> A polished post-purchase dashboard where users can persist purchases, calculate deadlines, track return/refund/warranty states and act before value is lost.

Do not build this:

> A full backend platform with authentication, uploads, OCR, integrations, background jobs and production infrastructure.

The MVP is complete when AfterBuy feels useful, focused and technically credible without exceeding the lightweight full-stack boundary.
