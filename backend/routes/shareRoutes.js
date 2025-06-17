import express from 'express';
import {
  shareDocumentWithUser,
  getSharedDocuments,
  generateShareLink,
  accessSharedDocument,
} from '../controllers/shareController.js';
import protect from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/:docId', protect, shareDocumentWithUser);
router.get('/received', protect, getSharedDocuments);
router.post('/:docId/link', protect, generateShareLink);
router.get('/link/:token', accessSharedDocument);

export default router;
