import express from 'express';
import * as adminController from '../controllers/adminController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { roleMiddleware } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.use(authMiddleware, roleMiddleware(['admin']));

router.get('/users', adminController.getAllUsers);
router.get('/documents', adminController.getAllDocuments);
router.delete('/user/:userId', adminController.deleteUser);
router.delete('/document/:docId', adminController.deleteDocument);
router.patch('/user/:userId/role', adminController.changeUserRole);

export default router;
