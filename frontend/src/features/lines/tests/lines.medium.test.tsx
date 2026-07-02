import { screen, within } from "@testing-library/react";
import { delay } from "msw";
import { getGetApiLineMockHandler } from "../../../api/endpoints/line/line.msw";
import {
  getPostApiLineEntryMockHandler,
  getPutApiLineEntryIdMockHandler,
} from "../../../api/endpoints/line-entry/line-entry.msw";
import { server } from "../../../api/mocks/server";
import { BUTTONS } from "./constants";
import { enterLines, exitLines } from "./data";
import { setup } from "./setup";

describe("初期表示", () => {
  test("ローディングが表示される", () => {
    setup();

    expect(screen.getByRole("progressbar")).toBeVisible();
  });
});

describe("初期ローディング後の表示", () => {
  test("一覧がリストで表示される", async () => {
    setup();

    expect(await screen.findByRole("list")).toBeVisible();
  });

  test("タイトルが表示される", async () => {
    setup();
    const lines = await screen.findAllByRole("listitem");

    expect(lines[0]).toHaveTextContent("タイトル");
  });

  test("平均待ち時間がh時m分s秒で表示される", async () => {
    setup();
    const lines = await screen.findAllByRole("listitem");

    expect(lines[0]).toHaveTextContent("3時間4分2秒");
  });

  test("入場していない時、入場ボタンが表示される", async () => {
    setup();
    const lines = await screen.findAllByRole("listitem");
    const enterButton = within(lines[0]).getByRole("button", {
      name: BUTTONS.ENTER,
    });

    expect(enterButton).toBeVisible();
  });

  test("入場中の時、退場ボタンが表示される", async () => {
    setup({ lines: exitLines });
    const lines = await screen.findAllByRole("listitem");
    const enterButton = within(lines[0]).getByRole("button", {
      name: BUTTONS.EXIT,
    });

    expect(enterButton).toBeVisible();
  });
});

describe("入退場", () => {
  test("入場ボタンをクリックすると、ローディングが表示される", async () => {
    const { user } = setup();
    const lines = await screen.findAllByRole("listitem");
    const enterButton = within(lines[0]).getByRole("button", {
      name: BUTTONS.ENTER,
    });
    server.use(
      getPostApiLineEntryMockHandler(async () => {
        await delay(1000);
        return { enteredAt: "", id: "1" };
      }),
    );

    await user.click(enterButton);

    expect(screen.getByRole("progressbar")).toBeVisible();
  });

  test("入場ボタンをクリックすると、リストが表示されない", async () => {
    const { user } = setup();
    const lines = await screen.findAllByRole("listitem");
    const enterButton = within(lines[0]).getByRole("button", {
      name: BUTTONS.ENTER,
    });
    server.use(
      getPostApiLineEntryMockHandler(async () => {
        await delay(1000);
        return { enteredAt: "", id: "1" };
      }),
    );

    await user.click(enterButton);

    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  test("入場したら、退場ボタンに切り替わる", async () => {
    const { user } = setup();
    const lines = await screen.findAllByRole("listitem");
    const entryButton = within(lines[0]).getByRole("button");
    server.use(getPostApiLineEntryMockHandler());
    server.use(getGetApiLineMockHandler(exitLines));

    await user.click(entryButton);

    expect(entryButton).toHaveTextContent(BUTTONS.EXIT);
  });

  describe("入場中", () => {
    test("退場ボタンをクリックすると、ローディングが表示される", async () => {
      const { user } = setup({ lines: exitLines });
      const lines = await screen.findAllByRole("listitem");
      const exitButton = within(lines[0]).getByRole("button", {
        name: BUTTONS.EXIT,
      });
      server.use(
        getPutApiLineEntryIdMockHandler(async () => {
          await delay(1000);
          return {};
        }),
      );

      await user.click(exitButton);

      expect(screen.getByRole("progressbar")).toBeVisible();
    });

    test("退場したら、入場ボタンに切り替わる", async () => {
      const { user } = setup({ lines: exitLines });
      const lines = await screen.findAllByRole("listitem");
      const entryButton = within(lines[0]).getByRole("button");
      server.use(getPostApiLineEntryMockHandler());
      server.use(getGetApiLineMockHandler(enterLines));

      await user.click(entryButton);

      expect(entryButton).toHaveTextContent(BUTTONS.ENTER);
    });
  });
});
