import { Button, List, ListItem } from "@mui/material";
import { useEffect, useState } from "react";
import type { Line } from "../types/lines";

const Lines = () => {
  const [lines, setLines] = useState<Line[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLines([
      { id: "1", averageWaitTime: 1, title: "タイトル", isEntry: false },
      { id: "2", averageWaitTime: 1, title: "タイトル2", isEntry: true },
    ]);
  }, []);

  return (
    <>
      <List>
        {lines.map((line) => (
          <ListItem
            key={line.id}
            secondaryAction={<Button>{line.isEntry ? "退場" : "入場"}</Button>}
          >
            {line.title}
            {line.averageWaitTime}
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default Lines;
