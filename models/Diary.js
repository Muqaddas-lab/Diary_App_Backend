// Import mongoose to define schema and model
import mongoose from "mongoose";

// Define the schema for a diary entry
const diarySchema = new mongoose.Schema({

  // Title of the diary entry - required
  title: {
    type: String,
    required: true,
  },

  // Content/body of the diary entry - required
  content: {
    type: String,
    required: true,
  },

  // Optional image URL or path associated with the diary entry
  image: {
    type: String,
  },

  // Reference to the user who created the diary entry
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",     // Referencing the User model
    required: true,
  }

}, {
  // Automatically adds createdAt and updatedAt fields
  timestamps: true,
});

// Export the Diary model
export default mongoose.model("Diary", diarySchema);
