import { describe, expect, it } from "vitest";
import {
  addCalendarDays,
  calendarDateToUtcMidnight,
  differenceInCalendarDays,
  isCalendarDate,
  utcMidnightToCalendarDate,
} from "@/shared/lib/calendar-date";
import { getTodayCalendarDate } from "@/shared/lib/today";

describe("calendar-date", () => {
  it("validates YYYY-MM-DD calendar dates", () => {
    expect(isCalendarDate("2026-08-13")).toBe(true);
    expect(isCalendarDate("2024-02-29")).toBe(true);
    expect(isCalendarDate("2025-02-29")).toBe(false);
    expect(isCalendarDate("2026-13-01")).toBe(false);
    expect(isCalendarDate("2026-08-32")).toBe(false);
  });

  it("persists and restores UTC midnight", () => {
    const persisted = calendarDateToUtcMidnight("2026-08-13");
    expect(persisted.toISOString()).toBe("2026-08-13T00:00:00.000Z");
    expect(utcMidnightToCalendarDate(persisted)).toBe("2026-08-13");
  });

  it("adds days across month end", () => {
    expect(addCalendarDays("2026-01-31", 1)).toBe("2026-02-01");
    expect(addCalendarDays("2026-01-28", 14)).toBe("2026-02-11");
  });

  it("adds days across leap day", () => {
    expect(addCalendarDays("2024-02-28", 1)).toBe("2024-02-29");
    expect(addCalendarDays("2024-02-29", 1)).toBe("2024-03-01");
    expect(addCalendarDays("2025-02-28", 1)).toBe("2025-03-01");
  });

  it("computes signed calendar-day differences", () => {
    expect(differenceInCalendarDays("2026-08-13", "2026-08-13")).toBe(0);
    expect(differenceInCalendarDays("2026-08-20", "2026-08-13")).toBe(7);
    expect(differenceInCalendarDays("2026-08-12", "2026-08-13")).toBe(-1);
  });
});

describe("getTodayCalendarDate (Europe/Berlin edge)", () => {
  it("uses Europe/Berlin, not UTC, for a fixed instant", () => {
    // 22:30 UTC on Aug 12 is already Aug 13 in Berlin (CEST, UTC+2).
    const instant = new Date("2026-08-12T22:30:00.000Z");
    expect(getTodayCalendarDate("Europe/Berlin", instant)).toBe("2026-08-13");
  });
});
