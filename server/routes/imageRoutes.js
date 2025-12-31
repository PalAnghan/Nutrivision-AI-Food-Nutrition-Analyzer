import express from "express";
import multer from "multer";
import fs from "fs";
import axios from "axios";
import nutritionData from "../utils/nutritionData.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/analyze-image", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: "No image uploaded" });
    }

    const imageBuffer = fs.readFileSync(req.file.path);

const response = await axios.post(
  "https://api.clarifai.com/v2/models/aaa03c23b3724a16a56b629203edc62c/versions/aa7f35c01e0642fda5cf400f543e7c40/outputs",
  {
    user_app_id: {
      user_id: process.env.CLARIFAI_USER_ID,
      app_id: process.env.CLARIFAI_APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            base64: imageBuffer.toString("base64"),
          },
        },
      },
    ],
  },
  {
    headers: {
      Authorization: `Key ${process.env.CLARIFAI_PAT}`,
      "Content-Type": "application/json",
    },
  }
);


    fs.unlinkSync(req.file.path);

    const concepts =
      response.data?.outputs?.[0]?.data?.concepts || [];

    const detectedFoods = [];

    concepts.forEach((c) => {
      const name = c.name.toLowerCase();
      if (nutritionData[name]) {
        detectedFoods.push({
          food: name,
          confidence: c.value,
          nutrition: nutritionData[name],
        });
      }
    });

    res.json({
  success: true,
  foods: detectedFoods.map(f => ({
    name: f.food,
    confidence: Math.round(f.confidence * 100),
    calories: f.nutrition.calories,
    protein: f.nutrition.protein,
    carbs: f.nutrition.carbs,
    fat: f.nutrition.fat,
  }))
});


  } catch (error) {
    console.error("Image analysis error:", error.response?.data || error);
    return res.status(500).json({
      success: false,
      error: "Image analysis failed",
    });
  }
});

export default router;
