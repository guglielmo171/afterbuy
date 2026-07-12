# AfterBuy — User Journey

**Status:** Draft 2.0  
**Project type:** Lightweight full-stack product portfolio project  
**Repository path:** `docs/product/user-journey.md`  
**Related documents:**
- `docs/product/project-charter.md`
- `docs/product/feasibility-study.md`
- `docs/product/mvp-scope.md`

---

## 1. Journey purpose

This document describes the main user journey for the AfterBuy MVP.

AfterBuy helps users manage what happens after a purchase: return windows, refunds, warranties, receipts, manuals, support links and deadlines.

The MVP journey is intentionally focused:

> add a purchase → persist it → calculate deadlines → surface urgent actions → update lifecycle status

The goal is to show a complete lightweight full-stack product flow without expanding into authentication, real uploads, OCR, external integrations or notification systems.

---

## 2. Primary user context

### User

A frequent online shopper who buys from different stores and wants to avoid missing return, refund or warranty deadlines.

### Situation

The user has recently bought a product and wants to keep track of:

- purchase information;
- return deadline;
- warranty expiration;
- receipt/manual/support references;
- refund status if a return happens.

### User goal

The user wants to know:

> “What do I need to act on before I lose money, time or support rights?”

### Product promise

AfterBuy turns fragmented post-purchase information into a clear action dashboard.

---

## 3. Main journey: create purchase and act on urgent deadline

### Journey summary

1. User opens the dashboard.
2. User sees current urgent actions.
3. User adds a new purchase.
4. App validates input.
5. Server persists the purchase.
6. App calculates return and warranty deadlines.
7. Dashboard updates with any new urgent actions.
8. User opens purchase detail.
9. User updates return/refund/warranty status.
10. Timeline records the lifecycle changes.

---

## 4. Step-by-step journey

### Step 1 — Open dashboard

#### User action

The user opens AfterBuy.

#### System response

The app loads the dashboard summary and urgent actions.

#### Data loaded

- dashboard summary;
- urgent actions;
- recent purchases;
- counts by status/urgency.

#### UI should show

- urgent actions section;
- summary cards;
- recent purchases;
- empty state if there are no purchases;
- loading state while data is fetched;
- error state if dashboard data fails to load.

#### Backend responsibility

- run `getDashboardSummary`;
- run `getUrgentActions`;
- calculate urgency server-side using shared business logic;
- return typed data to the UI.

---

### Step 2 — Review urgent actions

#### User action

The user scans the dashboard.

#### System response

The app highlights purchases that require attention.

Examples:

- “Return window closes in 3 days”
- “Refund pending for 12 days”
- “Warranty expires this month”
- “Receipt missing”

#### UI should show

- urgency badge;
- reason for action;
- deadline date;
- product and store;
- direct link to detail page;
- optional quick status action.

#### Business logic involved

- classify return deadline urgency;
- detect overdue deadlines;
- detect pending refunds;
- detect expiring warranties;
- detect missing receipt metadata.

---

### Step 3 — Add a purchase

#### User action

The user clicks “Add purchase” and fills in the form.

#### Required input

- product name;
- store;
- category;
- purchase date;
- price;
- return policy days;
- warranty duration months.

#### Optional input

- order number;
- manual URL;
- support URL;
- receipt/document reference;
- notes.

#### UI should show

- clear field labels;
- useful placeholders;
- inline validation messages;
- disabled submit button while submitting;
- form-level error if server mutation fails.

#### Validation rules

- product name is required;
- store is required;
- purchase date is required and valid;
- price must be greater than or equal to zero;
- return policy days must be greater than or equal to zero;
- warranty duration months must be greater than or equal to zero;
- manual/support links must be valid URLs if present.

#### Backend responsibility

- receive form payload through a Server Action;
- validate input again with Zod;
- normalize values;
- calculate return deadline;
- calculate warranty expiration;
- persist purchase and related records;
- create timeline events.

---

### Step 4 — Persist purchase

#### User action

The user submits the form.

#### System response

The app creates the purchase and redirects or navigates to the purchase detail.

#### Data persisted

- `Purchase`;
- `Store` or store reference;
- `ReturnCase`;
- `Refund`;
- `Warranty`;
- `PurchaseDocument` metadata if present;
- `TimelineEvent`.

#### Timeline events created

- purchase created;
- return deadline calculated;
- warranty expiration calculated;
- document reference added if present.

#### Success state

The user sees the saved purchase with calculated deadlines.

#### Error state

If persistence fails, the user remains on the form and sees a clear error message. User input should not be lost.

---

### Step 5 — View purchase detail

#### User action

The user opens the purchase detail page.

#### System response

The app displays the full lifecycle of the purchase.

#### UI should show

- purchase summary;
- store;
- price;
- purchase date;
- return deadline;
- warranty expiration;
- return/refund/warranty statuses;
- receipt/manual/support references;
- notes;
- timeline;
- available actions.

#### Backend responsibility

