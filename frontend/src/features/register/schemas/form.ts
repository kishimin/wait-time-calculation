import * as z from "zod";

export const formSchema = z.object({
  userName: z
    .string()
    .min(1, "必須です")
    .max(50, "50文字以内で入力してください"),
  password: z
    .string()
    .min(11, "11文字以上で入力してください")
    .max(100, "100文字以内で入力してください")
    .regex(/(?=.*\d)/, "数字を含めてください")
    .regex(/(?=.*[a-z])/, "小文字のアルファベットを含めてください")
    .regex(/(?=.*[A-Z])/, "大文字のアルファベットを含めてください")
    .regex(/(?=.*^[ -/:-@[-´{-~]+$)/, "半角記号を含めてください"),
});
