import cloudinary from '../config/cloudinary.js';
import Document from '../models/DocumentModels.js';
import asyncHandler from '../utils/asyncHandler.js';

// POST /api/documents/upload
export const uploadDocument = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }



  // Upload file buffer to Cloudinary
  const result = await cloudinary.uploader.upload_stream(
    { resource_type: 'auto', folder: 'documents' },
    async (error, result) => {
      if (error) {
        throw new Error('Cloudinary upload failed');
      }

      // Save metadata to MongoDB
      const doc = await Document.create({
        user: req.user._id,
        fileUrl: result.secure_url,
        fileName: req.file.originalname,
        fileType: req.file.mimetype.split('/')[1],
        category: req.body.category || 'other',
        tags: req.body.tags ? req.body.tags.split(',') : [],
      });

      res.status(201).json(doc);
    }
  );

  // Pipe the file buffer to Cloudinary
  result.end(req.file.buffer);
});

  // GET /api/documents
export const getUserDocuments = asyncHandler(async (req, res) => {
  const documents = await Document.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(documents);
});

//DELETE /api/documents/:id

export const deleteDocument = asyncHandler(async (req, res) => {
  const doc = await Document.findOne({_id: req.params.id, user: req.user._id});

  if (!doc) {
    return res.status(404).json({ message: 'Document not found' });
  }

  // Delete from Cloudinary
  await doc.deleteOne();
  res.status(200).json({ message: 'Document deleted successfully' });
})
