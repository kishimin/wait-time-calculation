import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { SnackbarContextProvider } from "../providers/snackbar";
import { UserContextProvider } from "../providers/user";
import { TopBar } from "./top-bar";

const setup = () => {
  const user = userEvent.setup();
  const queryClient = new QueryClient();

  render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <SnackbarContextProvider>
          <UserContextProvider>
            <TopBar />
          </UserContextProvider>
        </SnackbarContextProvider>
      </QueryClientProvider>
      ,
    </MemoryRouter>,
  );

  return { user };
};

test("ヘッダーが表示される", () => {
  setup();

  expect(screen.getByRole("banner")).toBeVisible();
});

test("まちログと表示される", () => {
  setup();

  expect(screen.getByRole("heading", { name: "まちログ" })).toBeVisible();
});

test("まちログのロゴ画像が表示される", () => {
  setup();

  expect(screen.getByRole("img")).toBeVisible();
});
