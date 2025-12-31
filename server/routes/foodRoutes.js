import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { detectFoodFromImage } from "../controllers/foodController.js";

const router = express.Router();

router.post("/detect", upload.single("image"), detectFoodFromImage);

export default router;
