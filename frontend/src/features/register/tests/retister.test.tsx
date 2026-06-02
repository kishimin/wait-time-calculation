import { render, screen } from "@testing-library/react";
import Register from "../views/register";
import { LABELS } from "./constants";
import { getUserNameInput } from "./helper";

const setup = () => {
  render(<Register />);
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
});
