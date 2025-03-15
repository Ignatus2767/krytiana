import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  country: { type: String, required: true },
  refreshToken: { type: String },
  resetToken: { type: String },
  resetTokenExpiry: { type: Date },
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);

export default User;
