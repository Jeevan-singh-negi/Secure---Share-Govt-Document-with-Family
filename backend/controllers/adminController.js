import User from '../models/UserModels.js';
import Document from '../models/DocumentModels.js';
import asyncHandler from '../utils/asyncHandler.js';
import logger from '../utils/logger.js';
import {validator} from '../utils/validator.js'; // Assuming you have custom validation logic

// 1. Get all users
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password');
  logger.info('Admin fetched all users');
  res.json(users);
});

// 2. Get all documents
export const getAllDocuments = asyncHandler(async (req, res) => {
  const documents = await Document.find().populate('user', 'name email');
  logger.info('Admin fetched all documents');
  res.json(documents);
});

// 3. Delete a user (and optionally their documents)
export const deleteUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  await User.findByIdAndDelete(userId);
  // Optionally: await Document.deleteMany({ user: userId });
  logger.warn(`Admin deleted user: ${userId}`);
  res.json({ message: 'User deleted successfully' });
});

// 4. Delete a document
export const deleteDocument = asyncHandler(async (req, res) => {
  const { docId } = req.params;
  await Document.findByIdAndDelete(docId);
  logger.warn(`Admin deleted document: ${docId}`);
  res.json({ message: 'Document deleted successfully' });
});

// 5. Change user role
export const changeUserRole = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  // Use your validator utility for role validation
  if (!validator.isIn(role, ['user', 'admin'])) {
    logger.error(`Invalid role attempted: ${role}`);
    return res.status(400).json({ message: 'Invalid role' });
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { role },
    { new: true }
  ).select('-password');

  logger.info(`Admin changed role for user ${userId} to ${role}`);
  res.json({ message: 'User role updated', user });
});
