import { Request, Response } from "express";
import AppErrorCode from "../constants/appErrorCode";
import { NOT_FOUND, OK } from "../constants/http";
import appAssert from "../utils/appAssert";
import catchErrors from "../utils/catchErrors";
import EventModel from "../models/eventModel";
import { Pagination } from "../types/paginationType";
import { EventSearchResponse } from "../types/events";

export const getEventsHandler = catchErrors(
  async (req: Request, res: Response) => {
    // get count of total events
    const total = await EventModel.countDocuments();

    // pagination values
    const pageSize = 50;
    const page = parseInt(req.query.page ? req.query.page.toString() : "1");
    const skip = (page - 1) * pageSize;

    const pages = Math.ceil(total / pageSize);

    // get all events
    const events = await EventModel.find().skip(skip).limit(pageSize);

    // verify we have events
    appAssert(
      events,
      NOT_FOUND,
      "Events not found",
      AppErrorCode.RESOURCE_NOT_FOUND
    );

    // create new pagination object
    const pagination: Pagination = {
      total,
      page,
      pages,
    };

    // create full response object with events and pagination
    const eventSearchRespones: EventSearchResponse = {
      data: events,
      pagination,
    };

    // return success
    return res.status(OK).json(eventSearchRespones);
  }
);
