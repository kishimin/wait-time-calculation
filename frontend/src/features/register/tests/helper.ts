import { screen } from "@testing-library/dom";
import { BUTTONS, LABELS } from "./constants";

export const getUserNameInput = () => {
  return screen.getByRole("textbox", { name: LABELS.userName });
};

export const getPasswordInput = () => {
  return screen.getByLabelText(LABELS.password);
};

export const getEmailInput = () => {
  return screen.getByRole("textbox", { name: LABELS.email });
};

export const getRegisterButton = () => {
  return screen.getByRole("button", { name: BUTTONS.register });
};
