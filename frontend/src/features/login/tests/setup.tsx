import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../views/login";

export const setup = () => {
  const user = userEvent.setup();

  render(<Login />);

  return { user };
};
