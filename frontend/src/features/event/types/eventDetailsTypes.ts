export type TEventDetails = {
  // Details
  title: string;
  description: string;
  eventLink?: string;
  isFree: boolean;

  // When
  startDate?: Date;
  endDate?: Date;
  startTime?: Date;
  endTime?: Date;
  occurence?: string;

  // Where
  location?: string;
  addressLine1?: string;
  city?: string;
  state?: string;
  zip?: string;

  // Categories
  categories?: string[];

  // Ages
  ages?: string[];

  // Images
  images?: FileList[];
};
