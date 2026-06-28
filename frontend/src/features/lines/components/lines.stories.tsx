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

/** デフォルトの待ち対象の状態 */
export const Basic: Story = {
  args: {
    lines: [
      {
        id: crypto.randomUUID(),
        title: "タイトル",
        averageWaitTime: null,
        currentLineEntryId: null,
      },
    ],
  },
};

/** 待ち対象が0件のとき */
export const Empty: Story = {
  args: {
    lines: [],
  },
};

/** 待ち対象が1万件のとき */
export const ManyLines: Story = {
  args: {
    // TODO: 1万件の配列を作成する
    lines: [],
  },
};

/** 平均待ち時間がnullのとき */

/** 平均待ち時間が0のとき */

/** 平均待ち時間が1以上のとき */

/** 退場時のとき */
