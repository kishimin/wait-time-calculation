import { AppBar, Box, Typography } from "@mui/material";

export const TopBar = () => {
  return (
    <AppBar position={"static"}>
      <Typography variant={"h1"}>{"まちログ"}</Typography>
      <Box component={"img"} src={"/QueueLogoImage.png"} />
    </AppBar>
  );
};
