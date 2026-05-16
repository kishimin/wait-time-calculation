import { Button, CircularProgress, List, ListItem } from "@mui/material";
import { useEffect, useState } from "react";
import { useGetApiLine } from "../../../api/endpoints/line/line";
import type { Line } from "../types/lines";

const Lines = () => {
  const [lines, setLines] = useState<Line[]>([]);
  const { isLoading } = useGetApiLine();

  const handleClickEntryButton = (id: string) => {
    setLines((prevLine) =>
      prevLine.map((line) => {
        if (line.id === id) {
          return { ...line, isEntry: !line.isEntry };
        }

        return line;
      }),
    );
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLines([
      { id: "1", averageWaitTime: 1, title: "タイトル", isEntry: false },
      { id: "2", averageWaitTime: 1, title: "タイトル2", isEntry: true },
    ]);
  }, []);

  return (
    <>
    {isLoading && <CircularProgress />}
      <List>
        {lines.map((line) => (
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
    </>
  );
};

export default Lines;
