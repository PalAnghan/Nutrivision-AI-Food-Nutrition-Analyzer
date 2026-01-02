import express from "express";
import multer from "multer";
import { detectFoodFromImage } from "../utils/aiVision.js";
import History from "../models/FoodHistory.js";
import { nutritionData } from "../data/nutritionData.js";



const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});



router.post("/detect-food", upload.single("image"), async (req, res) => {
  try {
        const { mealType } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    
   const imageBase64 = req.file.buffer.toString("base64");
   const concepts = await detectFoodFromImage(req.file.buffer);

    
    const foodConcepts = concepts.filter(c => c.value > 0.9);

    
  // let mainFood =
  // foodConcepts.find(c =>
  //   ["banana", "apple", "mango", "orange", "rice", "pizza"].includes(c.name)
  // ) || null;

  const supportedFoods = Object.keys(nutritionData);

let mainFood =
  foodConcepts.find(c =>
    supportedFoods.includes(c.name)
  ) || null;
const foodAliases = {
  "green apple": "apple",
  "apple slice": "apple",
  "fried rice": "fried_rice",
  "veg biryani": "biryani",
};


const normalizedName = foodAliases[c.name] || c.name;

    
    // if (!mainFood) {
    //   const fruitDetected = foodConcepts.find(c => c.name === "fruit");
    //   if (fruitDetected) {
    //     mainFood = { name: "banana", value: fruitDetected.value };
    //   }
    // }
    // 🥗 Nutrition lookup
    const normalizedFood = mainFood?.name
      ?.toLowerCase()
      ?.replace(/\s+/g, "_");

    const nutrition = nutritionData[normalizedFood] || null;


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
  isSupported: !!nutrition
});

if (!nutrition && mainFood) {
  console.log("Requested food:", mainFood.name);
  // later: save to DB or file
}
if (mainFood && mainFood.value < 0.6) {
  mainFood = null;
}


  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Food detection failed" });
  }
});


export default router;
