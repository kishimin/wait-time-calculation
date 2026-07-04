import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { UserMenu } from "./user-menu";

const meta = {
  component: UserMenu,
  args: {
    onClickLogout: fn(),
  },
  title: "components/UserMenu",
} satisfies Meta<typeof UserMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

/** デフォルトの状態 */
export const Default: Story = {
  args: { userName: "お名前" },
};
