import { Request, Response } from "express";
import { eventSchema } from "../validation/eventValidation";
import catchErrors from "../utils/catchErrors";
import { uploadImagesToCloudinary } from "../utils/cloudinary";
import RequestKeys from "../constants/requestKeys";
import { ObjectId } from "mongodb";
import EventModel from "../models/eventModel";
import { CREATED } from "../constants/http";

export const createEventHandler = catchErrors(
  async (req: Request, res: Response) => {
    // Get images from Multer middleware
    const imageFiles = req.files as Express.Multer.File[];

    // Upload images to Cloudinary
    const imageUrls = await uploadImagesToCloudinary(imageFiles);

    // validate request and get event data
    const eventData = eventSchema.parse(req.body);

    // Add the imageUrls and userId to the event object
    eventData.imageUrls = imageUrls;
    eventData.userId = new ObjectId(req[RequestKeys.USER_ID_KEY]);

    // Creat new event model object and save
    const event = await new EventModel(eventData).save();

    // Return success with event
    return res.status(CREATED).json(event);
  }
);
