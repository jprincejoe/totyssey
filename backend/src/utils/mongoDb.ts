import { ObjectId } from "mongodb";

// check for valid MongoDB ID Object
export const isValidObjectId = (id: string) => ObjectId.isValid(id);
