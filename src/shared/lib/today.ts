import {
  type CalendarDate,
  formatCalendarDate,
} from "@/shared/lib/calendar-date";

export const PRODUCT_TIME_ZONE = "Europe/Berlin";

/**
 * Runtime "today" at the application edge.
 * Domain rules must receive an explicit `currentDate` and must not call this.
 */
export function getTodayCalendarDate(
  timeZone: string = PRODUCT_TIME_ZONE,
  now: Date = new Date(),
): CalendarDate {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);

  const year = Number(parts.find((part) => part.type === "year")?.value);
  const month = Number(parts.find((part) => part.type === "month")?.value);
  const day = Number(parts.find((part) => part.type === "day")?.value);

  if (!year || !month || !day) {
    throw new Error(`Unable to resolve calendar date for zone ${timeZone}`);
  }

  return formatCalendarDate(year, month, day);
}
