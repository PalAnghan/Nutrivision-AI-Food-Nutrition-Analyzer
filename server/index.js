import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import detectFoodRoutes from "./routes/detectFoodRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";
import connectDB from "./config/db.js";
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://nutrivision-ai-food-nutrition-analyze.netlify.app"
    ],
    methods: ["GET", "POST", "DELETE"],
  })
);


app.use("/api", detectFoodRoutes);
app.use("/api/history", historyRoutes);



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

