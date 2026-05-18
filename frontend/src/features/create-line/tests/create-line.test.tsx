import { render, screen } from "@testing-library/react";
import CreateLine from "../views/create-line";

describe("タイトルのテキスト入力", () => {
  test("タイトルのテキスト入力が表示される", () => {
    render(<CreateLine />);

    expect(screen.getByRole("textbox", { name: "タイトル" })).toBeVisible();
  });
});
