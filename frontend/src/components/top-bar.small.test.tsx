import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import type { ComponentProps } from "react";
import { TopBar } from "./top-bar";

type Props = ComponentProps<typeof TopBar>;

const defaultProps: Props = {
  isLoggedIn: false,
  userName: "",
};
const setup = (props: Partial<Props> = {}) => {
  render(<TopBar {...defaultProps} {...props} />);
};

test("ヘッダーが表示される", () => {
  setup();

  expect(screen.getByRole("banner")).toBeVisible();
});

test("まちログと表示される", () => {
  setup();

  expect(screen.getByRole("heading", { name: "まちログ" })).toBeVisible();
});

test("まちログのロゴ画像が表示される", () => {
  setup();

  expect(screen.getByRole("img")).toBeVisible();
});

describe("ログイン時", () => {
  test("ユーザー名が表示される", () => {
    const userName = "ユーザー";
    setup({ isLoggedIn: true, userName });

    expect(screen.getByRole("heading", { name: userName })).toBeVisible();
  });

  test("ログアウトボタンが表示される", () => {
    setup({ isLoggedIn: true });

    expect(screen.getByRole("button", { name: "ログアウト" })).toBeVisible();
  });
});
