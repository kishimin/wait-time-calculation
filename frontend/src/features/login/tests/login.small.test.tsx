import { screen } from "@testing-library/dom";
import { ERRORS, LABELS } from "./constants";
import { getUserNameInput } from "./helper";
import { setup } from "./setup";

describe("ユーザー名のテキスト入力", () => {
  test("ユーザー名のテキスト入力が表示される", () => {
    setup();

    expect(
      screen.getByRole("textbox", { name: LABELS.userName }),
    ).toBeVisible();
  });

  test("初期値は空である", () => {
    setup();

    expect(getUserNameInput()).toHaveValue("");
  });

  test("必須である", () => {
    setup();

    expect(getUserNameInput()).toBeRequired();
  });

  test("エラーの時エラーが表示される", async () => {
    const { user } = setup();
    const input = getUserNameInput();

    await user.type(input, "あ");
    await user.clear(input);

    expect(input).toHaveAccessibleDescription(ERRORS.userName.required);
  });
});
