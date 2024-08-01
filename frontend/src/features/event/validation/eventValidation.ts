import z from "zod";

export const eventSchema = z.object({
  // Details
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(255, { message: "Title must be at most 255 characters" }),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(2048, { message: "Description must be at most 2048 characters" }),
  eventLink: z.string().optional(),
  isFree: z.boolean().default(false),

  // When
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  startTime: z.date().optional(),
  endTime: z.date().optional(),
  occurrence: z.string().optional(),

  // Where
  location: z.string().optional(),
  addressLine1: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),

  // Categories
  categories: z.array(z.string()).optional(),

  // Ages
  ages: z.array(z.string()).optional(),

  // Images
  imageFiles: z.instanceof(FileList).optional(),
});

export type TEventDetails = z.infer<typeof eventSchema>;
