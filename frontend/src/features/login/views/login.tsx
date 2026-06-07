import { zodResolver } from "@hookform/resolvers/zod";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { TopBar } from "../../../components/top-bar";
import { useUser } from "../../../hooks/use-user";
import { loginUserSchema } from "../schemas/login-form";
import type { LoginUser } from "../types/login-form";

const Login = () => {
  const { isPendingLogin, loginUser } = useUser();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginUser>({
    resolver: zodResolver(loginUserSchema),
    mode: "onChange",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onSubmit: SubmitHandler<LoginUser> = (data) => {
    loginUser(data);
  };

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const handleMouseUpPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <TopBar />

      {isPendingLogin ? (
        <CircularProgress />
      ) : (
        <FormControl
          component={"form"}
          onSubmit={(e) => {
            return void handleSubmit(onSubmit)(e);
          }}
          noValidate
          aria-label={"ログインフォーム"}
        >
          <TextField
            {...register("userName")}
            label={"ユーザー名"}
            required
            error={!!errors.userName}
            helperText={errors.userName?.message}
          />

          <TextField
            {...register("password")}
            label={"パスワード"}
            type={showPassword ? "text" : "password"}
            required
            error={!!errors.password}
            helperText={errors.password?.message}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position={"end"}>
                    <IconButton
                      aria-label={
                        showPassword ? "入力内容を非表示" : "入力内容を表示"
                      }
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <Button type={"submit"}>{"ログイン"}</Button>
        </FormControl>
      )}
    </>
  );
};

export default Login;
