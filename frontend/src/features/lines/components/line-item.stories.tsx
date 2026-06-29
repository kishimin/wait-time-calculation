import type { Meta, StoryObj } from "@storybook/react-vite";
import { LineItem } from "./line-item";

const meta = {
  args: {
    // TODO:モックの仕方
    onEnter: () => void 0,
    onExit: () => void 0,
  },
  component: LineItem,
} satisfies Meta<typeof LineItem>;

export default meta;
type Story = StoryObj<typeof meta>;

/** デフォルトの待ち対象の状態 */
export const Basic: Story = {
  args: {
    line: {
      id: crypto.randomUUID(),
      title: "タイトル",
      averageWaitTime: 1,
      currentLineEntryId: null,
    },
  },
};

/** 平均待ち時間がnullの状態 */
export const AverageWaitTimeNull: Story = {
  args: {
    line: {
      id: crypto.randomUUID(),
      title: "タイトル",
      averageWaitTime: null,
      currentLineEntryId: null,
    },
  },
};

/** 退場時の状態 */
export const Exit: Story = {
  args: {
    line: {
      id: crypto.randomUUID(),
      title: "タイトル",
      averageWaitTime: 1,
      currentLineEntryId: crypto.randomUUID(),
    },
  },
};

/** 最小の境界値の状態 */
export const MinBoundaryValues: Story = {
  args: {
    line: {
      id: crypto.randomUUID(),
      title: "a",
      averageWaitTime: 0,
      currentLineEntryId: null,
    },
  },
};

/** 最大の境界値の値の状態 */
export const MaxBoundaryValues: Story = {
  args: {
    line: {
      id: crypto.randomUUID(),
      title: "あ".repeat(100),
      // 平均待ち時間はv2以降で1日を限度とする
      averageWaitTime: 24 * 60 * 60,
      currentLineEntryId: null,
    },
  },
};

/** 文字が英字のみで最大の文字数の状態 */
export const EnglishMaxLength: Story = {
  args: {
    line: {
      id: crypto.randomUUID(),
      title: "A".repeat(100),
      // 平均待ち時間はv2以降で1日を限度とする
      averageWaitTime: 24 * 60 * 60,
      currentLineEntryId: null,
    },
  },
};
