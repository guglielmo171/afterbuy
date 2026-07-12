# AfterBuy — Project Charter

**Status:** Draft 1.0  
**Project type:** Frontend-leaning product portfolio project  
**Repository path:** `docs/product/project-charter.md`

---

## 1. Product name

**AfterBuy**

AfterBuy is a consumer utility for managing everything that happens after a purchase: returns, refunds, warranties, receipts, invoices, manuals, support information and important post-purchase deadlines.

**Possible product claim:**  
**Never miss a return, refund or warranty deadline again.**

---

## 2. Product vision

AfterBuy helps people protect the value of what they buy.

The product vision is to turn the messy post-purchase experience into a clear, action-oriented personal dashboard. Instead of relying on scattered emails, paper receipts, screenshots, store accounts and memory, users can track what needs attention, what is still pending and what opportunities may be lost if they do not act in time.

AfterBuy is not just a product archive. Its core purpose is to help users avoid losing money, time or support rights after a purchase.

---

## 3. Problem statement

After buying something, users often lose control of the post-purchase lifecycle.

Common problems include:

- return windows expiring unnoticed;
- refunds remaining pending without follow-up;
- receipts, invoices or proof of purchase getting lost;
- warranty periods being forgotten until it is too late;
- product manuals and support links being hard to find when needed;
- purchases being tracked across emails, screenshots, store accounts and paper documents.

This creates a concrete economic problem: users lose money or useful rights because post-purchase information is fragmented and not actionable.

---

## 4. Target users

### Primary users

- Online shoppers who frequently buy from different stores.
- People who return products or monitor refunds.
- Families managing multiple purchases, warranties and receipts.
- Students and young professionals buying electronics, furniture, travel items or personal devices.
- Freelancers who need to keep receipts and invoices organized for work-related purchases.

### Secondary users

- Users who mostly shop offline but want a digital place to track receipts and warranties.
- People who buy higher-value products and want to avoid losing warranty or support rights.
- Users who want a lightweight alternative to spreadsheets, folders or generic note-taking apps.

---

## 5. Value proposition

AfterBuy gives users one simple place to understand what needs action after a purchase.

The value is based on three main benefits:

1. **Avoid losing money**  
   Users can see return deadlines, pending refunds and warranty expirations before they become missed opportunities.

2. **Reduce post-purchase chaos**  
   Receipts, invoices, support links, manuals, notes and lifecycle events are grouped around each purchase.

3. **Make next actions obvious**  
   The dashboard highlights urgent tasks such as returns due soon, refunds pending and warranties expiring.

The product should feel practical, calm and action-oriented: less like a database, more like a personal assistant for post-purchase decisions.

---

## 6. Portfolio objective

The goal of AfterBuy is to demonstrate the ability to design and build a credible micro-product, not a generic frontend demo.

From a portfolio perspective, the project should show:

- product thinking applied to a real everyday problem;
- UX decisions around urgency, prioritization and user actions;
- frontend architecture with clear feature boundaries;
- data modeling for purchases, returns, refunds, warranties and documents;
- date-based business logic and edge cases;
- form validation and user-friendly error handling;
- realistic mock data and API simulation;
- state management for filters, views, statuses and user flows;
- responsive, mobile-first interface design;
- testing strategy for business logic and critical user journeys;
- documentation quality suitable for a product-oriented engineering team.

The final repository should communicate maturity, structure and ownership: the project should be readable as a small product case study built by a frontend-leaning Software Engineer.

---

## 7. Positioning for Berlin/product companies

AfterBuy is positioned for product-oriented companies, scaleups and mature startups in Berlin and Europe.

The project is intentionally designed to show skills that matter in product engineering environments:

- translating a user problem into product scope;
- defining a focused MVP instead of overbuilding;
- handling real user workflows, not only isolated UI components;
- designing stateful interfaces with dates, statuses, filters and empty states;
- documenting trade-offs and architecture decisions;
- building with frontend quality while understanding backend/API implications;
- thinking in terms of user value, business logic and maintainability.

