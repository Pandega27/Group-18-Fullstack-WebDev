const Notification = require('../models/Notification') // Ensure the correct path to the model

// Get notifications for a specific user
exports.getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      userId: req.user._id, // Make sure this matches the field in your model
    }).sort({ createdAt: -1 }) // Ensure this matches your model's field names

    res.status(200).json(notifications)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Mark a notification as read
exports.markNotificationAsRead = async (req, res) => {
  try {
    const notification = await Notification.findOne({
      _id: req.params.id,
      userId: req.user._id, // Ensure the notification belongs to the user
    })

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' })
    }

    notification.isRead = true // Assuming `isRead` is the correct field name in your model
    await notification.save()

    res.status(200).json(notification)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
