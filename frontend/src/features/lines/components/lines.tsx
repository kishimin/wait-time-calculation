import { Button, List, ListItem } from "@mui/material";
import { formatDuration } from "../../../utils/time";
import type { Line } from "../types/lines";

type Props = {
  /** 待ち対象一覧 */
  lines: Line[];
  /** 入場時の処理 */
  onEnter: (lineEntryId: string) => void;
  /** 退場時の処理 */
  onExit: (id: string) => void;
};

export const Lines = (props: Props) => {
  const { lines, onEnter, onExit } = props;

  return (
    <List>
      {lines.map((line) => (
        <ListItem
          key={line.id}
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
          {line.title}
          {line.averageWaitTime && formatDuration(line.averageWaitTime)}
        </ListItem>
      ))}
    </List>
  );
};
