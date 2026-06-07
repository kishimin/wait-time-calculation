import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import { TopBar } from "./top-bar";

test("ヘッダーが表示される", () => {
  render(<TopBar />);

  expect(screen.getByRole("banner")).toBeVisible();
});

test("まちログと表示される", () => {
  render(<TopBar />);

  expect(screen.getByRole("heading", { name: "まちログ" })).toBeVisible();
});

test("まちログのロゴ画像が表示される", () => {
  render(<TopBar />);

  expect(screen.getByRole("img")).toBeVisible();
});
