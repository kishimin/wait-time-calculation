import { Page } from "playwright/test";
import { loginTexts, loginUser } from "../constants/login";

export const login = async (
  page: Page,
  userName: string = loginUser.userName,
  password: string = loginUser.password,
) => {
  await page
    .getByRole("textbox", { name: loginTexts.userNameInput })
    .fill(userName);
  await page.getByLabel(loginTexts.passwordInput).fill(password);
  await page.getByRole("button", { name: loginTexts.loginButton }).click();
};
