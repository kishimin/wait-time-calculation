import { Button, ListItem, Stack, Typography } from "@mui/material";
import { formatDuration } from "../../../utils/time";
import type { Line } from "../types/lines";

type Props = {
  /** 待ち対象 */
  line: Line;
  /** 入場時の処理 */
  onEnter: (lineEntryId: string) => void;
  /** 退場時の処理 */
  onExit: (id: string) => void;
};

export const LineItem = (props: Props) => {
  const { line, onEnter, onExit } = props;

  return (
    <ListItem
      secondaryAction={
        line.currentLineEntryId ? (
          // TODO: line.currentLineEntryIdでいいと思う
          <Button onClick={() => onExit(line.currentLineEntryId ?? "")}>
            {"退場"}
          </Button>
        ) : (
          <Button onClick={() => onEnter(line.id)}>{"入場"}</Button>
        )
      }
    >
      <Stack spacing={2} direction={"row"}>
        <Typography>{line.title}</Typography>
        <Typography>
          {line.averageWaitTime !== null &&
            formatDuration(line.averageWaitTime)}
        </Typography>
      </Stack>
    </ListItem>
  );
};
