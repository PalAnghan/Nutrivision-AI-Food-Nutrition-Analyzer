import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import detectFoodRoutes from "./routes/detectFoodRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";
import connectDB from "./config/db.js";
connectDB();
import healthRoutes from "./routes/healthRoutes.js";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://nutrivision-ai-food-nutrition-analyze.netlify.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false,
  })
);

// VERY IMPORTANT (preflight)
app.options("*", cors());




app.use("/api", detectFoodRoutes);

app.use("/api/history", historyRoutes);

app.use("/api/health", healthRoutes);




const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

