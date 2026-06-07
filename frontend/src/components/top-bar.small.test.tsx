import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import { TopBar } from "./top-bar";

test("まちログと表示される", () => {
  render(<TopBar />);

  expect(screen.getByRole("heading", { name: "まちログ" })).toBeVisible();
});
