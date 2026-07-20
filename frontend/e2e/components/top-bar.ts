import { Locator, Page } from "playwright/test";
import { topBarTexts } from "../constants/components";

/** トップバー */
export class TopBar {
  readonly page: Page;
  readonly getLogoutButton: Locator;

  /** componentの初期化 */
  constructor(page: Page) {
    this.page = page;
    this.getLogoutButton = page.getByRole("button", {
      name: topBarTexts.logoutButton,
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
}
