import * as z from "zod";
import { registerUserSchema } from "../schemas/register-form";

export type RegisterUser = z.infer<typeof registerUserSchema>;
