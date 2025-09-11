import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is an required field"],
    },
    email: {
      type: String,
      required: [true, "Email is an required field"],
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Invalid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is a required field"],
      min: 6,
      max: 10,
    },
    role: {
      type: String,
      required: [true, "Role is an required field"],
      default: "user",
      enum: ["admin", "developer", "user"],
    },
  },
  { timestamps: true }
);
const authModel = mongoose.model("Auth", authSchema);
export default authModel;
