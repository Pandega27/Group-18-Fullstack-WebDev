import express from 'express';
import notificationController from '../controllers/notificationController.js'; 
import authMiddleware from '../middlewares/authMiddleware.js'; 

const router = express.Router();

// Get notifications for the logged-in user
router.get('/', authMiddleware, notificationController.getUserNotifications);

// Mark a notification as read
router.put('/:id/read', authMiddleware, notificationController.markNotificationAsRead);

export default router;
