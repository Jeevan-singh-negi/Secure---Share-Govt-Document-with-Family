import express from 'express';
import { uploadDocument, deleteDocument, getUserDocuments } from '../controllers/documentController.js';
import protect from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.post('/upload', protect, upload.single('file'), uploadDocument);

router.get('/', protect, getUserDocuments);

router.delete('/:id', protect, deleteDocument);

export default router;
