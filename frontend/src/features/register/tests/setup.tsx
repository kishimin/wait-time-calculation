import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { SnackbarContextProvider } from "../../../providers/snackbar";
import { UserContextProvider } from "../../../providers/user";
import Register from "../views/register";

export const setup = () => {
  const user = userEvent.setup();
  const queryClient = new QueryClient();

  render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <SnackbarContextProvider>
          <UserContextProvider>
            <Register />
          </UserContextProvider>
        </SnackbarContextProvider>
      </QueryClientProvider>
    </MemoryRouter>,
  );

  return { user };
};
