// Import required modules
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the User schema
const userSchema = new mongoose.Schema({
  // User's name - required field
  name: {
    type: String,
    required: true,
  },

  // User's email - required and must be unique
  email: {
    type: String,
    required: true,
    unique: true,
  },

  // User's password - required, but not returned in queries by default
  password: {
    type: String,
    required: true,
    select: false, // Don't include password field in queries unless explicitly selected
  }
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Pre-save hook to hash password before saving the user document
userSchema.pre('save', async function () {
  // Only hash the password if it was modified or newly added
  if (!this.isModified('password')) return;

  // Hash the password with a salt round of 10
  this.password = await bcrypt.hash(this.password, 10);
});

// Custom method to compare entered password with hashed password in DB
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Export the model
export default mongoose.model("User", userSchema);
