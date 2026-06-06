import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { delay } from "msw";
import { MemoryRouter } from "react-router";
import { getPostApiUserRegisterMockHandler } from "../../../api/endpoints/user/user.msw";
import { server } from "../../../api/mocks/server";
import Register from "../views/register";
import {
  getRegisterButton,
  getEmailInput,
  getPasswordInput,
  getUserNameInput,
} from "./helper";

const setup = () => {
  const user = userEvent.setup();
  const queryClient = new QueryClient();

  render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <Register />
      </QueryClientProvider>
    </MemoryRouter>,
  );

  return { user };
};

describe("新規登録", () => {
  test("入力項目にエラーが無い時にクリックするとローディングが表示される", async () => {
    const { user } = setup();
    server.use(
      getPostApiUserRegisterMockHandler(async () => {
        await delay(1000);
        return {};
      }),
    );

    await user.type(getUserNameInput(), "a");
    await user.type(getPasswordInput(), "aA1!".repeat(11));
    await user.type(getEmailInput(), "a@gmail.com");
    await user.click(getRegisterButton());

    expect(screen.getByRole("progressbar")).toBeVisible();
  });

  test("ローディング中は画面全体がローディングとなる", async () => {
    const { user } = setup();
    server.use(
      getPostApiUserRegisterMockHandler(async () => {
        await delay(1000);
        return {};
      }),
    );

    await user.type(getUserNameInput(), "a");
    await user.type(getPasswordInput(), "aA1!".repeat(11));
    await user.type(getEmailInput(), "a@gmail.com");
    await user.click(getRegisterButton());

    await waitFor(() => {
      expect(
        screen.queryByRole("form", { name: "新規登録フォーム" }),
      ).not.toBeInTheDocument();
    });
  });
});
