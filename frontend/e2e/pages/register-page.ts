import { Locator, Page } from "playwright/test";
import { registerTexts } from "../constants/register";
import { BasePage } from "./base/base-page";

/** 新規登録ページのPage Object Model */
export class RegisterPage extends BasePage {
  readonly path = registerTexts.link;
  readonly getRegisterButton: Locator;

  /** pageの初期化 */
  constructor(page: Page) {
    super(page);
    this.getRegisterButton = page.getByRole("button", {
      name: registerTexts.registerButton,
    });
  }

  /** 新規登録画面への遷移 */
  async goto() {
    await this.page.goto(registerTexts.link);
  }
}
