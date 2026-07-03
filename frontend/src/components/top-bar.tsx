import { AppBar, Box, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { useUser } from "../hooks/use-user";
import LogoImage from "../images/QueueLogImage.png";
import { PATHS } from "../types/paths";
import { GuestMenu } from "./guest-menu";
import { UserMenu } from "./user-menu";

export const TopBar = () => {
  const { isLoggedIn, user, logout } = useUser();
  const navigate = useNavigate();

  const handleClickRegister = async () => {
    await navigate(PATHS.register);
  };

  const handleClickLogin = async () => {
    await navigate(PATHS.login);
  };

  return (
    <AppBar position={"static"}>
      <Stack direction={"row"} sx={{ alignItems: "center" }}>
        <Typography variant={"h6"}>{"まちログ"}</Typography>
        <Box
          component={"img"}
          src={LogoImage}
          alt={"まちログロゴ画像"}
          width={"10%"}
        />

        {isLoggedIn() ? (
          <UserMenu
            onClickLogout={() => {
              void logout();
            }}
            userName={user?.userName ?? ""}
          />
        ) : (
          <Box sx={{ ml: "auto", display: "flex", gap: 2 }}>
            <GuestMenu
              onClickLogin={() => {
                void handleClickLogin();
              }}
              onClickRegister={() => {
                void handleClickRegister();
              }}
            />
          </Box>
        )}
      </Stack>
    </AppBar>
  );
};
