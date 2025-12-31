import mongoose from "mongoose";

const foodHistorySchema = new mongoose.Schema(
  {
    food: {
      type: String,
      required: true,
    },
    calories: {
      type: Number,
      required: true,
    },
    protein: Number,
    carbs: Number,
    fat: Number,
    confidence: Number,
    mealType: {
  type: String,
  enum: ["breakfast", "lunch", "dinner"],
  default: "lunch"
}

  },
  { timestamps: true }
);

export default mongoose.model("FoodHistory", foodHistorySchema);
