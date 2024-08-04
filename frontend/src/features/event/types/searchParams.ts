export type SearchParams = {
  location?: string;
  freeToAttend: string;
  startDate?: string;
  endDate?: string;
  page: string;
};

export type EventSearchResponse = {
  data: Event[];
  pagination: Pagination;
};

export type Pagination = {
  total: number;
  page: number;
  pages: number;
};
