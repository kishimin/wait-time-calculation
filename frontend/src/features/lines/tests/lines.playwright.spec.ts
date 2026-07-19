import { expect, test } from "@playwright/test";
import { enterLines } from "./data";

test("一覧のタイトルが表示される", async ({ page }) => {
  await page.route("**/api/line", (route) =>
    route.fulfill({
      status: 200,
      body: JSON.stringify(enterLines),
    }),
  );

  await page.goto("/");

  await expect(
    page
      .getByRole("list")
      .filter({ has: page.getByRole("listitem") })
      .first(),
  ).toHaveText(/タイトル/);

  // スクリーンショット
  await page.screenshot({ path: "screenshot/login_mock.png" });

  // VRT
  await expect(page).toHaveScreenshot();

  // ビデオ撮影
});
