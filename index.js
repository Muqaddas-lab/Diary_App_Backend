// Import required modules
import express from "express";
import dotenv from "dotenv";

// Import custom modules
import { connectToDatabase } from "./config/db.js"; // Database connection
import userRoutes from "./routes/userRoutes.js";     // User routes
import diaryRoutes from "./routes/diaryRoutes.js";   // Diary routes
import { errorHandler } from './middleware/errorMiddleware.js'; // Custom error handler

// Initialize Express app
const app = express();

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB database
connectToDatabase();

// Middleware to parse JSON request bodies
app.use(express.json());

// Route Middlewares
app.use("/api/users", userRoutes);     // All user-related API endpoints
app.use("/api/diaries", diaryRoutes);  // All diary-related API endpoints

// Default route for testing API
app.get("/", (req, res) => {
  res.send("Diary App API is running!");
});

// Error handling middleware (optional, include if implemented)
app.use(errorHandler);

// Start the server on specified port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
