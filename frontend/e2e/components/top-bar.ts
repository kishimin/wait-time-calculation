import { Locator, Page } from "playwright/test";
import { topBarTexts } from "../constants/components";

/** トップバー */
export class TopBar {
  readonly page: Page;
  readonly getBanner: Locator;
  readonly getLogoutButton: Locator;
  readonly getRegisterLink: Locator;

  /** componentの初期化 */
  constructor(page: Page) {
    this.page = page;
    this.getBanner = page.getByRole("banner");
    this.getLogoutButton = page.getByRole("banner").getByRole("button", {
      name: topBarTexts.logoutButton,
    });
    this.getRegisterLink = page.getByRole("banner").getByRole("link", {
      name: topBarTexts.registerLink,
    });
  }

  /** ログアウトボタンのクリック */
  async clickLogoutButton() {
    await this.getLogoutButton.click();
  }

  /** ログアウト */
  async logout() {
    await this.clickLogoutButton();
  }

  /** 新規登録画面へ遷移 */
  async clickRegisterLink() {
    await this.getRegisterLink.click();
  }
}
