import { z } from "zod";
import { isValidObjectId } from "../utils/mongoDb";
import { ObjectId } from "mongodb";

export const eventSchema = z.object({
  userId: z.instanceof(ObjectId),
  title: z.string().min(1).max(255),
  description: z.string().min(1).max(2048),
  eventLink: z.string().url().optional(),
  isFree: z.boolean().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  startTime: z.date().optional(),
  endTime: z.date().optional(),
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
