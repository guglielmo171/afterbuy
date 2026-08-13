import { describe, expect, it } from "vitest";
import { calculateReturnDeadline } from "@/entities/return-case/lib/calculate-return-deadline";
import {
  classifyDeadlineUrgency,
  urgencyToActionReason,
} from "@/entities/return-case/lib/classify-deadline-urgency";
import { ActionReason } from "@/entities/return-case/model/types";

describe("calculateReturnDeadline", () => {
  it("returns the same day when policy days is 0", () => {
    expect(calculateReturnDeadline("2026-08-13", 0)).toBe("2026-08-13");
  });

  it("adds policy days across month end", () => {
    expect(calculateReturnDeadline("2026-01-25", 10)).toBe("2026-02-04");
    expect(calculateReturnDeadline("2026-01-31", 1)).toBe("2026-02-01");
  });

  it("covers leap year boundaries", () => {
    expect(calculateReturnDeadline("2024-02-20", 10)).toBe("2024-03-01");
    expect(calculateReturnDeadline("2024-02-29", 0)).toBe("2024-02-29");
    expect(calculateReturnDeadline("2025-02-20", 10)).toBe("2025-03-02");
  });
});

describe("classifyDeadlineUrgency", () => {
  const today = "2026-08-13";

  it("marks overdue when deadline is before today and status is open", () => {
    expect(
      classifyDeadlineUrgency("2026-08-12", today, "not_planned"),
    ).toBe("overdue");
    expect(
      classifyDeadlineUrgency("2026-08-01", today, "return_planned"),
    ).toBe("overdue");
    expect(urgencyToActionReason("overdue")).toBe(
      ActionReason.return_deadline_overdue,
    );
  });

  it("marks due_soon on the 7-day threshold and on today", () => {
    expect(
      classifyDeadlineUrgency("2026-08-13", today, "not_planned"),
    ).toBe("due_soon");
    expect(
      classifyDeadlineUrgency("2026-08-20", today, "return_planned"),
    ).toBe("due_soon");
    expect(urgencyToActionReason("due_soon")).toBe(
      ActionReason.return_deadline_due_soon,
    );
  });

  it("returns none when deadline is beyond 7 calendar days", () => {
    expect(
      classifyDeadlineUrgency("2026-08-21", today, "not_planned"),
    ).toBe("none");
  });

  it("never flags returned or closed as urgent", () => {
    expect(
      classifyDeadlineUrgency("2026-08-01", today, "returned"),
    ).toBe("none");
    expect(
      classifyDeadlineUrgency("2026-08-01", today, "closed"),
    ).toBe("none");
    expect(
      classifyDeadlineUrgency("2026-08-15", today, "returned"),
    ).toBe("none");
    expect(
      classifyDeadlineUrgency("2026-08-15", today, "closed"),
    ).toBe("none");
    expect(urgencyToActionReason("none")).toBeNull();
  });
});
