import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { RouterContents } from "../routes/router";

const setup = (path = "/") => {
  const queryClient = new QueryClient();
  const user = userEvent.setup();

  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[path]}>
        <RouterContents />
      </MemoryRouter>
    </QueryClientProvider>,
  );

  return { user };
};

test("一覧画面のルートが/である", async () => {
  setup();

  expect(await screen.findByRole("list")).toBeVisible();
});

test("作成画面のルートは、/createである", () => {
  setup("/create");

  expect(screen.getByRole("button", { name: "作成" })).toBeVisible();
});

test("作成が成功すると、一覧画面に遷移する", async () => {
  const { user } = setup("/create");

  await user.type(screen.getByRole("textbox", { name: "タイトル" }), "あ");
  await user.click(screen.getByRole("button", { name: "作成" }));

  expect(await screen.findByRole("list")).toBeVisible();
});
