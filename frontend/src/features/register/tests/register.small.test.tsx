import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Register from "../views/register";
import { BUTTONS, ERRORS, LABELS } from "./constants";
import {
  getCreateButton,
  getEmailInput,
  getPasswordInput,
  getUserNameInput,
} from "./helper";

const setup = () => {
  const user = userEvent.setup();
  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <Register />
    </QueryClientProvider>,
  );

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

  test("エラーの時エラーが表示される", async () => {
    const { user } = setup();
    const input = getUserNameInput();

    await user.type(input, "あ");
    await user.clear(input);

    expect(input).toHaveAccessibleDescription(ERRORS.userName.required);
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

  test("エラーの時エラーが表示される", async () => {
    const { user } = setup();
    const input = getPasswordInput();

    await user.type(input, "a".repeat(10));

    expect(input).toHaveAccessibleDescription(ERRORS.password.min);
  });

  test("初期状態はtype=passwordで表示される", async () => {
    const { user } = setup();
    const input = getPasswordInput();

    await user.type(input, "aA1!".repeat(11));

    expect(input).toHaveAttribute("type", "password");
  });

  test("Visibilityアイコンをクリックするとtype=textで表示される", async () => {
    const { user } = setup();
    const input = getPasswordInput();
    const visibilityIcon = screen.getByRole("button", {
      name: LABELS.visibilityIcon,
    });

    await user.type(input, "aA1!".repeat(11));
    await user.click(visibilityIcon);

    expect(input).toHaveAttribute("type", "text");
  });

  test("VisibilityOffアイコンをクリックするとtype=passwordで表示される", async () => {
    const { user } = setup();
    const input = getPasswordInput();
    const visibilityIcon = screen.getByRole("button", {
      name: LABELS.visibilityIcon,
    });

    await user.type(input, "aA1!".repeat(11));
    await user.click(visibilityIcon);

    const visibilityOffIcon = screen.getByRole("button", {
      name: LABELS.visibilityOffIcon,
    });

    await user.click(visibilityOffIcon);

    expect(input).toHaveAttribute("type", "password");
  });
});

describe("メールアドレスのテキスト入力", () => {
  test("メールアドレスのテキスト入力が表示される", () => {
    setup();

    expect(screen.getByRole("textbox", { name: LABELS.email })).toBeVisible();
  });

  test("初期値は空である", () => {
    setup();

    expect(getEmailInput()).toHaveValue("");
  });

  test("必須である", () => {
    setup();

    expect(getEmailInput()).toBeRequired();
  });

  test("エラーの時エラーが表示される", async () => {
    const { user } = setup();
    const input = getEmailInput();

    await user.type(input, "a");
    await user.clear(input);

    expect(input).toHaveAccessibleDescription(ERRORS.email.required);
  });
});

describe("新規登録", () => {
  test("新規登録ボタンが表示される", () => {
    setup();

    expect(screen.getByRole("button", { name: BUTTONS.create })).toBeVisible();
  });

  test("入力項目がエラーのときにクリックするとエラーが表示される", async () => {
    const { user } = setup();

    await user.click(getCreateButton());

    expect(getUserNameInput()).toHaveAccessibleDescription(
      ERRORS.userName.required,
    );
  });
});
