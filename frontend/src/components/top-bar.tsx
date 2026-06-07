import { AppBar, Box, Button, Typography } from "@mui/material";
import LogoImage from "../../public/images/QueueLogImage.png";

type Props = {
  isLoggedIn: boolean;
  userName: string;
  onLogout: () => void;
  onLogin: () => void;
  onRegister: () => void;
};

export const TopBar = (props: Props) => {
  const { isLoggedIn, userName, onLogin, onLogout, onRegister } = props;

  return (
    <AppBar position={"static"}>
      <Typography variant={"h1"}>{"まちログ"}</Typography>
      <Box component={"img"} src={LogoImage} />

      {isLoggedIn ? (
        <>
          <Typography variant={"h2"}>{userName}</Typography>
          <Button onClick={onLogout}>{"ログアウト"}</Button>
        </>
      ) : (
        <>
          <Button onClick={onRegister}>{"新規登録"}</Button>
          <Button onClick={onLogin}>{"ログイン"}</Button>
        </>
      )}
    </AppBar>
  );
};
