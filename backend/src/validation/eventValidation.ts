import { z } from "zod";
import { ObjectId } from "mongodb";
import { parseISO, isValid } from "date-fns";

const datetimeSchema = z
  .string()
  .optional()
  .refine(
    (value) => {
      if (value === undefined || value === "") return true;
      return !isNaN(Date.parse(value));
    },
    {
      message: "Invalid ISO date format",
    }
  );

export const eventSchema = z.object({
  userId: z.instanceof(ObjectId),
  title: z.string().min(1).max(255),
  description: z.string().min(1).max(2048),
  eventLink: z.string().optional(),
  isFree: z.boolean().optional(),
  startDate: datetimeSchema.optional(),
  endDate: datetimeSchema.optional(),
  occurence: z.string().optional(),
  location: z.string().optional(),
  addressLine1: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  categories: z.array(z.string()).optional(),
  ages: z.array(z.string()).optional(),
  imageUrls: z.array(z.string()).optional(),
});
