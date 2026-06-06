import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { delay } from "msw";
import { MemoryRouter } from "react-router";
import { getPostApiLineMockHandler } from "../../../api/endpoints/line/line.msw";
import { server } from "../../../api/mocks/server";
import { SnackbarContextProvider } from "../../../providers/snackbar";
import CreateLine from "../views/create-line";
import { getCreateButton, getTitleInput } from "./helper";

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

describe("作成", () => {
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
