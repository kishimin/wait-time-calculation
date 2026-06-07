import axios from "axios";
import { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router";
import {
  usePostApiUserLogin,
  usePostApiUserRegister,
} from "../api/endpoints/user/user";
import { tokenSchema, UserSchema } from "../app/schemas/user";
import type { LoginUser } from "../features/login/types/login-form";
import type { RegisterUser } from "../features/register/types/register-form";
import {
  PostApiUserLoginBody,
  PostApiUserRegisterBody,
} from "../gen/endpoints/user/user.zod";
import { useSnackbar } from "../hooks/use-snackbar";
import { UserContext } from "../hooks/user-context";
import { LOCAL_STORAGE_KEY } from "../types/localstorage";
import { PATHS } from "../types/paths";
import type { Token, User } from "../types/user";

type Props = {
  children: ReactNode;
};

export const UserContextProvider = (props: Props) => {
  const { children } = props;

  const navigate = useNavigate();
  const { toggleSnack } = useSnackbar();
  const [token, setToken] = useState<Token | null>(
    localStorage.getItem(LOCAL_STORAGE_KEY.TOKEN),
  );
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem(LOCAL_STORAGE_KEY.USER);
    if (!storedUser) {
      return null;
    }

    const result = UserSchema.safeParse(JSON.parse(storedUser));
    if (!result.success) {
      return null;
    }

    return result.data;
  });

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
  }, [token]);

  const { isPending: isPendingRegister, mutate: mutateRegister } =
    usePostApiUserRegister({
      mutation: {
        onSuccess: async (data) => {
          try {
            const token = tokenSchema.parse(data.token);
            const userObj = UserSchema.parse({
              email: data.email,
              userName: data.userName,
            });

            localStorage.setItem(LOCAL_STORAGE_KEY.TOKEN, token);
            localStorage.setItem(
              LOCAL_STORAGE_KEY.USER,
              JSON.stringify(userObj),
            );

            setToken(token);
            setUser(userObj);

            await navigate(PATHS.index);
          } catch {
            toggleSnack({
              message: "内部的なエラーです。再度お試しください。",
            });
          }
        },
      },
    });

  const { isPending: isPendingLogin, mutate: mutateLogin } =
    usePostApiUserLogin({
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
            localStorage.setItem(
              LOCAL_STORAGE_KEY.USER,
              JSON.stringify(userObj),
            );

            setToken(token);
            setUser(user);

            await navigate(PATHS.index);
          } catch {
            toggleSnack({
              message: "内部的なエラーです。再度お試しください。",
            });
          }
        },
      },
    });

  const isLoggedIn = () => {
    return !!user;
  };

  const registerUser = (user: RegisterUser) => {
    const result = PostApiUserRegisterBody.safeParse({
      username: user.userName,
      password: user.password,
      email: user.email,
    });

    if (result.success) {
      mutateRegister({
        data: result.data,
      });
    }
  };

  const loginUser = (user: LoginUser) => {
    const result = PostApiUserLoginBody.safeParse({
      username: user.userName,
      password: user.password,
    });

    if (result.success) {
      mutateLogin({ data: result.data });
    }
  };

  const logout = async () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY.TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEY.USER);
    setUser(null);
    setToken(null);

    await navigate(PATHS.index);
  };

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        loginUser,
        logout,
        registerUser,
        token,
        user,
        isPendingLogin,
        isPendingRegister,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
