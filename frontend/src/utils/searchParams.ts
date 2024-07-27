import { useSearchParams } from "react-router-dom";
import { z, ZodSchema } from "zod";

// Utility function to get and validate search params
export const validateSearchParam = <T extends ZodSchema<any>>(
  paramName: string,
  schema: T
): z.infer<T> | null => {
  const [searchParams] = useSearchParams();
  const paramValue = searchParams.get(paramName);
  if (paramValue !== null) {
    const result = schema.safeParse(paramValue);
    if (result.success) {
      return result.data;
    }
  }
  return null;
};
