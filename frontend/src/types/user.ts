import * as z from "zod";
import type { tokenSchema, UserSchema } from "../schemas/user";

export type User = z.infer<typeof UserSchema>;

export type Token = z.infer<typeof tokenSchema>;
