import {
  type CalendarDate,
  addCalendarDays,
} from "@/shared/lib/calendar-date";

/**
 * Return deadline = purchaseDate + returnPolicyDays calendar days.
 * N = 0 → same calendar day.
 */
export function calculateReturnDeadline(
  purchaseDate: CalendarDate,
  returnPolicyDays: number,
): CalendarDate {
  if (!Number.isInteger(returnPolicyDays) || returnPolicyDays < 0) {
    throw new RangeError(
      `returnPolicyDays must be a non-negative integer: ${returnPolicyDays}`,
    );
  }

  return addCalendarDays(purchaseDate, returnPolicyDays);
}
