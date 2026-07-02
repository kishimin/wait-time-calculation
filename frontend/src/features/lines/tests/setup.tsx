import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { getGetApiLineMockHandler } from "../../../api/endpoints/line/line.msw";
import { server } from "../../../api/mocks/server";
import { SnackbarContextProvider } from "../../../providers/snackbar";
import { UserContextProvider } from "../../../providers/user";
import type { Line } from "../types/line";
import LinesPage from "../views/lines-page";
import { enterLines } from "./data";

type Props = {
  lines: Line[];
};

export const setup = (props: Props = { lines: enterLines }) => {
  const { lines } = props;

  const user = userEvent.setup();
  const queryClient = new QueryClient();
  server.use(getGetApiLineMockHandler(lines));

  render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <SnackbarContextProvider>
          <UserContextProvider>
            <LinesPage />
          </UserContextProvider>
        </SnackbarContextProvider>
      </QueryClientProvider>
      ,
    </MemoryRouter>,
  );

  return { user };
};
