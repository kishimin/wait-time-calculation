import * as z from "zod";
import { passwordSchema, userNameSchema } from "../../../app/schemas/auth-form";

export const loginUserSchema = z.object({
  userName: userNameSchema,
  password: passwordSchema,
});
