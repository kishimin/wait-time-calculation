import { createContext } from "react";
import type { SnackbarContextType } from "../types/snackbar";

export const SnackbarContext = createContext<SnackbarContextType | null>(null);
