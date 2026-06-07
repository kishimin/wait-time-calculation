import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
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

describe("ルート", () => {
  test("一覧画面のルートが/である", async () => {
    setup();

    expect(await screen.findByRole("list")).toBeVisible();
  });

  test("作成画面のルートは、/createである", () => {
    setup("/create");

    expect(screen.getByRole("button", { name: "作成" })).toBeVisible();
  });

  test("新規登録画面のルートは/registerである", () => {
    setup("/register");

    expect(screen.getByRole("button", { name: "新規登録" })).toBeVisible();
  });
});
