// services/notificationService.js
import Notification from '../models/Notification.js';

let io; // Store the Socket.io instance

// Initialize the Socket.io instance
export const initNotificationService = (socketIoInstance) => {
  io = socketIoInstance;
};

// Function to emit notifications to a specific user
export const emitNotification = async (userId, notificationData) => {
  // Save notification to the database
  const newNotification = await Notification.create(notificationData);

  // Emit the notification to the user if they are connected
  if (io) {
    io.to(userId.toString()).emit('newNotification', newNotification);
  }
};