- run `getPurchaseDetail`;
- return purchase with related entities;
- derive display-ready status and urgency values.

---

### Step 6 — Update return status

#### User action

The user changes the return status, for example from `not_planned` to `return_planned`.

#### System response

The app updates the status, persists the change and adds a timeline event.

#### Server-side mutation

`updateReturnStatus`

#### Validation

The server checks:

- purchase exists;
- status is valid;
- transition is allowed or safely handled;
- required dates are valid if provided.

#### UI should show

- pending state while updating;
- success feedback after update;
- updated status badge;
- updated timeline event;
- updated dashboard/action state.

---

### Step 7 — Update refund status

#### User action

The user marks refund as pending or received.

#### System response

The app updates refund tracking.

#### Server-side mutation

`updateRefundStatus`

#### UI should show

- refund status badge;
- pending duration if refund is pending;
- warning if refund has been pending for too long;
- timeline event.

#### Business logic involved

- detect pending refund;
- classify refund action needed;
- remove urgent action when refund is received.

---

### Step 8 — Check warranty status

#### User action

The user checks warranty information on the detail page or from urgent actions.

#### System response

The app shows whether warranty is active, expiring soon, expired or unknown.

#### Business logic involved

- calculate expiration date;
- classify expiration urgency;
- derive warranty status.

#### UI should show

- warranty status;
- expiration date;
- warning if expiring soon;
- support link if available.

---

### Step 9 — Return to dashboard

#### User action

The user goes back to the dashboard.

#### System response

The dashboard reflects the updated purchase state.

Examples:

- if refund is received, it disappears from urgent actions;
- if return deadline is no longer relevant, the dashboard changes;
- if receipt is still missing, the action remains visible.

#### Backend responsibility

- re-run dashboard query;
- revalidate cached data if needed;
- return updated summary.

---

## 5. Secondary journeys

### 5.1 Filter purchases

#### User goal

Find purchases by status, store, category or urgency.

#### Flow

1. User opens purchase list.
2. User applies filters.
3. App validates filter/search params.
4. Server query returns matching purchases.
5. UI updates list.

#### Empty state

If no purchase matches filters:

> No purchases match these filters. Try changing status, store or urgency.

#### Technical note

Filter state can be kept in URL search params as a should-have, not a strict MVP blocker.

---

### 5.2 Edit purchase details

#### User goal

Correct purchase information or add missing references.

#### Flow

1. User opens purchase detail.
2. User clicks edit.
3. User updates form fields.
4. Client validates input.
5. Server validates input.
6. Data is persisted.
7. Timeline records relevant changes.

#### Examples

- add support URL;
- correct price;
- update warranty duration;
- mark receipt as available;
- add notes.

---

### 5.3 Resolve missing receipt

#### User goal

Mark receipt/proof-of-purchase as available.

#### Flow

1. Dashboard shows “Receipt missing”.
2. User opens detail.
3. User updates document metadata.
4. Server persists document status.
5. Timeline records document update.
6. Dashboard removes missing receipt action.

#### Constraint

The MVP does not upload or store real files. It only stores metadata/mock references.

---

### 5.4 Track returned item and refund

#### User goal

Follow the lifecycle after returning an item.

#### Flow

1. User marks return as planned.
2. User marks item as returned.
3. User marks refund as pending.
4. App surfaces refund as an urgent action if it remains pending.
5. User marks refund as received.
6. App closes or reduces the urgency of the purchase.

---

### 5.5 Check manual/support information

#### User goal

Find support or manual information for a product.

#### Flow

1. User opens purchase detail.
2. User checks support/manual section.
3. App shows available links or empty state.
4. User can add/edit mock support/manual reference.

#### Empty state

> No manual or support link saved yet.

---

## 6. Screen map

### Dashboard

Purpose:

- show what needs attention now.

Main elements:

- urgent action cards;
- summary cards;
- recent purchases;
- empty/error/loading states.

### Actions needed

Purpose:

- show all actionable purchases.

Main elements:

- action reason;
- urgency;
- deadline;
- status;
- direct link to detail.

### Purchase list

Purpose:

- browse and filter purchases.

Main elements:

- list/table/cards;
- filters;
- search;
- status badges;
- empty state.

### Add/edit purchase

Purpose:

- create or update purchase information.

Main elements:

- form;
- validation messages;
- submit pending state;
- server error state.

### Purchase detail

Purpose:

- understand and update a purchase lifecycle.

Main elements:

- summary;
- deadline cards;
- status sections;
- document/support references;
- timeline;
- lifecycle actions.

---

## 7. Critical product moments

### Moment 1 — User sees value immediately

The dashboard should quickly show why AfterBuy matters.

Seed data should include urgent actions so a reviewer immediately understands the product.

### Moment 2 — Deadlines are automatic

When the user creates a purchase, AfterBuy should calculate return deadline and warranty expiration automatically.

This is the main business logic signal.

### Moment 3 — Actions change the dashboard

When a user updates a status, the dashboard should change accordingly.

This demonstrates product state, persistence and business rules working together.

