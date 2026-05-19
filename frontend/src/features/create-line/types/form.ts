import { z } from "zod";
import type { formSchema } from "../schemas/form";

export type FormSchema = z.infer<typeof formSchema>;
