import { Button, CircularProgress, List, ListItem } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import {
  getGetApiLineQueryKey,
  useGetApiLine,
} from "../../../api/endpoints/line/line";
import {
  usePostApiLineEntry,
  usePutApiLineEntryId,
} from "../../../api/endpoints/line-entry/line-entry";
import { TopBar } from "../../../components/top-bar";
import { formatDuration } from "../../../utils/time";
import type { Line } from "../types/lines";

const Lines = () => {
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

  return (
    <>
      <TopBar />

      {isLoading || isEnterPending || isExitPending ? (
        <CircularProgress />
      ) : (
        <List>
          {data.map((line) => (
            <ListItem
              key={line.id}
              secondaryAction={
                line.currentLineEntryId ? (
                  <Button
                    onClick={() =>
                      handleClickExitButton(line.currentLineEntryId ?? "")
                    }
                  >
                    {"退場"}
                  </Button>
                ) : (
                  <Button onClick={() => handleClickEnterButton(line.id ?? "")}>
                    {"入場"}
                  </Button>
                )
              }
            >
              {line.title}
              {line.averageWaitTime && formatDuration(line.averageWaitTime)}
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
};

export default Lines;
