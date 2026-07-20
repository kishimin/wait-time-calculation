import { expect, test } from "@playwright/test";
import { TopBar } from "../components/top-bar";
import { LinesPage } from "../pages/lines-page";
import { LoginPage } from "../pages/login-page";

test("ログイン画面が表示される", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();

  await expect(loginPage.getLoginButton).toBeVisible();

  await test.step("スクリーンショット", async () => {
    await page.screenshot({ path: "screenshot/login.png" });
    await page.screenshot({
      path: "screenshot/login_full_page.png",
      fullPage: true,
    });
  });

  await expect(page).toHaveScreenshot();
});

test("ログインすると一覧画面に遷移する", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const topBar = new TopBar(page);
  const linesPage = new LinesPage(page);

  await test.step("ログイン", async () => {
    await loginPage.goto();
    await loginPage.login();
  });

  await test.step("一覧画面への遷移", async () => {
    await expect(page).toHaveURL(linesPage.path);

    await expect(topBar.getLogoutButton).toBeVisible();
    await expect(linesPage.getLinesList).toBeVisible();
  });

  await test.step("スクリーンショット", async () => {
    await page.screenshot({
      path: "screenshot/lines_certified_full_page.png",
      fullPage: true,
    });
    await topBar.getBanner.screenshot({
      path: "screenshot/banner_certified.png",
    });
  });

  await test.step("VRT", async () => {
    await expect(page).toHaveScreenshot();
  });
});
