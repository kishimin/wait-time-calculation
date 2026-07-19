import { expect, test } from "@playwright/test";
import { FRONTEND_URL } from "./types/constants";

test("ログイン画面が表示される", async ({ page }) => {
  await page.goto(`${FRONTEND_URL}/login`);

  await expect(page.getByRole("button", {name: "ログイン"})).toBeVisible()
});
