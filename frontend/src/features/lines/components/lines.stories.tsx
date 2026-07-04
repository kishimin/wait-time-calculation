import { Box } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import type { Line } from "../types/line";
import { Lines } from "./lines";

const meta = {
  args: {
    onEnter: () => fn(),
    onExit: () => fn(),
  },
  component: Lines,
  decorators: [
    (Story) => (
      <Box sx={{ width: "375px" }}>
        <Story />
      </Box>
    ),
  ],
  title: "features/lines/components/Lines",
} satisfies Meta<typeof Lines>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 待ち対象が1件以上ある状態 */
export const Basic: Story = {
  args: {
    lines: [
      {
        id: crypto.randomUUID(),
        title: "タイトル",
        averageWaitTime: 1,
        currentLineEntryId: null,
      },
    ],
  },
};

/** 待ち対象が0件の状態 */
export const Empty: Story = {
  args: {
    lines: [],
  },
};

/** 待ち対象が1000件の状態 */
export const ManyLines: Story = {
  args: {
    lines: Array.from(
      { length: 1000 },
      (_, index): Line => ({
        id: index.toString(),
        title: `行列 ${index + 1}`,
        averageWaitTime: index % 5 === 0 ? null : index * 60,
        currentLineEntryId: index % 2 === 0 ? `entry-${index}` : null,
      }),
    ),
  },
};
