import UserHealth from "../models/UserHealth.js";
import { calculateBMI } from "../utils/bmiCalculator.js";

export const calculateHealth = async (req, res) => {
  try {
    const { name, age, height, weight, gymMode } = req.body;

    if (!height || !weight) {
      return res.status(400).json({ message: "Height & weight required" });
    }

    const { bmi, category } = calculateBMI(weight, height);

    const userHealth = await UserHealth.create({
      name,
      age,
      height,
      weight,
      bmi,
      bmiCategory: category,
      gymMode
    });

    res.status(201).json({
      success: true,
      message: "Health data saved",
      data: userHealth
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
