import * as z from "zod";
import { explanationSchema, titleSchema } from "../../../schemas/line";

export const formSchema = z.object({
  title: titleSchema,
  explanation: explanationSchema,
});
