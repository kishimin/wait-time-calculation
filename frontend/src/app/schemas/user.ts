import * as z from "zod";

export const UserSchema = z.object({
  userName: z.string(),
  email: z.string(),
});

export const tokenSchema = z.string();
