import { Page } from "playwright/test";

/** ページの共通操作 */
export abstract class BasePage {
  readonly page: Page;

  /** pageの初期化 */
  constructor(page: Page) {
    this.page = page;
  }

  /** ページへの遷移 */
  async goto(path: string) {
    await this.page.goto(path);
  }
}
