import { Request } from "express";
import mongoose from "mongoose";
import RequestKeys from "../constants/requestKeys";

interface Payload {
  userId: mongoose.Types.ObjectId;
  sessionId: mongoose.Types.ObjectId;
}

const setUserRequestValues = (req: Request, payload: Payload): void => {
  req[RequestKeys.USER_ID_KEY] = payload.userId;
  req[RequestKeys.SESSION_ID_KEY] = payload.sessionId;
};

export default setUserRequestValues;
