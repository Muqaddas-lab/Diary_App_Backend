

// Import required modules
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser"; // for handling cookies

// Import custom modules
import { connectToDatabase } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import diaryRoutes from "./routes/diaryRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

// Initialize Express app
const app = express();

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB database
connectToDatabase();

// Enable CORS
app.use(cors({
  origin: ["http://localhost:3000",
    "https://diary-app-frontend-lime.vercel.app"
  ],

  credentials: true // this allows cookies to be sent
}));

// Middleware to parse cookies and JSON
app.use(cookieParser());           // Parse cookies from frontend
app.use(express.json());           // Parse JSON bodies

// Route Middlewares
app.use("/api/users", userRoutes);
app.use("/api/diaries", diaryRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Diary App API is running!");
});

// Custom error handler
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
