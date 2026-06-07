import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { SnackbarContextProvider } from "../../../providers/snackbar";
import { UserContextProvider } from "../../../providers/user";
import { RouterContents } from "../../routes/router";

export const setup = (path = "/") => {
  const queryClient = new QueryClient();
  const user = userEvent.setup();

  render(
    <MemoryRouter initialEntries={[path]}>
      <QueryClientProvider client={queryClient}>
        <SnackbarContextProvider>
          <UserContextProvider>
            <RouterContents />
          </UserContextProvider>
        </SnackbarContextProvider>
      </QueryClientProvider>
      ,
    </MemoryRouter>,
  );

  return { user };
};
