// controllers/notificationController.js
const Notification = require('models/Notification');

// Get notifications for a specific user
exports.getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user_id: req.user._id }).sort({ created_at: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mark a notification as read
exports.markNotificationAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    notification.read = true;
    await notification.save();

    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





