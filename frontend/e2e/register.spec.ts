import { expect, test } from "@playwright/test";

test("新規登録画面が表示される", async ({ page }) => {
  await page.goto("http://localhost:5173/register");

  await expect(page.getByRole("heading", { name: "まちログ" })).toBeVisible();
  await expect(page.getByRole("button", { name: "新規登録" })).toBeVisible();
});
