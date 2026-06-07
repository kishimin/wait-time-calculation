import { fireEvent, screen, waitFor } from "@testing-library/react";
import { BUTTONS, ERRORS, LABELS } from "./constants";
import { getCreateButton, getExplanationInput, getTitleInput } from "./helper";
import { setup } from "./setup";

describe("タイトルのテキスト入力", () => {
  test("タイトルのテキスト入力が表示される", () => {
    setup();

    expect(screen.getByRole("textbox", { name: LABELS.TITLE })).toBeVisible();
  });

  test("初期値は空である", () => {
    setup();

    expect(getTitleInput()).toHaveValue("");
  });

  test("必須である", () => {
    setup();

    expect(getTitleInput()).toBeRequired();
  });

  test("エラーの時エラーが表示される", async () => {
    const { user } = setup();
    const input = getTitleInput();

    await user.type(input, "あ");
    await user.clear(input);

    expect(input).toHaveAccessibleDescription(ERRORS.title.required);
  });
});

describe("説明のテキスト入力", () => {
  test("説明のテキスト入力が表示される", () => {
    setup();

    expect(
      screen.getByRole("textbox", { name: LABELS.EXPLANATION }),
    ).toBeVisible();
  });

  test("初期値は空である", () => {
    setup();

    expect(getExplanationInput()).toHaveValue("");
  });

  test("エラーの時エラーが表示される", async () => {
    setup();
    const input = getExplanationInput();

    // userEventを使用すると、テスト実行時間が長くなるため
    fireEvent.change(input, { target: { value: "あ".repeat(401) } });

    // エラーが非同期的に表示されるため(userEventの時は、入力から非同期なため必要ない)
    await waitFor(() => {
      expect(input).toHaveAccessibleDescription(ERRORS.explanation.max);
    });
  });
});

describe("作成", () => {
  test("作成ボタンが表示される", () => {
    setup();

    expect(screen.getByRole("button", { name: BUTTONS.CREATE })).toBeVisible();
  });

  test("入力項目がエラーの時に作成ボタンをクリックすると、エラーが表示される", async () => {
    const { user } = setup();
    const createButton = getCreateButton();

    await user.click(createButton);

    expect(screen.getByText(ERRORS.title.required)).toBeVisible();
  });
});
