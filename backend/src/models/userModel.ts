import mongoose from "mongoose";
import { comparePasswords, hashValue } from "../utils/bcrypt";

export interface UserDocument extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(val: string): Promise<boolean>;
  omitPassword(): Omit<this, "password"> & { password?: undefined };
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
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

// Omit password
userSchema.methods.omitPassword = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
