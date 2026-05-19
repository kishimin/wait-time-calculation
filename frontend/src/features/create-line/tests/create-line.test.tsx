import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateLine from "../views/create-line";

const LABELS = {
  TITLE: "タイトル",
} as const;

const setup = () => {
  const user = userEvent.setup();

  render(<CreateLine />);

  return { user };
};

const getTitleInput = () => {
  return screen.getByRole("textbox", { name: LABELS.TITLE });
};

describe("タイトルのテキスト入力", () => {
  test("タイトルのテキスト入力が表示される", () => {
    setup();

    expect(screen.getByRole("textbox", { name: LABELS.TITLE })).toBeVisible();
  });

  test("初期値は空である", () => {
    setup();

    expect(getTitleInput()).toHaveTextContent("");
  });

  test("必須である", () => {
    setup();

    expect(getTitleInput()).toBeRequired();
  });

  test("空の時、エラーが表示される", async () => {
    const { user } = setup();
    const titleInput = getTitleInput();

    await user.type(titleInput, "あ");
    await user.clear(titleInput);

    expect(screen.getByText("タイトルは必須です")).toBeVisible();
  });
});
