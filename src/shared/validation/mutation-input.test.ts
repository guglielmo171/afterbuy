import { describe, expect, it } from "vitest";
import {
  createPurchaseInputSchema,
  updatePurchaseInputSchema,
} from "@/shared/validation/purchase";
import { updateReturnStatusInputSchema } from "@/shared/validation/return-status";

const validPurchaseFields = {
  productName: "Desk lamp",
  storeName: "Example Store",
  purchaseDate: "2026-08-13",
  priceCents: 4599,
};

describe("createPurchaseInputSchema", () => {
  it("defaults currency to EUR when omitted", () => {
    const parsed = createPurchaseInputSchema.parse(validPurchaseFields);

    expect(parsed.currency).toBe("EUR");
    expect(parsed.returnPolicyDays).toBeUndefined();
  });

  it("accepts returnPolicyDays 0", () => {
    const parsed = createPurchaseInputSchema.parse({
      ...validPurchaseFields,
      returnPolicyDays: 0,
    });

    expect(parsed.returnPolicyDays).toBe(0);
  });

  it("rejects invalid calendar dates", () => {
    expect(
      createPurchaseInputSchema.safeParse({
        ...validPurchaseFields,
        purchaseDate: "2025-02-29",
      }).success,
    ).toBe(false);
    expect(
      createPurchaseInputSchema.safeParse({
        ...validPurchaseFields,
        purchaseDate: "2026-13-01",
      }).success,
    ).toBe(false);
    expect(
      createPurchaseInputSchema.safeParse({
        ...validPurchaseFields,
        purchaseDate: "2026-08-32",
      }).success,
    ).toBe(false);
  });

  it("rejects non-integer or negative priceCents", () => {
    expect(
      createPurchaseInputSchema.safeParse({
        ...validPurchaseFields,
        priceCents: -1,
      }).success,
    ).toBe(false);
    expect(
      createPurchaseInputSchema.safeParse({
        ...validPurchaseFields,
        priceCents: 10.5,
      }).success,
    ).toBe(false);
  });

  it("rejects negative returnPolicyDays", () => {
    expect(
      createPurchaseInputSchema.safeParse({
        ...validPurchaseFields,
        returnPolicyDays: -1,
      }).success,
    ).toBe(false);
  });
});

describe("updatePurchaseInputSchema", () => {
  it("requires an id and the same purchase fields", () => {
    const parsed = updatePurchaseInputSchema.parse({
      id: "purchase_1",
      ...validPurchaseFields,
      returnPolicyDays: 0,
    });

    expect(parsed.id).toBe("purchase_1");
    expect(parsed.currency).toBe("EUR");
    expect(parsed.returnPolicyDays).toBe(0);
    expect(parsed.purchaseDate).toBe("2026-08-13");
  });

  it("rejects a missing id", () => {
    expect(
      updatePurchaseInputSchema.safeParse(validPurchaseFields).success,
    ).toBe(false);
  });
});

describe("updateReturnStatusInputSchema", () => {
  it("accepts persisted return statuses", () => {
    const parsed = updateReturnStatusInputSchema.parse({
      purchaseId: "purchase_1",
      status: "return_planned",
    });

    expect(parsed.status).toBe("return_planned");
  });

  it("rejects derived return_window_expired", () => {
    expect(
      updateReturnStatusInputSchema.safeParse({
        purchaseId: "purchase_1",
        status: "return_window_expired",
      }).success,
    ).toBe(false);
  });
});
