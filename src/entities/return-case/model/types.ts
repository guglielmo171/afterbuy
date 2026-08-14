/** Persisted return lifecycle statuses (product contract §5). */
export const PERSISTED_RETURN_STATUSES = [
  "not_planned",
  "return_planned",
  "returned",
  "closed",
] as const;

export type ReturnStatus = (typeof PERSISTED_RETURN_STATUSES)[number];

/** Derived urgency for a deadline (never persisted). */
export type UrgencyLevel = "overdue" | "due_soon" | "none";

/**
 * Slice 1 ActionReason values only.
 * Refund / warranty reasons stay in the contract for later UI.
 */
export const ActionReason = {
  return_deadline_overdue: "return_deadline_overdue",
  return_deadline_due_soon: "return_deadline_due_soon",
} as const;

export type ActionReason =
  (typeof ActionReason)[keyof typeof ActionReason];

export const DUE_SOON_CALENDAR_DAYS = 7;
