import { render, screen, within } from "@testing-library/react";
import Lines from "../views/lines";
import userEvent from "@testing-library/user-event";

const setup = () => {
  const user = userEvent.setup();
  render(<Lines />);

  return { user };
};

test("一覧がリストで表示される", () => {
  setup();

  expect(screen.getByRole("list")).toBeVisible();
});

test("タイトルが表示される", () => {
  setup();
  const lines = screen.getAllByRole("listitem");

  expect(lines[0]).toHaveTextContent("タイトル");
});

test("平均待ち時間が表示される", () => {
  setup();
  const lines = screen.getAllByRole("listitem");

  expect(lines[0]).toHaveTextContent("1");
});

test("入場、退場ボタンが表示される", () => {
  setup();
  const lines = screen.getAllByRole("listitem");
  const entryButton = within(lines[0]).getByRole("button", { name: "入場" });

  expect(entryButton).toBeVisible();
});

test("入場中の時、退場ボタンが表示される", () => {
  setup();
  const lines = screen.getAllByRole("listitem");
  const exitButton = within(lines[1]).getByRole("button", { name: "退場" });

  expect(exitButton).toBeVisible();
});

test("入場ボタンをクリックすると、退場に切り替わる", async () => {
  const { user } = setup();
  const lines = screen.getAllByRole("listitem");
  const entryButton = within(lines[0]).getByRole("button");

  await user.click(entryButton);

  expect(entryButton).toHaveTextContent("退場");
});
