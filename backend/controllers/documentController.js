import cloudinary from '../config/cloudinary.js';
import Document from '../models/DocumentModels.js';
import asyncHandler from '../utils/asyncHandler.js';
import streamifier from 'streamifier';


// Helper to stream upload buffer to Cloudinary
const streamUpload = (req) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'auto',
        folder: 'documents',
      },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(stream);
  });
};


// POST /api/documents/upload
export const uploadDocument = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    const result = await streamUpload(req);

    const doc = await Document.create({
      user: req.user._id,
      fileUrl: result.secure_url,
      fileName: req.file.originalname,
      fileType: req.file.mimetype.split('/')[1],
      category: req.body.category || 'other',
      tags: req.body.tags ? req.body.tags.split(',') : [],
    });

    res.status(201).json(doc);
  } catch (error) {
    console.error('Cloudinary upload failed:', error);
    res.status(500).json({ message: 'Cloudinary upload failed' });
  }
});


// GET /api/documents
export const getUserDocuments = asyncHandler(async (req, res) => {
  const documents = await Document.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(documents);
});


// DELETE /api/documents/:id
export const deleteDocument = asyncHandler(async (req, res) => {
  const doc = await Document.findOne({ _id: req.params.id, user: req.user._id });

  if (!doc) {
    return res.status(404).json({ message: 'Document not found' });
  }

  // Optional: Delete from Cloudinary here if you saved the public_id

  await doc.deleteOne();
  res.status(200).json({ message: 'Document deleted successfully' });
});
