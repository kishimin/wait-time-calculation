import { Locator, Page } from "playwright/test";
import { topBarTexts } from "../constants/components";

/** トップバー */
export class TopBar {
  readonly page: Page;
  readonly getBanner: Locator;
  readonly getLogoutButton: Locator;

  /** componentの初期化 */
  constructor(page: Page) {
    this.page = page;
    this.getBanner = page.getByRole("banner");
    this.getLogoutButton = page.getByRole("banner").getByRole("button", {
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
