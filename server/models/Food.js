import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    foodName: {
      type: String,
      required: true,
    },
    calories: {
      type: Number,
      required: true,
    },
    protein: {
      type: Number,
      required: true,
    },
    healthStatus: {
      type: String, // Healthy / Moderate / Avoid
      required: true,
    },
    ageRecommended: {
      type: String, // Kids / Adults / All
      required: true,
    },
  },
  { timestamps: true }
);

const Food = mongoose.model("Food", foodSchema);

export default Food;
