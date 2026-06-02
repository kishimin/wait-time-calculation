import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Register from "../views/register";
import { LABELS } from "./constants";
import { getPasswordInput, getUserNameInput } from "./helper";

const setup = () => {
  const user = userEvent.setup();

  render(<Register />);

  return { user };
};

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

  test("空の時エラーが表示される", async () => {
    const { user } = setup();
    const input = getUserNameInput();

    await user.type(input, "あ");
    await user.clear(input);

    expect(input).toHaveAccessibleDescription("ユーザー名は必須です");
  });

  test("51文字以上の時エラーが表示される", async () => {
    const { user } = setup();
    const input = getUserNameInput();

    await user.type(input, "あ".repeat(51));

    expect(input).toHaveAccessibleDescription(
      "ユーザー名は50文字以内で入力してください",
    );
  });
});

describe("パスワードのパスワード入力", () => {
  test("パスワードのパスワード入力が表示される", () => {
    setup();

    expect(screen.getByLabelText(LABELS.password)).toBeVisible();
  });

  test("初期値は空である", () => {
    setup();

    expect(getPasswordInput()).toHaveValue("");
  });

  test("必須である", () => {
    setup();

    expect(getPasswordInput()).toBeRequired();
  });

  test("空の時エラーが表示される", async () => {
    const { user } = setup();
    const input = getPasswordInput();

    await user.type(input, "a");
    await user.clear(input);

    expect(getPasswordInput()).toHaveAccessibleDescription(
      "パスワードは必須です",
    );
  });
});
