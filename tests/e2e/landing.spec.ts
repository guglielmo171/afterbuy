import { test, expect } from "@playwright/test";

test("landing page loads with hero and WIP status", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: "Keep post-purchase deadlines in view.",
    })
  ).toBeVisible();

  await expect(page.getByText("Product preview · work in progress")).toBeVisible();
});

test("primary CTA reflects in-progress product status", async ({ page }) => {
  await page.goto("/");

  const primaryCtas = page.getByRole("link", { name: "Preview in progress" });
  await expect(primaryCtas).toHaveCount(3);

  await expect(page.getByRole("link", { name: "Open App" })).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Try the Demo" })).toHaveCount(0);
});

test("what works now lists current preview foundations", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "What works in the current preview." })
  ).toBeVisible();

  await expect(
    page.getByText(
      "The preview runs as a real web product, not a static mockup — scope and availability are stated plainly, not implied."
    )
  ).toBeVisible();
  await expect(
    page.getByText(
      "A product preview area exists, but it does not yet offer navigable purchase flows — only a placeholder for now."
    )
  ).toBeVisible();
});

test("feature flow avoids available badges without navigable proof", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText("Available in the product preview")).toHaveCount(0);
  await expect(page.getByText("Planned")).toHaveCount(2);
  await expect(page.getByText("In progress")).toHaveCount(1);
});

test("app shell loads", async ({ page }) => {
  await page.goto("/app");
  await expect(page.getByText("AfterBuy App")).toBeVisible();
});

test("health endpoint responds", async ({ request }) => {
  const response = await request.get("/api/health");
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body).toHaveProperty("status", "ok");
});
