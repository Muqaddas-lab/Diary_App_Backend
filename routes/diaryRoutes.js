// Import express and create a router instance
import express from "express";

// Import controller functions for diary operations
import {
  createDiary,
  getUserDiaries,
  updateDiaryEntry,
  deleteDiaryEntry,
} from "../controllers/diaryController.js";

// Import middleware to protect routes (authentication check)
import { protect } from "../middleware/authMiddleware.js";

// Create an Express router
const router = express.Router();

router.post("/", protect, createDiary);
router.get("/", protect, getUserDiaries); 
router.put("/:id", protect, updateDiaryEntry);
router.delete("/:id", protect, deleteDiaryEntry);

// Export the router
export default router;
