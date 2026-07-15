# AfterBuy — Key Decisions

## Keep the scope narrow

The first product loop is purchase → relevant date → urgent action → lifecycle update. Accounts, uploads, integrations, and notifications are deferred because they create separate privacy, security, and operational problems before the core loop is proven.

## Keep the frontend at the centre

The product is planned as a single Next.js application rather than a separate frontend and backend. This keeps the implementation focused on interface quality while still allowing explicit server-side validation, persistence, and product rules.

## Treat dates as product logic

Return and warranty dates affect what a user sees and does. Their calculation, urgency classification, and lifecycle rules should be plain TypeScript with fixed-date tests rather than logic scattered through components.

## Prefer explicit boundaries over ceremony

Features own user flows; server code owns writes and queries; repositories own persistence. These boundaries are sufficient for the first slice and avoid a monorepo, generic service layer, or API built only for appearance.

## Communicate work in progress plainly

The public project should state what is currently available, what uses example data, and what is still being built. It should not imply real document storage, integrations, or product maturity that do not exist.
