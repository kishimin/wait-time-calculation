import * as z from "zod";

export const titleSchema = z
  .string()
  .min(1, "必須です")
  .max(100, "100文字以内で入力してください");

export const explanationSchema = z
  .string()
  .max(400, "400文字以内で入力してください");
