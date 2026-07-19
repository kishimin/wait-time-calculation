import { expect, test } from "@playwright/test";

test("ログイン画面が表示される", async ({ page }) => {
  await page.goto("/login");

  await expect(page.getByRole("button", { name: "ログイン" })).toBeVisible();
});

test("ログインして一覧画面に遷移する", async ({ page }) => {
  await page.goto("/login");

  await page.getByRole("textbox", { name: "ユーザー名" }).fill("userName");
  await page.getByLabel("パスワード").fill("Password123!");
  await page.getByRole("button", { name: "ログイン" }).click();

  await expect(page).toHaveURL("/");

  await expect(page.getByRole("list")).toBeVisible();
});