The positioning is frontend-leaning but not frontend-limited.

AfterBuy should present the developer as a Software Engineer with strong React/TypeScript/UX/frontend architecture skills, capable of reasoning across API contracts, data structures, validation, testing, documentation and product constraints.

---

## 8. MVP scope iniziale

The initial MVP should focus on the core post-purchase lifecycle.

### Core features

- Add a purchase with store, product name, price, purchase date and category.
- Automatically calculate return deadline and warranty expiration.
- Track return and refund status.
- Show urgent actions on the dashboard:
  - returns due soon;
  - pending refunds;
  - warranties expiring soon;
  - missing receipts.
- Display a purchase list with filters by status, store, category and urgency.
- Provide a purchase detail page or drawer with:
  - purchase summary;
  - return information;
  - refund status;
  - warranty status;
  - receipt/invoice mock reference;
  - manual/support link;
  - notes;
  - lifecycle timeline.
- Include an “Actions needed” view focused on what the user should do today or this week.
- Store data through local storage or a mock API with realistic data.
- Support responsive, mobile-first usage.

### Suggested purchase statuses

- `keep`
- `return_planned`
- `returned`
- `refund_pending`
- `refunded`
- `warranty_active`
- `warranty_expired`
- `closed`

### Suggested main screens

- Overview dashboard.
- Purchases list.
- Purchase detail.
- Add/edit purchase flow.
- Actions needed.

### Minimum test coverage

- Deadline calculation logic.
- Warranty expiration logic.
- Filtering and urgency classification.
- Rendering of key purchase states.
- One end-to-end flow: create purchase → view dashboard action → update status.

---

## 9. Non-obiettivi

The MVP should stay focused and avoid unnecessary complexity.

Out of scope for the first version:

- real authentication;
- real file upload and document storage;
- real email inbox parsing;
- real integrations with Amazon, Zalando, Apple, Google, PayPal or banking APIs;
- real refund tracking from merchants;
- OCR for receipts;
- push notifications;
- multi-user collaboration;
- native mobile app;
- complex analytics;
- legal, fiscal or consumer-rights advice;
- AI-based purchase classification;
- full backend production infrastructure.

These features may be documented as future roadmap items, but they should not distract from the first portfolio version.

---

## 10. Success criteria

AfterBuy can be considered successful as a portfolio project if it meets the following criteria.

### Product criteria

- The problem is immediately understandable to a non-technical person.
- The product has a clear identity: post-purchase management.
- The dashboard makes urgent actions obvious.
- The MVP feels like a useful micro-product, not a UI exercise.
- Empty states, edge cases and microcopy help users understand what to do.

### Engineering criteria

- The codebase is modular and easy to navigate.
- Features are separated by domain or product area.
- Business logic is not hidden inside UI components.
- Date calculations and status transitions are tested.
- Mock API or local persistence is realistic and documented.
- Forms include validation and useful error states.
- Loading, empty and error states are handled deliberately.

### Portfolio criteria

- README explains the problem, solution, architecture and trade-offs.
- Screenshots or demo flows show the product clearly.
- Documentation includes architecture decisions and testing strategy.
- The repository tells a coherent product story.
- The project supports positioning for frontend-leaning Software Engineer roles.

---

## 11. Technical positioning

AfterBuy should be built with a modern frontend stack that demonstrates product engineering quality without unnecessary overengineering.

### Recommended stack

- **React + TypeScript + Vite** for the application foundation.
- **React Hook Form + Zod** for forms and validation.
- **Zustand or Jotai** for UI and local product state.
- **TanStack Query** if using asynchronous mock APIs.
- **MSW** for realistic API mocking.
- **Vitest + Testing Library** for unit and component tests.
- **Playwright** for one or more critical end-to-end flows.
- **Tailwind CSS or CSS Modules** for a clean, custom and maintainable UI.

