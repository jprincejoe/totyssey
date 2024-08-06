import { Request, Response } from "express";
import AppErrorCode from "../constants/appErrorCode";
import { BAD_REQUEST, NOT_FOUND, OK } from "../constants/http";
import appAssert from "../utils/appAssert";
import catchErrors from "../utils/catchErrors";
import EventModel from "../models/eventModel";
import { Pagination } from "../types/paginationType";
import { EventSearchResponse } from "../types/events";
import { isValidObjectId } from "../utils/mongoDb";

export const getEventsHandler = catchErrors(
  async (req: Request, res: Response) => {
    // search query builder
    const query = constructSearchQuery(req.query);

    console.log(query);

    // get count of total events
    const total = await EventModel.countDocuments(query);

    // pagination values
    const pageSize = 5;
    const page = parseInt(req.query.page ? req.query.page.toString() : "1");
    const skip = (page - 1) * pageSize;

    const pages = Math.ceil(total / pageSize);

    // get all events
    const events = await EventModel.find(query).skip(skip).limit(pageSize);

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

export const getEventHandler = catchErrors(
  async (req: Request, res: Response) => {
    // get id from the params
    const id = req.params.id;

    // verify id is valid
    appAssert(
      isValidObjectId(id),
      BAD_REQUEST,
      "Invalid event id input",
      AppErrorCode.INVALID_INPUT
    );

    // get event by id
    const event = await EventModel.findById(id);

    // verify we have an event
    appAssert(
      event,
      NOT_FOUND,
      "Event not found",
      AppErrorCode.RESOURCE_NOT_FOUND
    );

    // return event
    return res.status(OK).json(event);
  }
);

const constructSearchQuery = (params: any) => {
  let query: any = {};

  if (params.location) {
    query.$or = [
      { city: { $regex: params.location, $options: "i" } },
      { state: { $regex: params.location, $options: "i" } },
      { location: { $regex: params.location, $options: "i" } },
    ];
  }

  if (params.freeToAttend !== undefined) {
    query.isFree = params.freeToAttend === "true";
  }

  return query;

  // EXAMPLE of req.query
  // {
  //   location: 'Dublin',
  //   freeToAttend: 'true',
  //   startDate: '2024-08-22T00:00:00.000Z',
  //   endDate: '2024-08-31T00:00:00.000Z',
  //   page: '1'
  // }
};
