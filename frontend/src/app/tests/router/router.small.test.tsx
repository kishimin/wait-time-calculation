import { screen } from "@testing-library/react";
import { setup } from "./setup";

describe("ルート", () => {
  test("一覧画面のルートが/である", async () => {
    setup();

    expect(await screen.findByRole("list")).toBeVisible();
  });

  test("新規登録画面のルートは/registerである", () => {
    setup("/register");

    expect(screen.getByRole("button", { name: "新規登録" })).toBeVisible();
  });

  test("ログイン画面のルートは/loginである", () => {
    setup("/login");

    expect(screen.getByRole("button", { name: "ログイン" })).toBeVisible();
  });
});
