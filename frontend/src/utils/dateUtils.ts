import { formatISO } from "date-fns";

export const convertToISODateString = (date: string | undefined): string => {
  if (!date) return "";
  return formatISO(new Date(date));
};
