import z from "zod";

const datetimeSchema = z
  .string()
  .optional()
  .refine(
    (value) => {
      if (value === undefined || value === "") return true;
      return !isNaN(Date.parse(value));
    },
    {
      message: "Invalid datetime format",
    }
  );

// const MAX_FILE_SIZE = 5 * 1024 * 1024;
// const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

// // Define the schema for a single file
// const imageFileSchema = z
//   .instanceof(File)
//   .refine(
//     (file) => {
//       console.log(file);
//       // Check that the file type is an image
//       return file.type.startsWith("image/");
//     },
//     {
//       message: "File must be an image",
//     }
//   )
//   .refine(
//     (file) => {
//       // Check that the file size is less than or equal to 5MB (for example)
//       return file.size <= 5 * 1024 * 1024;
//     },
//     {
//       message: "File size must be less than or equal to 5MB",
//     }
//   );

// const imageFileSchema1 = z.custom<File>(
//   (file) => {
//     console.log(file);
//     // Perform any additional validation on the file here
//     return file instanceof File && file.type.startsWith("image/");
//   },
//   {
//     message: "Invalid file type. Only image files are allowed.",
//   }
// );

// Schema to validate a single image file
const imageFileSchema = z.custom<File>(
  (file) => {
    return file instanceof File && file.type.startsWith("image/");
  },
  {
    message: "Invalid file type. Only image files are allowed.",
  }
);

// Schema to validate multiple image files (FileList)
const imageFilesSchema = z.custom<FileList | null | undefined>(
  (files) => {
    if (files == null) {
      return true; // Allow null or undefined
    }

    if (!(files instanceof FileList)) {
      return false;
    }

    const fileArray = Array.from(files);

    // Check the number of files
    if (fileArray.length > 6) {
      return false;
    }

    // Validate each file
    return fileArray.every((file) => imageFileSchema.safeParse(file).success);
  },
  {
    message: "Invalid file selection. Please upload up to 6 image files.",
  }
);

export const eventSchema = z.object({
  _id: z.string().optional(),
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
  startDate: datetimeSchema.optional(),
  endDate: datetimeSchema.optional(),
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

  imageFiles: imageFilesSchema.optional(),
  imageUrls: z.array(z.string()).optional(),

  // // Images
  // imageFiles: z
  //   .any()
  //   .refine(
  //     (files) => files?.[0]?.size <= MAX_FILE_SIZE,
  //     `Max file size is 5MB.`
  //   )
  //   .refine(
  //     (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
  //     ".jpg, .jpeg, and .png files are accepted."
  //   ),
});
