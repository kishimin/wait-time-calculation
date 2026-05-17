import { Button, CircularProgress, List, ListItem } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import {
  getGetApiLineQueryKey,
  useGetApiLine,
} from "../../../api/endpoints/line/line";
import { usePostApiLineEntry } from "../../../api/endpoints/line-entry/line-entry";
import type { LinesResponseDto } from "../../../models";
import { formatDuration } from "../../../utils/time";

const Lines = () => {
  const queryClient = useQueryClient();
  const { isLoading, data = [] } = useGetApiLine();
  const { isPending, mutate } = usePostApiLineEntry();

  const handleClickEntryButton = (id?: string) => {
    mutate({ data: id ?? "" });

    queryClient.setQueryData(
      getGetApiLineQueryKey(),
      (prev: LinesResponseDto[] = []) =>
        prev.map((line) =>
          line.id === id ? { ...line, isEntry: !line.isEntry } : line,
        ),
    );
  };

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <List>
          {data.map((line) => (
            <ListItem
              key={line.id}
              secondaryAction={
                isPending ? (
                  <CircularProgress />
                ) : (
                  <Button onClick={() => handleClickEntryButton(line.id)}>
                    {line.isEntry ? "退場" : "入場"}
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
