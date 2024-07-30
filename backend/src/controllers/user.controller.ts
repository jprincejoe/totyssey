import AppErrorCode from "../constants/appErrorCode";
import { NOT_FOUND, OK } from "../constants/http";
import RequestKeys from "../constants/requestKeys";
import UserModel from "../models/user.model";
import appAssert from "../utils/appAssert";
import catchErrors from "../utils/catchErrors";

export const getUserHandler = catchErrors(async (req, res) => {
  // get user with matching id
  const user = await UserModel.findById(req[RequestKeys.USER_ID_KEY]);

  // verify we have a user
  appAssert(user, NOT_FOUND, "User not found", AppErrorCode.RESOURCE_NOT_FOUND);

  // return success
  return res.status(OK).json(user.omitPassword());
});
