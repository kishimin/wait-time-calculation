import { Box } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router";
import { SnackbarContextProvider } from "../providers/snackbar";
import { UserContextProvider } from "../providers/user";
import { TopBar } from "./top-bar";

const queryClient = new QueryClient();

const meta = {
  component: TopBar,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <SnackbarContextProvider>
            <UserContextProvider>
              <Box sx={{ width: "375px" }}>
                <Story />
              </Box>
            </UserContextProvider>
          </SnackbarContextProvider>
        </QueryClientProvider>
      </MemoryRouter>
    ),
  ],
  title: "components/TopBar",
} satisfies Meta<typeof TopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** デフォルトの状態 */
export const Default: Story = {};
