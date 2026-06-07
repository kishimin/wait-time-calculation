import * as z from "zod";
import { formSchema } from "../schemas/line-form";

export type FormSchema = z.infer<typeof formSchema>;
