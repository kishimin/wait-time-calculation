import { render, screen } from "@testing-library/react";
import CreateLine from "../views/create-line";

describe("タイトルのテキスト入力", () => {
  test("タイトルのテキスト入力が表示される", () => {
    render(<CreateLine />);

    expect(screen.getByRole("textbox", { name: "タイトル" })).toBeVisible();
  });

  test("初期値は空である", () => {
    render(<CreateLine />);

    expect(screen.getByRole("textbox", { name: "タイトル" })).toHaveTextContent(
      "",
    );
  });
});
