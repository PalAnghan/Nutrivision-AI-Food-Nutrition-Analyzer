import mongoose from "mongoose";

const userHealthSchema = new mongoose.Schema(
  {
    name: String,
    age: Number,
    height: Number, // in cm
    weight: Number, // in kg
    bmi: Number,
    bmiCategory: String,
    gymMode: Boolean
  },
  { timestamps: true }
);

export default mongoose.model("UserHealth", userHealthSchema);
