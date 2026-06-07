import * as z from "zod";
import { emailSchema, userNameSchema } from "../../../app/schemas/auth-form";

export const formSchema = z.object({
  userName: userNameSchema,
  email: emailSchema,
});
