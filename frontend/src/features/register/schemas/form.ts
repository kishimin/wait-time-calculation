import * as z from "zod";

export const formSchema = z.object({
  userName: z.string().min(1, "ユーザー名は必須です"),
});
