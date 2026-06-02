import * as z from "zod";
import { formSchema } from "../schemas/form";

export type FormSchema = z.infer<typeof formSchema>;
