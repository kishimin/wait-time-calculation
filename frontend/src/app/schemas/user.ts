import * as z from "zod";

export const UserSchema = z.object({
  userName: z.string(),
  email: z.string(),
  isLoggedIn: z.boolean(),
});

export const tokenSchema = z.string();
