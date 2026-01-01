import express from "express";
import multer from "multer";
import { detectFoodFromImage } from "../utils/aiVision.js";
import { getMainFood } from "../utils/foodCalories.js";
import nutritionData from "../data/nutritionData.js";
import History from "../models/FoodHistory.js";


const router = express.Router();
const upload = multer({ dest: "uploads/" });
  

router.post("/detect-food", upload.single("image"), async (req, res) => {
  try {
        const { mealType } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    // 1️⃣ Detect concepts from AI
    const concepts = await detectFoodFromImage(req.file.path);

    // 2️⃣ Keep confident concepts
    const foodConcepts = concepts.filter(c => c.value > 0.9);

    // 3️⃣ Priority food mapping
    let mainFood =
      foodConcepts.find(c =>
        ["banana", "apple", "rice", "pizza"].includes(c.name)
      );

    // 4️⃣ Fallback: if AI says "fruit"
    if (!mainFood) {
      const fruitDetected = foodConcepts.find(c => c.name === "fruit");
      if (fruitDetected) {
        mainFood = { name: "banana", value: fruitDetected.value };
      }
    }

    // 5️⃣ Nutrition lookup
    const nutrition =
      nutritionData[mainFood?.name?.toLowerCase()] || null;

    // 🔥 SAVE TO MONGODB (ADD HERE)
    if (nutrition) {
     await History.create({
    food: mainFood.name,
    calories: nutrition.calories,
    protein: nutrition.protein,
    carbs: nutrition.carbs,
    fat: nutrition.fat,
    confidence: mainFood.value * 100,
    mealType: mealType || "lunch",
      });
    }


    // 6️⃣ Response
    res.json({
      success: true,
      food: mainFood?.name || "Unknown",
      confidence: mainFood ? (mainFood.value * 100).toFixed(1) : 0,
      nutrition,
      concepts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Food detection failed" });
  }
});


export default router;
