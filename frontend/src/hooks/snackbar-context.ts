import { createContext } from "react";
import type { SnackbarContextValue } from "../types/snackbar";

export const SnackbarContext = createContext<SnackbarContextValue | null>(null);
