import { expect, test } from "@playwright/test";
import { appBarTexts } from "./constants/components";
import { linesTexts } from "./constants/lines";
import { loginTexts, loginUser } from "./constants/login";

test("ログイン画面が表示される", async ({ page }) => {
  await page.goto(loginTexts.link);

  await expect(
    page.getByRole("button", { name: loginTexts.loginButton }),
  ).toBeVisible();
  await page.screenshot({ path: "screenshot/login.png" });
  await page.screenshot({
    path: "screenshot/login_full_page.png",
    fullPage: true,
  });
});

test("ログインすると一覧画面に遷移する", async ({ page }) => {
  await page.goto(loginTexts.link);

  await page
    .getByRole("textbox", { name: loginTexts.userNameInput })
    .fill(loginUser.userName);
  await page.getByLabel(loginTexts.passwordInput).fill(loginUser.password);
  await page.getByRole("button", { name: loginTexts.loginButton }).click();

  await expect(page).toHaveURL(linesTexts.link);

  await expect(
    page.getByRole("button", { name: appBarTexts.logoutButton }),
  ).toBeVisible();
  await expect(page.getByRole("list")).toBeVisible();

  await page.screenshot({
    path: "screenshot/lines_certified_full_page.png",
    fullPage: true,
  });
  await page
    .getByRole("banner")
    .screenshot({ path: "screenshot/banner_certified.png" });
});
