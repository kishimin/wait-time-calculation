import { screen, waitFor } from "@testing-library/react";
import { delay } from "msw";
import { getPostApiLineMockHandler } from "../../../api/endpoints/line/line.msw";
import { server } from "../../../api/mocks/server";
import { getCreateButton, getTitleInput } from "./helper";
import { setup } from "./setup";

describe("作成", () => {
  test("タイトルを入力して、作成ボタンをクリックするとローディングが表示される", async () => {
    const { user } = setup();
    const titleInput = getTitleInput();
    const createButton = getCreateButton();
    server.use(
      getPostApiLineMockHandler(async () => {
        await delay(1000);
        return {};
      }),
    );

    await user.type(titleInput, "あ");
    await user.click(createButton);

    expect(screen.getByRole("progressbar")).toBeVisible();
  });

  test("ローディング中は、画面全体がローディングとなる", async () => {
    const { user } = setup();
    const titleInput = getTitleInput();
    const createButton = getCreateButton();
    server.use(
      getPostApiLineMockHandler(async () => {
        await delay(1000);
        return {};
      }),
    );

    await user.type(titleInput, "あ");
    await user.click(createButton);

    await waitFor(() => {
      expect(
        screen.queryByRole("form", { name: "作成フォーム" }),
      ).not.toBeInTheDocument();
    });
  });

  test("作成が成功すると、トーストが表示される", async () => {
    const { user } = setup();
    const titleInput = getTitleInput();
    const createButton = getCreateButton();
    server.use(getPostApiLineMockHandler());

    await user.type(titleInput, "あ");
    await user.click(createButton);

    expect(await screen.findByRole("presentation")).toBeVisible();
  });
});
