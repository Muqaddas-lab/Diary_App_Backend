import Diary from "../models/Diary.js";

// Create diary controller
export const createDiary = async (req, res) => {
  // Destructure frontend se aayi values
  const { title, content, image } = req.body;
  const imagePath = req.file ? req.file.path : null; // Agar image upload hui hai to uska path lo

  try {
    // Diary create kar rahe hain; `req.user.id` middleware se aata hai (JWT auth)
    const diary = await Diary.create({
      title,
      content,
      image,
      user: req.user.id,
    });

    // Success response
    res.status(201).json({ message: "Diary created", diary });
  } catch (error) {
    // Agar koi error aaye to woh yahaan catch hoga
    res.status(400).json({ message: "Error creating diary", error: error.message });
  }
};


// Get all diary entries of the logged-in user
export const getUserDiaries = async (req, res) => {
  try {
    // `req.user.id` middleware (protect) se aata hai
    const diaries = await Diary.find({ user: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "User diaries fetched successfully",
      diaries,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch diaries", error: error.message });
  }
};


// Update diary entry
export const updateDiaryEntry = async (req, res) => {
  try {
    const { title, content, image } = req.body;

    // Find and update diary only if it belongs to the logged-in user
    const updatedDiary = await Diary.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id }, // Match ID and user
      { title, content, image },
      { new: true, runValidators: true }
    );

    if (!updatedDiary) {
      return res.status(404).json({ message: "Diary not found or unauthorized" });
    }

    res.status(200).json({
      message: "Diary entry updated successfully",
      diary: updatedDiary,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating diary", error: error.message });
  }
};


// Delete diary entry
export const deleteDiaryEntry = async (req, res) => {
  try {
    // Sirf woh diary delete karo jo logged-in user ki ho
    const deletedDiary = await Diary.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!deletedDiary) {
      return res.status(404).json({ message: "Diary not found or unauthorized" });
    }

    res.status(200).json({ message: "Diary entry deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting diary entry",
      error: error.message
    });
  }
};


