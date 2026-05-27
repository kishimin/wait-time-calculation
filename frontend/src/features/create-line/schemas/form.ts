import { z } from "zod";

export const formSchema = z.object({
  title: z
    .string()
    .min(1, "タイトルは必須です")
    .max(100, "タイトルは100文字以内で入力してください"),
  explanation: z.string().max(400, "説明は400文字以内で入力してください"),
});
