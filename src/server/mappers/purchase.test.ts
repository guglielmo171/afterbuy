import { describe, expect, it } from "vitest";
import { calendarDateToUtcMidnight } from "@/shared/lib/calendar-date";
import { calculateReturnDeadline } from "@/entities/return-case/lib/calculate-return-deadline";
import { mapPurchase } from "@/server/mappers/purchase";

describe("mapPurchase", () => {
  it("maps UTC-midnight DateTime to calendar dates with a fixed deadline", () => {
    const purchaseDate = "2026-01-25";
    const returnPolicyDays = 10;
    const returnDeadline = calculateReturnDeadline(
      purchaseDate,
      returnPolicyDays,
    );

    const mapped = mapPurchase({
      id: "purchase_1",
      productName: "Desk lamp",
      storeId: "store_1",
      purchaseDate: calendarDateToUtcMidnight(purchaseDate),
      priceCents: 4599,
      currency: "EUR",
      store: { id: "store_1", name: "Example Store" },
      returnCase: {
        id: "return_1",
        returnPolicyDays,
        returnDeadline: calendarDateToUtcMidnight(returnDeadline),
        status: "not_planned",
      },
    });

    expect(mapped.purchaseDate).toBe("2026-01-25");
    expect(mapped.returnCase?.returnDeadline).toBe("2026-02-04");
    expect(mapped.returnCase?.returnDeadline).not.toBeInstanceOf(Date);
    expect(mapped.storeName).toBe("Example Store");
  });

  it("maps policy 0 to the same calendar day", () => {
    const purchaseDate = "2026-08-13";
    const mapped = mapPurchase({
      id: "purchase_2",
      productName: "Kitchen scale",
      storeId: "store_1",
      purchaseDate: calendarDateToUtcMidnight(purchaseDate),
      priceCents: 0,
      currency: "EUR",
      store: { id: "store_1", name: "Example Store" },
      returnCase: {
        id: "return_2",
        returnPolicyDays: 0,
        returnDeadline: calendarDateToUtcMidnight(
          calculateReturnDeadline(purchaseDate, 0),
        ),
        status: "not_planned",
      },
    });

    expect(mapped.returnCase?.returnDeadline).toBe("2026-08-13");
  });
});
