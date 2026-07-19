import { expect, test } from "@playwright/test";
import { loginTexts, loginUser } from "./constants/login";

test("ログイン画面が表示される", async ({ page }) => {
  await page.goto(loginTexts.link);

  await expect(
    page.getByRole("button", { name: loginTexts.loginButton }),
  ).toBeVisible();
});

test("ログインして一覧画面に遷移する", async ({ page }) => {
  await page.goto(loginTexts.link);

  await page
    .getByRole("textbox", { name: loginTexts.userNameInput })
    .fill(loginUser.userName);
  await page.getByLabel(loginTexts.passwordInput).fill(loginUser.password);
  await page.getByRole("button", { name: loginTexts.loginButton }).click();

  await expect(page).toHaveURL("/");

  await expect(page.getByRole("list")).toBeVisible();
});
