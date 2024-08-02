import { Request, Response } from "express";
import { eventSchema } from "../validation/eventValidation";
import catchErrors from "../utils/catchErrors";
import { uploadImagesToCloudinary } from "../utils/cloudinary";
import RequestKeys from "../constants/requestKeys";
import { ObjectId } from "mongodb";
import EventModel from "../models/eventModel";
import { CREATED } from "../constants/http";
import { parseISO } from "date-fns";

export const createEventHandler = catchErrors(
  async (req: Request, res: Response) => {
    console.log("In createEventHandler...");
    // Get images from Multer middleware
    const imageFiles = req.files as Express.Multer.File[];

    // Upload images to Cloudinary
    const imageUrls = await uploadImagesToCloudinary(imageFiles);

    console.log("Image URLs:", imageUrls);

    // imageUrls and userId are not on req.body so need to combine everything before validation
    const combined = {
      ...req.body,
      imageUrls,
      [RequestKeys.USER_ID_KEY]: new ObjectId(req[RequestKeys.USER_ID_KEY]),
    };

    console.log("Combined before", combined);

    // validate request and get event data
    const eventData = eventSchema.parse(combined);

    // Type assertion to extend eventData type to allow Date type for startDate and endDate
    const parsedEventData = {
      ...eventData,
      startDate: eventData.startDate
        ? parseISO(eventData.startDate)
        : undefined,
      endDate: eventData.endDate ? parseISO(eventData.endDate) : undefined,
    };

    console.log("Event Data after conversion: ", parsedEventData);

    // Create new event model object and save
    const event = await new EventModel(parsedEventData).save();

    console.log("Returned Event:", event);

    // Return success with event
    return res.status(CREATED).json(event);
  }
);
