import { AppBar, Box, Stack, Typography } from "@mui/material";
import { useUser } from "../hooks/use-user";
import LogoImage from "../images/QueueLogImage.png";
import { GuestMenu } from "./guest-menu";
import { UserMenu } from "./user-menu";

export const TopBar = () => {
  const { isLoggedIn, user, logout } = useUser();

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
            <GuestMenu />
          </Box>
        )}
      </Stack>
    </AppBar>
  );
};
