import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["BUYER", "SELLER", "ADMIN"],
      required: true,
      default: "BUYER",
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { collection: "users" }
);

export default userSchema;
