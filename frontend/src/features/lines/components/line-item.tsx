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
  const { currentLineEntryId, id, averageWaitTime, title } = line;

  return (
    <ListItem
      secondaryAction={
        currentLineEntryId ? (
          <Button onClick={() => onExit(currentLineEntryId)}>{"退場"}</Button>
        ) : (
          <Button onClick={() => onEnter(id)}>{"入場"}</Button>
        )
      }
    >
      <Stack spacing={2} direction={"row"} sx={{ width: "100%", minWidth: 0 }}>
        <Typography
          sx={{
            flex: 1,
            minWidth: 0,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </Typography>
        <Typography sx={{ flexShrink: 0 }}>
          {averageWaitTime !== null && formatDuration(averageWaitTime)}
        </Typography>
      </Stack>
    </ListItem>
  );
};
