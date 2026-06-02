import * as z from "zod";

export const formSchema = z.object({
  userName: z
    .string()
    .min(1, "ユーザー名は必須です")
    .max(50, "ユーザー名は50文字以内で入力してください"),
  password: z.string().min(1, "パスワードは必須です"),
});
