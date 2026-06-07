import { AppBar, Box, Button, Typography } from "@mui/material";
import { LOCAL_STORAGE_KEY } from "../types/localstorage";

type Props = {
  isLoggedIn: boolean;
  userName: string;
};

export const TopBar = (props: Props) => {
  const { isLoggedIn, userName } = props;

  const handleClickLogout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY.TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEY.USER);
  };

  return (
    <AppBar position={"static"}>
      <Typography variant={"h1"}>{"まちログ"}</Typography>
      <Box component={"img"} src={"/QueueLogoImage.png"} />

      {isLoggedIn ? (
        <>
          <Typography variant={"h2"}>{userName}</Typography>
          <Button onClick={handleClickLogout}>{"ログアウト"}</Button>
        </>
      ) : (
        <>
          <Button>{"新規登録"}</Button>
          <Button>{"ログイン"}</Button>
        </>
      )}
    </AppBar>
  );
};
