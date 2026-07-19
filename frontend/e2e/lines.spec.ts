import { expect, test } from "@playwright/test";
import { appBarTexts } from "./constants/components";
import { linesTexts } from "./constants/lines";
import { registerTexts } from "./constants/register";

test("一覧ページが表示される", async ({ page }) => {
  await page.goto(linesTexts.link);

  await expect(page.getByRole("list")).toBeVisible();
});

test("新規登録画面への遷移", async ({ page }) => {
  await page.goto(linesTexts.link);

  await page.getByRole("link", { name: appBarTexts.registerLink }).click();

  await expect(
    page.getByRole("button", { name: registerTexts.registerButton }),
  ).toBeVisible();
  await expect(page).toHaveURL(registerTexts.link);
});
