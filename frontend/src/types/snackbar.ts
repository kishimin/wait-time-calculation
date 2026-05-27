import type { AlertColor } from "@mui/material";

export type SnackbarContextValue = {
  snackState: SnackState;
  toggleSnack: (snackState: SnackState) => void;
};

export type SnackState = {
  message: string;
  severity?: AlertColor;
};
