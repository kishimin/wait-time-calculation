import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { getPostApiUserRegisterMockHandler } from "../../api/endpoints/user/user.msw";
import { server } from "../../api/mocks/server";
import { SnackbarContextProvider } from "../../providers/snackbar";
import { RouterContents } from "../routes/router";

const setup = (path = "/") => {
  const queryClient = new QueryClient();
  const user = userEvent.setup();

  render(
    <MemoryRouter initialEntries={[path]}>
      <QueryClientProvider client={queryClient}>
        <SnackbarContextProvider>
          <RouterContents />
        </SnackbarContextProvider>
      </QueryClientProvider>
      ,
    </MemoryRouter>,
  );

  return { user };
};

describe("認証", () => {
  test("新規登録が成功すると一覧画面に遷移する", async () => {
    const { user } = setup("/register");
    server.use(
      getPostApiUserRegisterMockHandler({
        userName: "a",
        email: "a@gmail.com",
        token: "a",
      }),
    );

    await user.type(screen.getByRole("textbox", { name: "ユーザー名" }), "a");
    await user.type(screen.getByLabelText(/パスワード/), "aA1!".repeat(11));
    await user.type(
      screen.getByRole("textbox", { name: "メールアドレス" }),
      "a@gmail.com",
    );
    await user.click(screen.getByRole("button", { name: "新規登録" }));

    expect(await screen.findByRole("list")).toBeVisible();
  });
});

describe("まちログ", () => {
  test("作成が成功すると、一覧画面に遷移する", async () => {
    const { user } = setup("/create");

    await user.type(screen.getByRole("textbox", { name: "タイトル" }), "あ");
    await user.click(screen.getByRole("button", { name: "作成" }));

    expect(await screen.findByRole("list")).toBeVisible();
  });
});
