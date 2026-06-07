import * as z from "zod";
import {
  emailSchema,
  passwordSchema,
  userNameSchema,
} from "../../../app/schemas/auth-form";

export const registerUserSchema = z.object({
  userName: userNameSchema,
  password: passwordSchema,
  email: emailSchema,
});
