import { expect, test } from "@playwright/test";
import { FRONTEND_URL } from "./types/constants";

test("一覧ページが表示される", async ({ page }) => {
  await page.goto(`${FRONTEND_URL}/`);

  await expect(page.getByRole("heading", { name: "まちログ" })).toBeVisible();
  await expect(page.getByRole("list")).toBeVisible();
});

test("新規登録画面への遷移", async ({ page }) => {
  await page.goto(`${FRONTEND_URL}/`);

  await page.getByRole("link", { name: "新規登録" }).click();

  await expect(page.getByRole("button", { name: "新規登録" })).toBeVisible();
  await expect(page).toHaveURL(`${FRONTEND_URL}/register`);
});
