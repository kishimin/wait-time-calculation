import { Box } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { TopBar } from "./top-bar";

const meta = {
  component: TopBar,
  decorators: [
    (Story) => (
      <Box sx={{ width: "375px" }}>
        <Story />
      </Box>
    ),
  ],
  title: "components/TopBar",
} satisfies Meta<typeof TopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** デフォルトの状態 */
export const Default: Story = {};
