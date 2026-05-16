import { Button, CircularProgress, List, ListItem } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import {
  getGetApiLineQueryKey,
  useGetApiLine,
} from "../../../api/endpoints/line/line";
import type { LinesResponseDto } from "../../../models";

const Lines = () => {
  const queryClient = useQueryClient();
  const { isLoading, data = [] } = useGetApiLine();

  const handleClickEntryButton = (id?: string) => {
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
                <Button onClick={() => handleClickEntryButton(line.id)}>
                  {line.isEntry ? "退場" : "入場"}
                </Button>
              }
            >
              {line.title}
              {line.averageWaitTime}
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
};

export default Lines;
