import { Box, Button, Stack } from "@mui/material";

type Props = {
  /** 新規登録ボタンをクリックしたときの処理 */
  onClickRegister: () => void;
  /** ログインボタンをクリックしたときの処理 */
  onClickLogin: () => void;
};

export const GuestMenu = (props: Props) => {
  const { onClickLogin, onClickRegister } = props;

  return (
    <Box>
      <Stack direction={"row"} spacing={2}>
        <Button
          onClick={onClickRegister}
          variant={"contained"}
          color={"secondary"}
        >
          {"新規登録"}
        </Button>
        <Button
          onClick={onClickLogin}
          variant={"contained"}
          color={"secondary"}
        >
          {"ログイン"}
        </Button>
      </Stack>
    </Box>
  );
};
