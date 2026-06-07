import { AppBar, Box, Typography } from "@mui/material";

type Props = {
  isLoggedIn: boolean;
  userName: string;
};

export const TopBar = (props: Props) => {
  const { isLoggedIn, userName } = props;

  return (
    <AppBar position={"static"}>
      <Typography variant={"h1"}>{"まちログ"}</Typography>
      <Box component={"img"} src={"/QueueLogoImage.png"} />

      {isLoggedIn && <Typography variant={"h2"}>{userName}</Typography>}
    </AppBar>
  );
};
