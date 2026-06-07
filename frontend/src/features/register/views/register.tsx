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
import axios from "axios";
import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { usePostApiUserRegister } from "../../../api/endpoints/user/user";
import { tokenSchema, UserSchema } from "../../../app/schemas/user";
import { PostApiUserRegisterBody } from "../../../gen/endpoints/user/user.zod";
import { useSnackbar } from "../../../hooks/use-snackbar";
import { LOCAL_STORAGE_KEY } from "../../../types/localstorage";
import { PATHS } from "../../../types/paths";
import { formSchema } from "../schemas/register-form";
import type { FormSchema } from "../types/register-form";

const Register = () => {
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

  const { isPending, mutate } = usePostApiUserRegister({
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

          axios.defaults.headers.common["Authorization"] = "Bearer " + token;

          await navigate(PATHS.index);
        } catch {
          toggleSnack({ message: "内部的なエラーです。再度お試しください。" });
        }
      },
    },
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    const result = PostApiUserRegisterBody.safeParse({
      username: data.userName,
      password: data.password,
      email: data.email,
    });

    if (result.success) {
      mutate({
        data: result.data,
      });
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
          aria-label={"新規登録フォーム"}
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

          <TextField
            {...register("email")}
            label={"メールアドレス"}
            required
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <Button type={"submit"}>{"新規登録"}</Button>
        </FormControl>
      )}
    </>
  );
};

export default Register;
