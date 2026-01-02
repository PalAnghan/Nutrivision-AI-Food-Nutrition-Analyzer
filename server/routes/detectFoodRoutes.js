import express from "express";
import multer from "multer";
import { detectFoodFromImage } from "../utils/aiVision.js";
import History from "../models/FoodHistory.js";
import { nutritionData } from "../data/nutritionData.js";


const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

router.post("/detect-food", upload.single("image"), async (req, res) => {
  try {
    const { mealType } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    // 🔹 Call AI
    const concepts = await detectFoodFromImage(req.file.buffer);

    // 1️⃣ Filter confident concepts
    const foodConcepts = concepts.filter(c => c.value > 0.9);

    // 2️⃣ Supported foods
    const supportedFoods = Object.keys(nutritionData);

    // 3️⃣ Alias mapping
    const foodAliases = {
      "green apple": "apple",
      "apple slice": "apple",
      "fried rice": "fried_rice",
      "veg biryani": "biryani",
    };

    // 4️⃣ Find supported detected food
    const mainFood = foodConcepts.find(c => {
      const normalized = foodAliases[c.name] || c.name;
      return supportedFoods.includes(normalized);
    }) || null;

    // 5️⃣ Normalize name
    const normalizedFood = mainFood
      ? (foodAliases[mainFood.name] || mainFood.name)
      : null;

    // 6️⃣ Nutrition lookup
    const nutrition = normalizedFood
      ? nutritionData[normalizedFood]
      : null;

    // 7️⃣ Save history if supported
    if (nutrition && mainFood) {
      await History.create({
        food: normalizedFood,
        calories: nutrition.calories,
        protein: nutrition.protein,
        carbs: nutrition.carbs,
        fat: nutrition.fat,
        confidence: mainFood.value * 100,
        mealType: mealType || "lunch",
      });
    }

    // 8️⃣ Final response
    res.json({
      success: true,
      food: normalizedFood || "Unknown",
      confidence: mainFood ? (mainFood.value * 100).toFixed(1) : 0,
      nutrition,
      concepts,
      isSupported: !!nutrition,
    });

  } catch (error) {
    console.error("Detect food error:", error);
    res.status(500).json({ error: "Food detection failed" });
  }
});

export default router;
