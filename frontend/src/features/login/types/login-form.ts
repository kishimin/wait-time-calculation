import * as z from "zod";
import { formSchema } from "../schemas/login-form";

export type FormSchema = z.infer<typeof formSchema>;
