import { render, screen } from "@testing-library/react";
import Register from "../views/register";

describe("ユーザー名のテキスト入力", () => {
  test("ユーザー名のテキスト入力が表示される", () => {
    render(<Register />);

    expect(screen.getByRole("textbox", { name: "ユーザー名" })).toBeVisible();
  });
});
