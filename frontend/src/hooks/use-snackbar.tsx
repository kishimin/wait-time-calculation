import { useContext } from "react";
import { type SnackbarContextValue } from "../types/snackbar";
import { SnackbarContext } from "./snackbar-context";

export const useSnackbar = () => {
  const context = useContext<SnackbarContextValue | null>(SnackbarContext);

  if (!context) {
    throw new Error("useSnackbar must be used within SnackbarProvider");
  }

  return context;
};
