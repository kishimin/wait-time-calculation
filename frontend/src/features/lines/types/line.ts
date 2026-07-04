import * as z from "zod";
import { LineSchema } from "../schemas/line";

export type Line = z.infer<typeof LineSchema>;
