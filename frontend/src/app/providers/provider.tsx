import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { queryConfig } from "../../lib/react-query";
import { SnackbarContextProvider } from "../../providers/snackbar";
import { UserContextProvider } from "../../providers/user";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: queryConfig,
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarContextProvider>
        <UserContextProvider>{children}</UserContextProvider>
      </SnackbarContextProvider>
    </QueryClientProvider>
  );
};
