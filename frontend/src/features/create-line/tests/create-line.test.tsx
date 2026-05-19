import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateLine from "../views/create-line";

const LABELS = {
  TITLE: "タイトル",
  EXPLANATION: "説明",
} as const;

const setup = () => {
  const user = userEvent.setup();

  render(<CreateLine />);

  return { user };
};

const getTitleInput = () => {
  return screen.getByRole("textbox", { name: LABELS.TITLE });
};

const getExplanationInput = () => {
  return screen.getByRole("textbox", { name: LABELS.EXPLANATION });
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

  test("101文字以上の時、エラーが表示される", async () => {
    const { user } = setup();
    const titleInput = getTitleInput();

    await user.type(titleInput, "あ".repeat(101));

    expect(
      screen.getByText("タイトルは100文字以内で入力してください"),
    ).toBeVisible();
  });
});

describe("説明のテキスト入力", () => {
  test("説明のテキスト入力が表示される", () => {
    setup();

    expect(screen.getByRole("textbox", { name: "説明" })).toBeVisible();
  });

  test("初期値は空である", () => {
    setup();

    expect(getExplanationInput()).toHaveTextContent("");
  });
});
