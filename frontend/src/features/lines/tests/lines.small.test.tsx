import { screen } from "@testing-library/dom";
import { setup } from "./setup";

test("作成ボタンが表示される", () => {
  setup();

  expect(screen.getByRole("button", { name: "作成" })).toBeVisible();
});
