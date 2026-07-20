import { Locator, Page } from "playwright/test";
import { linesTexts } from "../constants/lines";
import { BasePage } from "./base/base-page";

/** 一覧ページのPage Object Model */
export class LinesPage extends BasePage {
  readonly path = linesTexts.link;
  readonly getLinesList: Locator;

  /** pageの初期化 */
  constructor(page: Page) {
    super(page);
    this.getLinesList = page.getByRole("list");
  }

  /** 一覧ページへの遷移 */
  async goto() {
    await this.page.goto(linesTexts.link);
  }
}
