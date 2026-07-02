import { Button, CircularProgress } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import {
  getGetApiLineQueryKey,
  useGetApiLine,
} from "../../../api/endpoints/line/line";
import {
  usePostApiLineEntry,
  usePutApiLineEntryId,
} from "../../../api/endpoints/line-entry/line-entry";
import { TopBar } from "../../../components/top-bar";
import { PATHS } from "../../../types/paths";
import { Lines } from "../components/lines";
import type { Line } from "../types/line";

const LinesPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading, data = [] } = useGetApiLine({
    query: {
      select: (data): Line[] =>
        data.map((line) => ({
          id: line.id ?? crypto.randomUUID(),
          title: line.title ?? "",
          averageWaitTime: line.averageWaitTime ?? null,
          currentLineEntryId: line.currentLineEntryId ?? null,
        })),
    },
  });
  const { isPending: isEnterPending, mutate: enter } = usePostApiLineEntry({
    mutation: {
      onSuccess: async () => {
        // 一覧を再取得
        await queryClient.invalidateQueries({
          queryKey: getGetApiLineQueryKey(),
        });
      },
    },
  });
  const { isPending: isExitPending, mutate: exit } = usePutApiLineEntryId({
    mutation: {
      onSuccess: async () => {
        // 一覧を再取得
        await queryClient.invalidateQueries({
          queryKey: getGetApiLineQueryKey(),
        });
      },
    },
  });

  const handleClickEnterButton = (id: string) => {
    enter({ data: id });
  };

  const handleClickExitButton = (lineEntryId: string) => {
    exit({ id: lineEntryId });
  };

  const handleClickCreateButton = async () => {
    await navigate(PATHS.create);
  };

  return (
    <>
      <TopBar />

      {isLoading || isEnterPending || isExitPending ? (
        <CircularProgress />
      ) : (
        <Lines
          lines={data}
          onEnter={handleClickEnterButton}
          onExit={handleClickExitButton}
        />
      )}

      <Button
        onClick={() => {
          void handleClickCreateButton();
        }}
      >
        {"作成"}
      </Button>
    </>
  );
};

export default LinesPage;
