import { classifyDeadlineUrgency } from "@/entities/return-case/lib/classify-deadline-urgency";
import type {
  ReturnStatus,
  UrgencyLevel,
} from "@/entities/return-case/model/types";
import {
  differenceInCalendarDays,
  type CalendarDate,
} from "@/shared/lib/calendar-date";

export function formatReturnStatusLabel(status: ReturnStatus): string {
  return status.replaceAll("_", " ");
}

export function formatReturnStatusActionLabel(status: ReturnStatus): string {
  return `Mark as ${formatReturnStatusLabel(status)}`;
}

export function isReturnWindowExpired(
  deadline: CalendarDate,
  currentDate: CalendarDate,
  status: ReturnStatus,
): boolean {
  if (status !== "not_planned" && status !== "return_planned") {
    return false;
  }

  return differenceInCalendarDays(deadline, currentDate) < 0;
}

export function getReturnUrgencyMessage(
  urgency: UrgencyLevel,
): { text: string; tone: "red" | "amber" } | null {
  if (urgency === "overdue") {
    return { text: "Return window expired", tone: "red" };
  }

  if (urgency === "due_soon") {
    return { text: "Return deadline due soon", tone: "amber" };
  }

  return null;
}

export function deriveReturnUrgency(
  deadline: CalendarDate,
  currentDate: CalendarDate,
  status: ReturnStatus,
) {
  const urgency = classifyDeadlineUrgency(deadline, currentDate, status);

  return {
    urgency,
    message: getReturnUrgencyMessage(urgency),
  };
}
