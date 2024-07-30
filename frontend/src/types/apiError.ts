import AppErrorCode from "@/constants/appErrorCode";

export type TErrorResponse = {
  httpStatusCode: number;
  message: string;
  appErrorCode: AppErrorCode;
};
