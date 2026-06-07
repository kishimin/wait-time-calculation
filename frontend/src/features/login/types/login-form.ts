import * as z from "zod";
import { loginUserSchema } from "../schemas/login-form";

export type LoginUser = z.infer<typeof loginUserSchema>;
