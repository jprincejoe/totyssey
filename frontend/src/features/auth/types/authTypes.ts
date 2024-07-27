import { z } from "zod";
import { LoginSchema } from "../validation/authValidation";

export type TLoginForm = z.infer<typeof LoginSchema>;
