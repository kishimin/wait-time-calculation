import { expect, test } from "@playwright/test";
import { TopBar } from "../components/top-bar";
import { linesTexts } from "../constants/lines";
import { LoginPage } from "../pages/login-page";

test("ログイン画面が表示される", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();

  await expect(loginPage.getLoginButton).toBeVisible();

  await page.screenshot({ path: "screenshot/login.png" });
  await page.screenshot({
    path: "screenshot/login_full_page.png",
    fullPage: true,
  });

  await expect(page).toHaveScreenshot();
});

test("ログインすると一覧画面に遷移する", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const topBar = new TopBar(page);
  await loginPage.goto();

  await loginPage.login();

  await expect(page).toHaveURL(linesTexts.link);

  await expect(topBar.getLogoutButton).toBeVisible();
  await expect(page.getByRole("list")).toBeVisible();

  await page.screenshot({
    path: "screenshot/lines_certified_full_page.png",
    fullPage: true,
  });
  await topBar.getBanner.screenshot({
    path: "screenshot/banner_certified.png",
  });

  await expect(page).toHaveScreenshot();
});
