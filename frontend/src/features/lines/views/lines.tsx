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
import { formatDuration } from "../../../utils/time";

const Lines = () => {
  const queryClient = useQueryClient();
  const { isLoading, data = [] } = useGetApiLine();
  const { isPending: isPendingEnter, mutate: enter } = usePostApiLineEntry();
  const { isPending: isPendingExit, mutate: exit } = usePutApiLineEntryId();

  const handleClickEnterButton = async (id: string) => {
    enter({ data: id });

    // 一覧を再取得
    await queryClient.invalidateQueries({
      queryKey: getGetApiLineQueryKey(),
    });
  };

  const handleClickExitButton = async (lineEntryId: string) => {
    exit({ id: lineEntryId });

    // 一覧を再取得
    await queryClient.invalidateQueries({
      queryKey: getGetApiLineQueryKey(),
    });
  };

  return (
    <>
      {isLoading || isPendingEnter || isPendingExit ? (
        <CircularProgress />
      ) : (
        <List>
          {data.map((line) => (
            <ListItem
              key={line.id}
              secondaryAction={
                line.currentLineEntryId ? (
                  <Button
                    onClick={() => {
                      void handleClickExitButton(line.currentLineEntryId ?? "");
                    }}
                  >
                    {"退場"}
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      void handleClickEnterButton(line.id ?? "");
                    }}
                  >
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
