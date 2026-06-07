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
import { useNavigate } from "react-router";
import { usePostApiUserLogin } from "../../../api/endpoints/user/user";
import { PostApiUserLoginBody } from "../../../gen/endpoints/user/user.zod";
import { useSnackbar } from "../../../hooks/use-snackbar";
import { tokenSchema, UserSchema } from "../../../schemas/user";
import { LOCAL_STORAGE_KEY } from "../../../types/localstorage";
import { PATHS } from "../../../types/paths";
import { formSchema } from "../schemas/login-form";
import type { FormSchema } from "../types/login-form";

const Login = () => {
  const { toggleSnack } = useSnackbar();

  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const { isPending, mutate } = usePostApiUserLogin({
    mutation: {
      onSuccess: async (data) => {
        try {
          const userObj = UserSchema.parse({
            email: data.email,
            isLoggedIn: true,
            userName: data.userName,
          });

          const token = tokenSchema.parse(data.token);

          localStorage.setItem(LOCAL_STORAGE_KEY.TOKEN, token);
          localStorage.setItem(LOCAL_STORAGE_KEY.USER, JSON.stringify(userObj));

          await navigate(PATHS.index);
        } catch {
          toggleSnack({ message: "内部的なエラーです。再度お試しください。" });
        }
      },
    },
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    const result = PostApiUserLoginBody.safeParse({
      username: data.userName,
      password: data.password,
    });

    if (result.success) {
      mutate({ data: result.data });
    }
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
      {isPending ? (
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
