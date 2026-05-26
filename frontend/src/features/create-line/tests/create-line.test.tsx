import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { delay } from "msw";
import { MemoryRouter } from "react-router";
import { getPostApiLineMockHandler } from "../../../api/endpoints/line/line.msw";
import { server } from "../../../api/mocks/server";
import { SnackbarContextProvider } from "../../../providers/snackbar";
import CreateLine from "../views/create-line";
import { BUTTONS, LABELS } from "./constants";
import { getCreateButton, getExplanationInput, getTitleInput } from "./helper";

const setup = () => {
  const user = userEvent.setup();
  const queryClient = new QueryClient();

  render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <SnackbarContextProvider>
          <CreateLine />
        </SnackbarContextProvider>
      </QueryClientProvider>
    </MemoryRouter>,
  );

  return { user };
};

describe("タイトルのテキスト入力", () => {
  test("タイトルのテキスト入力が表示される", () => {
    setup();

    expect(screen.getByRole("textbox", { name: LABELS.TITLE })).toBeVisible();
  });

  test("初期値は空である", () => {
    setup();

    expect(getTitleInput()).toHaveValue("");
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

    expect(getExplanationInput()).toHaveValue("");
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

    expect(screen.getByRole("button", { name: BUTTONS.CREATE })).toBeVisible();
  });

  test("タイトルを入力して、作成ボタンをクリックするとローディングが表示される", async () => {
    const { user } = setup();
    const titleInput = getTitleInput();
    const createButton = getCreateButton();
    server.use(
      getPostApiLineMockHandler(async () => {
        await delay(1000);
        return {};
      }),
    );

    await user.type(titleInput, "あ");
    await user.click(createButton);

    expect(screen.getByRole("progressbar")).toBeVisible();
  });

  test("ローディング中は、画面全体がローディングとなる", async () => {
    const { user } = setup();
    const titleInput = getTitleInput();
    const createButton = getCreateButton();
    server.use(
      getPostApiLineMockHandler(async () => {
        await delay(1000);
        return {};
      }),
    );

    await user.type(titleInput, "あ");
    await user.click(createButton);

    await waitFor(() => {
      expect(
        screen.queryByRole("form", { name: "作成フォーム" }),
      ).not.toBeInTheDocument();
    });
  });

  test("入力がエラーの時に、作成ボタンをクリックすると、ローディングが表示されない", async () => {
    const { user } = setup();
    const createButton = getCreateButton();
    server.use(
      getPostApiLineMockHandler(async () => {
        await delay(1000);
        return {};
      }),
    );

    await user.click(createButton);

    await waitFor(() => {
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    });
  });

  test("タイトルが空の時に、作成ボタンをクリックすると、エラーが表示される", async () => {
    const { user } = setup();
    const createButton = getCreateButton();
    server.use(
      getPostApiLineMockHandler(async () => {
        await delay(1000);
        return {};
      }),
    );

    await user.click(createButton);

    expect(screen.getByText("タイトルは必須です")).toBeVisible();
  });

  test("作成が成功すると、トーストが表示される", async () => {
    const { user } = setup();
    const titleInput = getTitleInput();
    const createButton = getCreateButton();
    server.use(getPostApiLineMockHandler());

    await user.type(titleInput, "あ");
    await user.click(createButton);

    expect(await screen.findByRole("presentation")).toBeVisible();
  });
});
