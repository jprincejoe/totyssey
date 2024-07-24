import RequestKeys from "./src/constants/requestKeys";
import mongoose from "mongoose";

declare global {
  namespace Express {
    interface Request {
      [RequestKeys.USER_ID_KEY]: mongoose.Types.ObjectId;
      [RequestKeys.SESSION_ID_KEY]: mongoose.Types.ObjectId;
    }
  }
}
