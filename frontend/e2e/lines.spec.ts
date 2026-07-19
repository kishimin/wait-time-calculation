import { expect, test } from "@playwright/test";
import { appBarTexts } from "./constants/components";
import { linesTexts } from "./constants/lines";
import { registerTexts } from "./constants/register";

test.describe("未認証時", () => {
  test("未認証の一覧ページの表示", async ({ page }) => {
    await page.goto(linesTexts.link);

    await expect(
      page.getByRole("link", { name: appBarTexts.registerLink }),
    ).toBeVisible();
    await expect(page.getByRole("list")).toBeVisible();

    await page.screenshot({
      path: "screenshot/lines_uncertified_full_page.png",
      fullPage: true,
    });

    await expect(page).toHaveScreenshot();
  });

  test("新規登録のリンクをクリックすると新規登録画面に遷移する", async ({
    page,
  }) => {
    await page.goto(linesTexts.link);

    await page.getByRole("link", { name: appBarTexts.registerLink }).click();

    await expect(page).toHaveURL(registerTexts.link);
    await expect(
      page.getByRole("button", { name: registerTexts.registerButton }),
    ).toBeVisible();

    await page.screenshot({
      path: "screenshot/register_full_page.png",
      fullPage: true,
    });

    await expect(page).toHaveScreenshot();
  });
});
