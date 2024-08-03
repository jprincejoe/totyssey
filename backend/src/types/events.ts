import mongoose from "mongoose";
import { Pagination } from "./paginationType";

export type Event = {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  eventLink?: string;
  isFree: boolean;
  startDate?: Date;
  endDate?: Date;
  occurence?: string;
  location?: string;
  addressLine1?: string;
  city?: string;
  state?: string;
  zip?: string;
  categories?: string[];
  ages?: string[];
  imageUrls?: string[];
};

export type EventSearchResponse = {
  data: Event[];
  pagination: Pagination;
};
