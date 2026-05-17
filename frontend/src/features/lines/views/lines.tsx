import { Button, CircularProgress, List, ListItem } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import {
  getGetApiLineQueryKey,
  useGetApiLine,
} from "../../../api/endpoints/line/line";
import { usePostApiLineEntry } from "../../../api/endpoints/line-entry/line-entry";
import { formatDuration } from "../../../utils/time";

const Lines = () => {
  const queryClient = useQueryClient();
  const { isLoading, data = [] } = useGetApiLine();
  const { isPending, mutate } = usePostApiLineEntry();

  const handleClickEnterButton = async (id: string) => {
    mutate({ data: id });

    await queryClient.invalidateQueries({
      queryKey: getGetApiLineQueryKey(),
    });
  };

  const handleClickExitButton = () => {
    // 退場する
    // 再取得
  };

  return (
    <>
      {isLoading || isPending ? (
        <CircularProgress />
      ) : (
        <List>
          {data.map((line) => (
            <ListItem
              key={line.id}
              secondaryAction={
                line.currentLineEntryId ? (
                  <Button onClick={() => handleClickExitButton()}>
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
