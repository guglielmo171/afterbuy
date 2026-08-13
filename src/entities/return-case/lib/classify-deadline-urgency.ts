import {
  type CalendarDate,
  differenceInCalendarDays,
} from "@/shared/lib/calendar-date";
import {
  ActionReason,
  DUE_SOON_CALENDAR_DAYS,
  type ReturnStatus,
  type UrgencyLevel,
} from "@/entities/return-case/model/types";

function isOpenReturnStatus(status: ReturnStatus): boolean {
  return status !== "returned" && status !== "closed";
}

/**
 * Classify return-deadline urgency for the action queue.
 * overdue: deadline < today and status not returned/closed
 * due_soon: within 7 calendar days, not overdue, same open statuses
 */
export function classifyDeadlineUrgency(
  deadline: CalendarDate,
  currentDate: CalendarDate,
  returnStatus: ReturnStatus,
): UrgencyLevel {
  if (!isOpenReturnStatus(returnStatus)) {
    return "none";
  }

  const daysUntilDeadline = differenceInCalendarDays(deadline, currentDate);

  if (daysUntilDeadline < 0) {
    return "overdue";
  }

  if (daysUntilDeadline <= DUE_SOON_CALENDAR_DAYS) {
    return "due_soon";
  }

  return "none";
}

export function urgencyToActionReason(
  urgency: UrgencyLevel,
): ActionReason | null {
  if (urgency === "overdue") {
    return ActionReason.return_deadline_overdue;
  }
  if (urgency === "due_soon") {
    return ActionReason.return_deadline_due_soon;
  }
  return null;
}
