import * as z from "zod";
import type { tokenSchema, UserSchema } from "../app/schemas/user";
import type { LoginUser } from "../features/login/types/login-form";
import type { RegisterUser } from "../features/register/types/register-form";

export type User = z.infer<typeof UserSchema>;

export type Token = z.infer<typeof tokenSchema>;

export type UserContextType = {
  user: User | null;
  token: Token | null;
  isLoggedIn: () => boolean;
  isPendingRegister: boolean;
  isPendingLogin: boolean;
  registerUser: (user: RegisterUser) => void;
  loginUser: (user: LoginUser) => void;
  logout: () => Promise<void>;
};
