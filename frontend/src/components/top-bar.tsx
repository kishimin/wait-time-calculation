import { AppBar, Box, Button, Typography } from "@mui/material";
import { Link } from "react-router";
import { useUser } from "../hooks/use-user";
import LogoImage from "../images/QueueLogImage.png";
import { PATHS } from "../types/paths";

export const TopBar = () => {
  const { isLoggedIn, user, logout } = useUser();

  return (
    <AppBar position={"static"}>
      <Typography variant={"h1"}>{"まちログ"}</Typography>
      <Box component={"img"} src={LogoImage} />

      {isLoggedIn() ? (
        <>
          <Typography variant={"h2"}>{user?.userName}</Typography>
          <Button
            onClick={() => {
              void logout();
            }}
          >
            {"ログアウト"}
          </Button>
        </>
      ) : (
        <>
          <Link to={PATHS.register}>{"新規登録"}</Link>
          <Link to={PATHS.login}>{"ログイン"}</Link>
        </>
      )}
    </AppBar>
  );
};
