import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(1, "タイトルは必須です"),
});

export type FormSchema = z.infer<typeof formSchema>;
