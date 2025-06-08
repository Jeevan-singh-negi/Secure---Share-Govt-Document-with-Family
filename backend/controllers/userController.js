import User from '../models/UserModels.js';
import bcrypt from 'bcryptjs';
import asyncHandler from '../utils/asyncHandler.js';

// Get current user's profile
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Update current user's profile
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    // Only update Aadhaar if provided
    if (req.body.aadhaar) user.aadhaar = req.body.aadhaar;

    // If password is provided, hash it
    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 12);
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      aadhaar: updatedUser.aadhaar,
      token: req.user.token // Or regenerate if you want
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});
