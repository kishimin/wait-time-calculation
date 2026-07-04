import * as z from "zod";
import { titleSchema } from "../../../schemas/line";

export const LineSchema = z.object({
  id: z.uuid(),
  title: titleSchema,
  averageWaitTime: z.number().nullable(),
  currentLineEntryId: z.uuid().nullable(),
});
