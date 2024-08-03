import mongoose from "mongoose";
import { Event } from "../types/events";

const eventSchema = new mongoose.Schema<Event>(
  {
    userId: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 255,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 2048,
    },
    eventLink: {
      type: String,
      trim: true,
    },
    isFree: {
      type: Boolean,
      default: false,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    occurence: {
      type: String,
    },
    location: {
      type: String,
      trim: true,
    },
    addressLine1: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    zip: {
      type: String,
      trim: true,
    },
    categories: {
      type: [String],
    },
    ages: {
      type: [String],
    },
    imageUrls: {
      type: [String],
    },
  },
  { timestamps: true }
);

const EventModel = mongoose.model<Event>("Event", eventSchema);

export default EventModel;
