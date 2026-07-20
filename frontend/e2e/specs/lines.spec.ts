import { expect, test } from "@playwright/test";
import { TopBar } from "../components/top-bar";
import { LinesPage } from "../pages/lines-page";
import { RegisterPage } from "../pages/register-page";

test.describe("未認証時", () => {
  test("未認証の一覧ページの表示", async ({ page }) => {
    const linesPage = new LinesPage(page);
    const topBar = new TopBar(page);
    await linesPage.goto();

    await expect(topBar.getRegisterLink).toBeVisible();
    await expect(linesPage.getLinesList).toBeVisible();

    await page.screenshot({
      path: "screenshot/lines_uncertified_full_page.png",
      fullPage: true,
    });

    await expect(page).toHaveScreenshot();
  });

  test("新規登録のリンクをクリックすると新規登録画面に遷移する", async ({
    page,
  }) => {
    const linesPage = new LinesPage(page);
    const topBar = new TopBar(page);
    const registerPage = new RegisterPage(page);

    await test.step("一覧画面", async () => {
      await linesPage.goto();

      await topBar.clickRegisterLink();
    });

    await test.step("新規登録画面への遷移", async () => {
      await expect(page).toHaveURL(registerPage.path);
      await expect(registerPage.getRegisterButton).toBeVisible();
    });

    await test.step("スクリーンショット", async () => {
      await page.screenshot({
        path: "screenshot/register_full_page.png",
        fullPage: true,
      });
    });

    await test.step("VRT", async () => {
      await expect(page).toHaveScreenshot();
    });
  });
});
