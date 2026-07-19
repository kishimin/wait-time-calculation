import { Page } from "playwright/test";
import { appBarTexts } from "../constants/components";
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

export const logout = async (page: Page) => {
  await page.getByRole("button", { name: appBarTexts.logoutButton }).click();
};
