import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import detectFoodRoutes from "./routes/detectFoodRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";
import connectDB from "./config/db.js";
connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE"],
  })
);

app.use("/api", detectFoodRoutes);
app.use("/api/history", historyRoutes);



app.listen(5000, () => {
  console.log("Server running on port 5000");
});
