import { expect, test } from "@playwright/test";

test("一覧ページが表示される", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  await expect(page.getByRole("heading", { name: "まちログ" })).toBeVisible();
  await expect(page.getByRole("list")).toBeVisible();
});
