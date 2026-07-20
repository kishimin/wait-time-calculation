import { expect, test } from "@playwright/test";
import { enterLines } from "../../lines/tests/data";
import { BUTTONS, LABELS, loginUser } from "./constants";

test("ログインしたら、一覧画面に遷移する", async ({ page }) => {
  await page.goto("/login");

  await page
    .getByRole("textbox", { name: LABELS.userName })
    .fill(loginUser.userName);
  await page.getByLabel(LABELS.password).fill(loginUser.password);

  await page.route("**/api/user/login", (route) =>
    route.fulfill({
      status: 200,
      body: JSON.stringify({
        userName: loginUser.userName,
        email: loginUser.email,
        token: loginUser.token,
      }),
    }),
  );
  await page.route("**/api/line", (route) =>
    route.fulfill({
      status: 200,
      body: JSON.stringify(enterLines),
    }),
  );

  await page.getByRole("button", { name: BUTTONS.login }).click();

  await expect(page).toHaveURL("/");
  await expect(page.getByRole("list")).toBeVisible();
  await expect(page.getByRole("button", { name: "ログアウト" })).toBeVisible();

  await page.screenshot({ path: "screenshot/login_mock.png" });
  await expect(page).toHaveScreenshot();
});
