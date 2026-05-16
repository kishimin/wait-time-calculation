import { render, screen } from "@testing-library/react";
import Lines from "../views/lines";

const setup = () => {
  render(<Lines />);
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
