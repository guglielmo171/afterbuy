import { describe, expect, it } from "vitest";
import {
  mapServerFieldErrors,
  parsePriceEurToCents,
  purchaseFormToCreateInput,
  purchaseRecordToFormValues,
} from "@/features/purchases/lib/purchase-form-schema";
import type { PurchaseRecord } from "@/server/mappers/purchase";

const sampleRecord: PurchaseRecord = {
  id: "purchase_1",
  productName: "Desk lamp",
  storeId: "store_1",
  storeName: "Example Store",
  purchaseDate: "2026-08-13",
  priceCents: 4599,
  currency: "EUR",
  returnCase: {
    id: "return_1",
    returnPolicyDays: 30,
    returnDeadline: "2026-09-12",
    status: "return_planned",
  },
};

describe("purchase form mapping", () => {
  it("converts EUR form input to cents for create", () => {
    expect(parsePriceEurToCents("45.99")).toBe(4599);
    expect(parsePriceEurToCents("12,50")).toBe(1250);

    expect(
      purchaseFormToCreateInput({
        productName: "Desk lamp",
        storeName: "Example Store",
        purchaseDate: "2026-08-13",
        priceEur: "45.99",
        returnPolicyDays: "30",
      }),
    ).toEqual({
      productName: "Desk lamp",
      storeName: "Example Store",
      purchaseDate: "2026-08-13",
      priceCents: 4599,
      currency: "EUR",
      returnPolicyDays: 30,
    });
  });

  it("maps purchase records to form values", () => {
    expect(purchaseRecordToFormValues(sampleRecord)).toEqual({
      productName: "Desk lamp",
      storeName: "Example Store",
      purchaseDate: "2026-08-13",
      priceEur: "45.99",
      returnPolicyDays: "30",
    });
  });

  it("maps server field errors onto form fields", () => {
    expect(
      mapServerFieldErrors({
        priceCents: ["Must be a whole number of cents"],
        _root: ["Something went wrong"],
      }),
    ).toEqual({
      priceEur: "Must be a whole number of cents",
    });
  });
});
