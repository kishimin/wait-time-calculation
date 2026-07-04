import { Box, Stack } from "@mui/material";
import { Link } from "react-router";
import { PATHS } from "../types/paths";

export const GuestMenu = () => {
  return (
    <Box>
      <Stack direction={"row"} spacing={2}>
        <Link to={PATHS.register}>{"新規登録"}</Link>
        <Link to={PATHS.login}>{"ログイン"}</Link>
      </Stack>
    </Box>
  );
};
