import { render, screen } from "@testing-library/react";
import CreateLine from "../views/create-line";

const LABELS = {
  TITLE: "タイトル",
} as const;

const setup = () => {
  render(<CreateLine />);
};

describe("タイトルのテキスト入力", () => {
  test("タイトルのテキスト入力が表示される", () => {
    setup();

    expect(screen.getByRole("textbox", { name: LABELS.TITLE })).toBeVisible();
  });

  test("初期値は空である", () => {
    setup();

    expect(
      screen.getByRole("textbox", { name: LABELS.TITLE }),
    ).toHaveTextContent("");
  });

  test("必須マークが表示される", () => {
    setup();

    expect(screen.getByRole("textbox", { name: LABELS.TITLE })).toBeRequired();
  });
});
