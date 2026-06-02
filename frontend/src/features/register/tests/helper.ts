import { screen } from "@testing-library/dom";
import { LABELS } from "./constants";

export const getUserNameInput = () => {
  return screen.getByRole("textbox", { name: LABELS.userName });
};

export const getPasswordInput = () => {
  return screen.getByLabelText(LABELS.password);
};
