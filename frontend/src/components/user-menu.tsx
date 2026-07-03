import { Box, Button, Stack, Typography } from "@mui/material";

type Props = {
  userName: string;
  onClickLogout: () => void;
};

export const UserMenu = (props: Props) => {
  const { onClickLogout, userName } = props;

  return (
    <Box>
      <Stack direction={"row"} sx={{ alignItems: "center" }} spacing={2}>
        <Typography variant={"subtitle1"}>{userName}</Typography>
        <Button onClick={onClickLogout} color={"secondary"}>
          {"ログアウト"}
        </Button>
      </Stack>
    </Box>
  );
};
