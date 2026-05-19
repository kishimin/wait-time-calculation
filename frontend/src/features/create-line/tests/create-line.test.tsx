import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { delay } from "msw";
import { getPostApiLineMockHandler } from "../../../api/endpoints/line/line.msw";
import { server } from "../../../api/mocks/server";
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

    expect(
      screen.getByRole("textbox", { name: LABELS.EXPLANATION }),
    ).toBeVisible();
  });

  test("初期値は空である", () => {
    setup();

    expect(getExplanationInput()).toHaveTextContent("");
  });

  test("401文字以上の時、エラーが表示される", async () => {
    setup();
    const explanationInput = getExplanationInput();

    // userEventを使用すると、テスト実行時間が長くなるため
    fireEvent.change(explanationInput, { target: { value: "あ".repeat(401) } });

    // エラーが非同期的に表示されるため(userEventの時は、入力から非同期なため必要ない)
    expect(
      await screen.findByText("説明は400文字以内で入力してください"),
    ).toBeVisible();
  });
});

describe("作成", () => {
  test("作成ボタンが表示される", () => {
    setup();

    expect(screen.getByRole("button", { name: "作成" })).toBeVisible();
  });

  test("作成ボタンをクリックするとローディングが表示される", async () => {
    const { user } = setup();
    const createButton = screen.getByRole("button", { name: "作成" });
    server.use(
      getPostApiLineMockHandler(async () => {
        await delay(1000);
        return {};
      }),
    );

    await user.click(createButton);

    expect(screen.getByRole("progressbar")).toBeVisible();
  });
});
