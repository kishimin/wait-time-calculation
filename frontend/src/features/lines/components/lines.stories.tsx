import type { Meta, StoryObj } from "@storybook/react-vite";
import { Lines } from "./lines";

const meta = {
  args: {
    // TODO:モックの仕方
    onEnter: () => void 0,
    onExit: () => void 0,
  },
  component: Lines,
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

/** 待ち対象が1万件の状態 */
export const ManyLines: Story = {
  args: {
    // TODO: 1万件の配列を作成する
    lines: [],
  },
};
