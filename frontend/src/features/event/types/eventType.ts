import { z } from "zod";
import { eventSchema } from "../validation/eventValidation";

export type Event = z.infer<typeof eventSchema>;
