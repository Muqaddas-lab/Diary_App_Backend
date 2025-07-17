// Import express and create a router instance
import express from "express";

// Import controller functions for user registration and login
import {
  registerUser,
  loginUser,
} from "../controllers/userController.js";

// Create an Express router
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// Export the router
export default router;
