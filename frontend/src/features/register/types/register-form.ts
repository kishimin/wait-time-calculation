import * as z from "zod";
import { formSchema } from "../schemas/register-form";

export type FormSchema = z.infer<typeof formSchema>;
