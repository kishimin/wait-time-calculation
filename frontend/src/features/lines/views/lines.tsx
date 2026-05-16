import { Button, List, ListItem } from "@mui/material";
import { useEffect, useState } from "react";
import type { Line } from "../types/lines";

const Lines = () => {
  const [lines, setLines] = useState<Line[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLines([{ id: "", averageWaitTime: 1, title: "タイトル" }]);
  }, []);

  return (
    <>
      <List>
        {lines.map((line) => (
          <ListItem key={line.id} secondaryAction={<Button>{"入場"}</Button>}>
            {line.title}
            {line.averageWaitTime}
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default Lines;