### Architectural direction

Suggested structure:

```txt
src/
  app/
    router/
    providers/
    layouts/
  features/
    dashboard/
    purchases/
    purchase-detail/
    actions-needed/
  entities/
    purchase/
    store/
    document/
  shared/
    ui/
    utils/
    hooks/
    validation/
  mocks/
    data/
    handlers/
```

### Engineering principles

- Keep product logic explicit and testable.
- Separate UI components from domain calculations.
- Treat dates, statuses and deadlines as core business logic.
- Use realistic mock data instead of placeholder content.
- Design API contracts even if the backend is mocked.
- Document decisions as if another engineer would join the project.

---

## 12. Documentation strategy

AfterBuy should be documented as a real product case study.

### Required documentation

- `README.md`  
  Product overview, problem, solution, screenshots, demo link, setup instructions and roadmap.

- `docs/product/project-charter.md`  
  Product vision, MVP scope, target users, success criteria and technical positioning.

- `docs/product/user-flows.md`  
  Key flows such as adding a purchase, checking urgent actions and updating refund status.

- `docs/product/data-model.md`  
  Main entities, fields, statuses and relationships.

- `docs/architecture/overview.md`  
  Application structure, state management, data fetching/mocking approach and feature boundaries.

- `docs/architecture/adr/`  
  Architecture Decision Records for important choices such as mock API strategy, state management, validation and routing.

- `docs/testing/testing-strategy.md`  
  Unit, component and end-to-end testing scope.

### Documentation tone

The documentation should be concise, structured and product-oriented. It should explain not only what was built, but why certain decisions were made and which trade-offs were accepted for the MVP.

---

## 13. Risks and constraints

### Product risks

- The product could look like a generic purchase tracker if the urgency/action layer is not strong enough.
- The scope could become too broad if receipts, warranties, refunds, manuals and support are all expanded equally.
- Too many statuses may confuse the user if not grouped into clear lifecycle stages.
- The project could lose product clarity if future integrations are presented as part of the MVP.

### Technical risks

- Date and deadline logic can become messy if not modeled clearly.
- Mock data may feel fake if it does not represent realistic purchase scenarios.
- State management may become overcomplicated for the MVP.
- UI components may become tightly coupled to domain logic if boundaries are not defined early.

### Portfolio risks

- The project may be perceived as a frontend demo if documentation, flows and edge cases are weak.
- The product may not stand out if screenshots only show tables and cards without a strong user story.
- The technical stack may appear generic unless architecture decisions are documented clearly.

### Constraints

- The first version should be buildable without a real backend.
- Sensitive personal documents must be mocked, not actually uploaded or stored.
- The MVP should remain small enough to finish and polish.
- The user experience should prioritize clarity over feature quantity.

---

## 14. Next steps

1. Define the main user flows.
2. Create the initial data model for purchases, returns, refunds, warranties and documents.
3. Draft the first wireframes for dashboard, purchase list, detail view and add-purchase flow.
4. Decide the frontend architecture and folder structure.
5. Create initial ADRs for:
   - frontend stack;
   - mock API strategy;
   - form validation;
   - state management;
   - testing scope.
6. Prepare realistic mock data with different purchase scenarios.
7. Build the first vertical slice:
   - purchase list;
   - add purchase form;
   - automatic deadlines;
   - dashboard urgent actions.
8. Add tests for deadline logic and filtering.
9. Polish responsive UI, empty states and microcopy.
10. Update README with screenshots, product explanation, architecture notes and roadmap.

The first implementation goal is not to build every feature, but to deliver one coherent product slice that clearly shows user value, product reasoning and frontend engineering quality.

## Technical positioning update

AfterBuy will be built as a lightweight full-stack product using Next.js, TypeScript, Prisma, Zod and a small backend/data layer.

The goal is not to become backend-heavy, but to show that the project is designed end-to-end: frontend, data model, validation, persistence, server-side logic, testing and documentation.