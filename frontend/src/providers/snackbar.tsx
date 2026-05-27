import { useState, type ReactNode } from "react";
import { SimpleSnackbar } from "../components/simple-snackbar";
import { SnackbarContext } from "../hooks/snackbar-context";
import { type SnackState } from "../types/snackbar";

const initSnackState: SnackState = {
  message: "",
};

type Props = {
  children: ReactNode;
};

export const SnackbarContextProvider = (props: Props) => {
  const { children } = props;

  const [snackState, setSnackState] = useState<SnackState>(initSnackState);

  const toggleSnack = (snackState: SnackState) => {
    setSnackState(snackState);
  };

  return (
    <SnackbarContext.Provider value={{ snackState, toggleSnack }}>
      <SimpleSnackbar />
      {children}
    </SnackbarContext.Provider>
  );
};
