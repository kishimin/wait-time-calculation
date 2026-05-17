import { Button, CircularProgress, List, ListItem } from "@mui/material";
import { useGetApiLine } from "../../../api/endpoints/line/line";
import { usePostApiLineEntry } from "../../../api/endpoints/line-entry/line-entry";
import { formatDuration } from "../../../utils/time";

const Lines = () => {
  const { isLoading, data = [] } = useGetApiLine();
  const { isPending, mutate } = usePostApiLineEntry();

  const handleClickEnterButton = (id: string) => {
    mutate({ data: id });

    // 再取得
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
