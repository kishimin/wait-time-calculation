import { render, screen } from "@testing-library/react";
import Lines from "../views/lines";

test("タイトルが表示できる", () => {
  render(<Lines />);

  expect(screen.getByRole("list")).toBeVisible();
});
