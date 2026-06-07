import { screen } from "@testing-library/react";
import { getPostApiUserRegisterMockHandler } from "../../api/endpoints/user/user.msw";
import { server } from "../../api/mocks/server";
import { setup } from "./setup";

describe("認証", () => {
  test("新規登録が成功すると一覧画面に遷移する", async () => {
    const { user } = setup("/register");
    server.use(
      getPostApiUserRegisterMockHandler({
        userName: "a",
        email: "a@gmail.com",
        token: "a",
      }),
    );

    await user.type(screen.getByRole("textbox", { name: "ユーザー名" }), "a");
    await user.type(screen.getByLabelText(/パスワード/), "aA1!".repeat(11));
    await user.type(
      screen.getByRole("textbox", { name: "メールアドレス" }),
      "a@gmail.com",
    );
    await user.click(screen.getByRole("button", { name: "新規登録" }));

    expect(await screen.findByRole("list")).toBeVisible();
  });
});

describe("まちログ", () => {
  test("作成が成功すると、一覧画面に遷移する", async () => {
    const { user } = setup("/create");

    await user.type(screen.getByRole("textbox", { name: "タイトル" }), "あ");
    await user.click(screen.getByRole("button", { name: "作成" }));

    expect(await screen.findByRole("list")).toBeVisible();
  });
});
