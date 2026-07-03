import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { GuestMenu } from "./guest-menu";

const meta = {
  component: GuestMenu,
  args: {
    onClickLogin: fn(),
    onClickRegister: fn(),
  },
  title: "components/GuestMenu",
} satisfies Meta<typeof GuestMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

/** デフォルトの状態 */
export const Default: Story = {};
