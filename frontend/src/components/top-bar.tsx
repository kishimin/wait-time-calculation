import { AppBar, Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import LogoImage from "../../public/images/QueueLogImage.png";
import { LOCAL_STORAGE_KEY } from "../types/localstorage";
import { PATHS } from "../types/paths";

type Props = {
  isLoggedIn: boolean;
  userName: string;
};

export const TopBar = (props: Props) => {
  const { isLoggedIn, userName } = props;

  const navigate = useNavigate();

  const handleClickLogout = async () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY.TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEY.USER);

    await navigate(PATHS.index);
  };

  const handleClickRegister = async () => {
    await navigate(PATHS.register);
  };

  const handleClickLogin = async () => {
    await navigate(PATHS.login);
  };

  return (
    <AppBar position={"static"}>
      <Typography variant={"h1"}>{"まちログ"}</Typography>
      <Box component={"img"} src={LogoImage} />

      {isLoggedIn ? (
        <>
          <Typography variant={"h2"}>{userName}</Typography>
          <Button
            onClick={() => {
              void handleClickLogout();
            }}
          >
            {"ログアウト"}
          </Button>
        </>
      ) : (
        <>
          <Button
            onClick={() => {
              void handleClickRegister();
            }}
          >
            {"新規登録"}
          </Button>
          <Button
            onClick={() => {
              void handleClickLogin();
            }}
          >
            {"ログイン"}
          </Button>
        </>
      )}
    </AppBar>
  );
};
