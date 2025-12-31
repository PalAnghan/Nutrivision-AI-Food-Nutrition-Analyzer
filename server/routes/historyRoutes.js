import express from "express";
import History from "../models/FoodHistory.js";

const router = express.Router();

/* GET history */
router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  const total = await History.countDocuments();
  const data = await History.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  res.json({
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    data,
  });
});

/* ✅ DELETE history item */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const deleted = await History.findByIdAndDelete(id);

  if (!deleted) {
    return res.status(404).json({ error: "Item not found" });
  }

  res.json({ message: "Deleted successfully" });
});

export default router;
