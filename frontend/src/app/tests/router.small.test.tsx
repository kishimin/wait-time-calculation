import { screen } from "@testing-library/react";
import { setup } from "./setup";

describe("ルート", () => {
  test("一覧画面のルートが/である", async () => {
    setup();

    expect(await screen.findByRole("list")).toBeVisible();
  });

  test("作成画面のルートは、/createである", () => {
    setup("/create");

    expect(screen.getByRole("button", { name: "作成" })).toBeVisible();
  });

  test("新規登録画面のルートは/registerである", () => {
    setup("/register");

    expect(screen.getByRole("button", { name: "新規登録" })).toBeVisible();
  });
});
