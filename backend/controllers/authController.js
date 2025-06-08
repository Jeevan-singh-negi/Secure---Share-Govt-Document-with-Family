import User from '../models/UserModels.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import Joi from 'joi';

// Simple validation schema for registration
const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  aadhaar: Joi.string().length(12).optional(),
});

// Register a new user
export const registerUser = asyncHandler(async (req, res) => {
  // Validate input
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { name, email, password, aadhaar } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create the user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    aadhaar,
  });

  // Respond with user info and JWT
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    aadhaar: user.aadhaar,
    token: generateToken(user._id),
  });
});

// Login user
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Respond with user info and JWT
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    aadhaar: user.aadhaar,
    token: generateToken(user._id),
  });
});
