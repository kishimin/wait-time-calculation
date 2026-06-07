import { screen, waitFor } from "@testing-library/dom";
import { delay } from "msw";
import { getPostApiUserLoginMockHandler } from "../../../api/endpoints/user/user.msw";
import { server } from "../../../api/mocks/server";
import { getLoginButton, getPasswordInput, getUserNameInput } from "./helper";
import { setup } from "./setup";

describe("ログイン", () => {
  test("入力項目にエラーが無い時にクリックするとローディングが表示される", async () => {
    const { user } = setup();
    server.use(
      getPostApiUserLoginMockHandler(async () => {
        await delay(1000);
        return {};
      }),
    );

    await user.type(getUserNameInput(), "a");
    await user.type(getPasswordInput(), "aA1!".repeat(11));
    await user.click(getLoginButton());

    expect(screen.getByRole("progressbar")).toBeVisible();
  });

  test("ローディング中は画面全体がローディングとなる", async () => {
    const { user } = setup();
    server.use(
      getPostApiUserLoginMockHandler(async () => {
        await delay(1000);
        return {};
      }),
    );

    await user.type(getUserNameInput(), "a");
    await user.type(getPasswordInput(), "aA1!".repeat(11));
    await user.click(getLoginButton());

    await waitFor(() => {
      expect(
        screen.queryByRole("form", { name: "ログインフォーム" }),
      ).not.toBeInTheDocument();
    });
  });
});
