import { screen } from "@testing-library/dom";
import { BUTTONS, LABELS } from "./constants";

export const getTitleInput = () => {
  return screen.getByRole("textbox", { name: LABELS.TITLE });
};

export const getExplanationInput = () => {
  return screen.getByRole("textbox", { name: LABELS.EXPLANATION });
};

export const getCreateButton = () => {
  return screen.getByRole("button", { name: BUTTONS.CREATE });
};
