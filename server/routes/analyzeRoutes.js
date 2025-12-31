import express from "express";
import multer from "multer";
import fs from "fs";
import dotenv from "dotenv";
import { ClarifaiStub, grpc } from "clarifai-nodejs-grpc";
import { nutritionData } from "../data/nutritionData.js";

dotenv.config();

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Clarifai setup
const stub = ClarifaiStub.grpc();
const metadata = new grpc.Metadata();
metadata.set("authorization", `Key ${process.env.CLARIFAI_PAT}`);

router.post("/analyze", upload.single("image"), (req, res) => {
  try {
  if (!req.file) {
    return res.status(400).json({ error: "No image uploaded" });
  }

  const imageBuffer = fs.readFileSync(req.file.path);
  const imageBase64 = imageBuffer.toString("base64");

  stub.PostModelOutputs(
    {
      user_app_id: {
        user_id: "w4jg1a3oge89",
        app_id: "main",
      },
      model_id: "food-recognition",
      inputs: [
        {
          data: {
            image: { base64: imageBase64 },
          },
        },
      ],
    },
    metadata,
    (err, response) => {
      if (err || !response.outputs?.length) {
        return res.status(500).json({ error: "AI failed" });
      }

      const concepts = response.outputs[0].data.concepts;

      let detectedFood = "unknown";

      for (const c of concepts) {
        const name = c.name.toLowerCase();

        if (name.includes("apple")) detectedFood = "apple";
        if (name.includes("banana")) detectedFood = "banana";
        if (name.includes("pizza")) detectedFood = "pizza";
      }

      if (detectedFood === "unknown") {
        return res.json({
          name: "Unknown Food",
          calories: "--",
          protein: "--",
          carbs: "--",
          fat: "--",
        });
      }

      return res.json({
        name: detectedFood,
        ...nutritionData[detectedFood],
      });
    }
  );
} catch (error) {
  console.error(error);
  res.status(500).json({ error: "Server error" });
}

});

export default router;
