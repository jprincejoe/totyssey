import mongoose from "mongoose";
import { comparePasswords, hashValue } from "../utils/bcrypt";

export interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(val: string): Promise<boolean>;
  // omitPassword(): Pick<
  //   UserDocument,
  //   "_id" | "email" | "verified" | "createdAt" | "updatedAt" | "__v"
  // >;
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving to db
userSchema.pre("save", async function (next) {
  // Only hash if password has changed
  if (this.isModified("password")) {
    this.password = await hashValue(this.password);
  }

  next();
});

// Password comparison function
userSchema.methods.comparePassword = async function (val: string) {
  return comparePasswords(val, this.password);
};

// // Omit password
// userSchema.methods.omitPassword = function () {
//   const user = this.toObject();
//   delete user.password;
//   return user;
// };

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
