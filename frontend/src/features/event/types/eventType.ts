import { z } from "zod";
import { eventSchema } from "../validation/eventValidation";

export type TEvent = z.infer<typeof eventSchema>;
