import { Alert, Snackbar, type SnackbarCloseReason } from "@mui/material";
import { type SyntheticEvent } from "react";
import { useSnackbar } from "../hooks/use-snackbar";

export const SimpleSnackbar = () => {
  const { snackState, toggleSnack } = useSnackbar();

  const handleClose = (
    _?: SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    toggleSnack({ message: "" });
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={Boolean(snackState.message)}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={snackState.severity}>
          {snackState.message}
        </Alert>
      </Snackbar>
    </div>
  );
};
