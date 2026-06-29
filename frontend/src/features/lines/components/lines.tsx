import { List } from "@mui/material";
import type { Line } from "../types/lines";
import { LineItem } from "./line-item";

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
        <LineItem key={line.id} line={line} onEnter={onEnter} onExit={onExit} />
      ))}
    </List>
  );
};
