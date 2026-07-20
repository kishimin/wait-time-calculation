import { Locator, Page } from "playwright/test";
import { loginTexts, loginUser } from "../constants/login";
import { BasePage } from "./base/base-page";

/** LoginPageのPage Object Model */
export class LoginPage extends BasePage {
  readonly getUserNameInput: Locator;
  readonly getPasswordInput: Locator;
  readonly getLoginButton: Locator;

  /** pageの初期化 */
  constructor(page: Page) {
    super(page)
    this.getUserNameInput = page.getByRole("textbox", {
      name: loginTexts.userNameInput,
    });
    this.getPasswordInput = page.getByLabel(loginTexts.passwordInput);
    this.getLoginButton = page.getByRole("button", {
      name: loginTexts.loginButton,
    });
  }

  /** ページへの遷移 */
  async goto() {
    await this.page.goto(loginTexts.link);
  }

  /** ユーザー名の入力 */
  async fillUserName(userName: string) {
    await this.getUserNameInput.fill(userName);
  }

  /** パスワードの入力 */
  async fillPassword(password: string) {
    await this.getPasswordInput.fill(password);
  }

  /** ログインボタンクリック */
  async clickLoginButton() {
    await this.getLoginButton.click();
  }

  /** ログインする */
  async login(
    userName: string = loginUser.userName,
    password: string = loginUser.password,
  ) {
    await this.fillUserName(userName);
    await this.fillPassword(password);
    await this.clickLoginButton();
  }
}
