/**
 * Calendar-date primitives (YYYY-MM-DD).
 * Domain arithmetic stays on strings; Date is only for UTC-midnight persistence.
 */

export type CalendarDate = string;

const CALENDAR_DATE_RE = /^(\d{4})-(\d{2})-(\d{2})$/;

function isLeapYear(year: number): boolean {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

function daysInMonth(year: number, month: number): number {
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      return 31;
    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
    case 2:
      return isLeapYear(year) ? 29 : 28;
    default:
      throw new RangeError(`Invalid month: ${month}`);
  }
}

function pad2(value: number): string {
  return String(value).padStart(2, "0");
}

export function formatCalendarDate(
  year: number,
  month: number,
  day: number,
): CalendarDate {
  return `${year}-${pad2(month)}-${pad2(day)}`;
}

export function parseCalendarDate(value: string): {
  year: number;
  month: number;
  day: number;
} {
  const match = CALENDAR_DATE_RE.exec(value);
  if (!match) {
    throw new RangeError(`Invalid calendar date: ${value}`);
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  if (month < 1 || month > 12 || day < 1 || day > daysInMonth(year, month)) {
    throw new RangeError(`Invalid calendar date: ${value}`);
  }

  return { year, month, day };
}

export function isCalendarDate(value: string): value is CalendarDate {
  try {
    parseCalendarDate(value);
    return true;
  } catch {
    return false;
  }
}

/** Persist a calendar day as UTC midnight (Prisma DateTime). */
export function calendarDateToUtcMidnight(date: CalendarDate): Date {
  const { year, month, day } = parseCalendarDate(date);
  return new Date(Date.UTC(year, month - 1, day));
}

/** Read a persisted UTC-midnight instant back to YYYY-MM-DD. */
export function utcMidnightToCalendarDate(instant: Date): CalendarDate {
  return formatCalendarDate(
    instant.getUTCFullYear(),
    instant.getUTCMonth() + 1,
    instant.getUTCDate(),
  );
}

export function addCalendarDays(
  date: CalendarDate,
  days: number,
): CalendarDate {
  if (!Number.isInteger(days)) {
    throw new RangeError(`days must be an integer: ${days}`);
  }

  let { year, month, day } = parseCalendarDate(date);
  day += days;

  while (day > daysInMonth(year, month)) {
    day -= daysInMonth(year, month);
    month += 1;
    if (month > 12) {
      month = 1;
      year += 1;
    }
  }

  while (day < 1) {
    month -= 1;
    if (month < 1) {
      month = 12;
      year -= 1;
    }
    day += daysInMonth(year, month);
  }

  return formatCalendarDate(year, month, day);
}

/** Signed calendar-day difference: `to - from` (same day → 0). */
export function differenceInCalendarDays(
  to: CalendarDate,
  from: CalendarDate,
): number {
  const a = parseCalendarDate(from);
  const b = parseCalendarDate(to);

  const utcFrom = Date.UTC(a.year, a.month - 1, a.day);
  const utcTo = Date.UTC(b.year, b.month - 1, b.day);
  return Math.round((utcTo - utcFrom) / 86_400_000);
}

export function compareCalendarDates(a: CalendarDate, b: CalendarDate): number {
  return differenceInCalendarDays(a, b);
}
