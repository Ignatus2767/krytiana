//src/models/user.ts
import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  fullname: string;
  email: string;
  username: string;
  password: string;
  country: string;
  refreshToken?: string | null;
  resetToken?: string | null;
  resetTokenExpiry?: Date | null;
}

const UserSchema = new Schema<IUser>(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    country: { type: String, required: true },
    refreshToken: { type: String, default: null },
    resetToken: { type: String, default: null, index: true }, // Indexed for faster lookup
    resetTokenExpiry: { type: Date, default: null },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
