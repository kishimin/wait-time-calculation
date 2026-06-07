import { useContext } from "react";
import type { UserContextType } from "../types/user";
import { UserContext } from "./user-context";

export const useUser = () => {
  const context = useContext<UserContextType | null>(UserContext);

  if (!context) {
    throw new Error("useUser must be used within UserContextProvider");
  }

  return context;
};
