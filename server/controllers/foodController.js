import nutritionData from "../utils/nutritionData.js";
import { getHealthStatus } from "../utils/healthLogic.js";
import { getAgeRecommendation } from "../utils/ageLogic.js";
import { calculateBMI } from "../utils/bmiLogic.js";
import { getGymAdvice } from "../utils/gymLogic.js";

export const detectFoodFromImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    // TEMP food (will be replaced in Day-5B)
    const detectedFood = "pizza";

    const foodInfo = nutritionData[detectedFood];
    if (!foodInfo) {
      return res.status(404).json({ message: "Food not found" });
    }

    // User input (for now hardcoded; UI later)
    const heightCm = 175;
    const weightKg = 70;
    const gymMode = "bulking"; // bulking | cutting | maintenance

    const bmiResult = calculateBMI(heightCm, weightKg);
    const healthStatus = getHealthStatus(foodInfo);
    const ageRecommended = getAgeRecommendation(foodInfo);
    const gymAdvice = getGymAdvice(gymMode, foodInfo);

    res.status(200).json({
      foodName: detectedFood.toUpperCase(),
      calories: foodInfo.calories,
      protein: foodInfo.protein,
      healthStatus,
      ageRecommended,
      bmi: bmiResult.bmi,
      bmiCategory: bmiResult.category,
      gymMode,
      gymAdvice,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