### Moment 4 — Timeline explains lifecycle

The timeline should make the purchase history readable and show that mutations have product meaning.

---

## 8. Edge cases in the journey

### During creation

- user enters invalid price;
- user enters future purchase date;
- user enters invalid URL;
- user omits required field;
- server rejects data after client validation;
- duplicate product name exists;
- store is new or unknown.

### During deadline calculation

- return policy is 0 days;
- warranty duration is 0 months;
- purchase date is near month end;
- deadline is already expired;
- warranty expiration is unknown.

### During status updates

- refund is marked received without being pending first;
- return is planned after return deadline;
- return is closed while refund is still pending;
- warranty expires during an active refund flow;
- user submits the same action twice.

### During filtering

- selected filters return no results;
- filters include invalid search params;
- store/category options are empty;
- urgency changes after current date changes.

### During loading/failure

- dashboard query fails;
- purchase detail fails to load;
- mutation fails after submit;
- database seed has not been run;
- network is slow during update.

---

## 9. Empty states

### No purchases

Message:

> No purchases yet. Add your first purchase to track return windows, refunds and warranties.

Primary action:

- Add purchase

### No urgent actions

Message:

> No urgent actions right now. Your active purchases are under control.

Primary action:

- View purchases

### No filter results

Message:

> No purchases match these filters.

Primary action:

- Clear filters

### No timeline events

Message:

> No lifecycle events yet. Updates will appear here as this purchase changes.

### No documents

Message:

> No receipt, invoice or manual reference saved yet.

Primary action:

- Add document reference

---

## 10. Error states

### Dashboard load error

Message:

> We could not load your dashboard. Try again in a moment.

Action:

- Retry

### Purchase list error

Message:

> We could not load your purchases.

Action:

- Retry

### Purchase detail error

Message:

> This purchase could not be loaded.

Action:

- Back to purchases

### Form validation error

Message:

> Some fields need your attention before saving.

Action:

- Highlight invalid fields

### Server mutation error

Message:

> We could not save this change. Your previous data is still safe.

Action:

- Retry or edit input

### Invalid route/search params

Message:

> Some filters were invalid and have been reset.

Action:

- Show safe default list

---

## 11. Loading states

### Dashboard loading

Use skeleton cards for:

- summary;
- urgent actions;
- recent purchases.

### Purchase list loading

Use skeleton rows/cards.

### Purchase detail loading

Use skeleton layout matching:

- summary;
- deadline cards;
- timeline.

### Form submission loading

Use:

- disabled submit button;
- pending label;
- no duplicate submission.

### Status update loading

Use:

- inline pending state on the specific action;
- avoid blocking the full page unless necessary.

---

## 12. Acceptance criteria for primary journey

The primary journey is complete when:

1. User can open the dashboard.
2. Dashboard loads seeded urgent actions.
3. User can create a purchase through a validated form.
4. Purchase is persisted through Prisma.
5. Return deadline is calculated automatically.
6. Warranty expiration is calculated automatically.
7. Purchase appears in the purchase list.
8. Purchase detail shows related return/refund/warranty/document/timeline data.
9. User can update return/refund/warranty status.
10. Timeline records the lifecycle update.
11. Dashboard urgent actions update after status change.
12. Empty, error and loading states exist for the main screens.
13. At least one Playwright test covers the journey.

---

## 13. Backend touchpoints in the journey

The MVP journey should visibly exercise the backend without making it the main product.

Required backend touchpoints:

- `getDashboardSummary`;
- `getUrgentActions`;
- `getPurchaseList`;
- `getPurchaseDetail`;
- `createPurchase`;
- `updatePurchase`;
- `updateReturnStatus`;
- `updateRefundStatus`;
- `updateWarranty`;
- `updateDocumentMetadata`.

Each touchpoint should be:

- typed;
- validated where input exists;
- backed by Prisma;
- documented enough for a reviewer to understand the contract.

---

## 14. Testable journey map

### Unit tests

Cover:

- deadline calculation;
- warranty expiration;
- urgency classification;
- refund action detection;
- receipt missing detection.

### Validation tests

Cover:

- create purchase payload;
- update purchase payload;
- status update payload;
- invalid URL/date/price cases.

### Component tests

Cover:

- form validation messages;
- empty states;
- badges;
- filters.

### E2E test

Core flow:

1. visit dashboard;
2. create purchase;
3. verify calculated deadline;
4. verify purchase appears in list;
5. open detail;
6. update status;
7. verify dashboard updates.

---

## 15. Final journey boundary

The MVP user journey should prove that AfterBuy is a useful micro-product:

> The user adds a purchase, AfterBuy calculates the important dates, persists the lifecycle, highlights what needs action and keeps the user oriented through clear status and timeline updates.

The journey should not include:

- account creation;
- login;
- real file upload;
- OCR;
- merchant integrations;
- email parsing;
- push notifications;
- background reminders;
- payment flows.

Those are future roadmap ideas, not part of the MVP journey.
