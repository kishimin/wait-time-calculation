import { setupServer } from "msw/node";
import { getLineMock } from "../endpoints/line/line.msw";
import { getLineEntryMock } from "../endpoints/line-entry/line-entry.msw";
import { getUserMock } from "../endpoints/user/user.msw";

export const server = setupServer(
  ...getLineMock(),
  ...getLineEntryMock(),
  ...getUserMock(),
);
