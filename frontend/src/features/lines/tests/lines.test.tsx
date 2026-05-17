import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { delay } from "msw";
import { getGetApiLineMockHandler } from "../../../api/endpoints/line/line.msw";
import { getPostApiLineEntryMockHandler } from "../../../api/endpoints/line-entry/line-entry.msw";
import { server } from "../../../api/mocks/server";
import type { LinesResponseDto } from "../../../models";
import Lines from "../views/lines";

type LinesResponse = {
  id: string;
  title: string;
  averageWaitTime: number;
  currentLineEntryId: string | null;
};

const defaultLines: LinesResponse[] = [
  {
    id: "",
    averageWaitTime: 11042,
    title: "タイトル",
    currentLineEntryId: null,
  },
];

type Props = {
  lines: LinesResponseDto[];
};

const setup = (props: Props = { lines: defaultLines }) => {
  const { lines } = props;

  const user = userEvent.setup();
  const queryClient = new QueryClient();
  server.use(getGetApiLineMockHandler(lines));

  render(
    <QueryClientProvider client={queryClient}>
      <Lines />
    </QueryClientProvider>,
  );

  return { user };
};

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

    expect(lines[0]).toHaveTextContent(defaultLines[0].title);
  });

  test("平均待ち時間がh時m分s秒で表示される", async () => {
    setup();
    const lines = await screen.findAllByRole("listitem");

    expect(lines[0]).toHaveTextContent("3時間4分2秒");
  });

  test("入場、退場ボタンが表示される", async () => {
    setup();
    const lines = await screen.findAllByRole("listitem");
    const enterButton = within(lines[0]).getByRole("button", { name: "入場" });

    expect(enterButton).toBeVisible();
  });
});

describe("入退場", () => {
  test("入場ボタンをクリックすると、ローディングが表示される", async () => {
    const { user } = setup();
    const lines = await screen.findAllByRole("listitem");
    const entryButton = within(lines[0]).getByRole("button");
    server.use(
      getPostApiLineEntryMockHandler(async () => {
        await delay(1000);
        return { enteredAt: "", id: "1" };
      }),
    );

    await user.click(entryButton);

    expect(screen.getByRole("progressbar")).toBeVisible();
  });
});
