const express = require('express')
const router = express.Router()
const Notification = require('../models/Notification')

// Get notifications for a user
router.get('/:userId/notifications', async (req, res) => {
  try {
    const notifications = await Notification.find({
      userId: req.params.userId, // Accessing the userId from URL parameters
    }).sort({ createdAt: -1 }) // Sorting notifications by creation date in descending order
    res.json(notifications)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Mark notifications as read for a user
router.put('/:userId/notifications', async (req, res) => {
  try {
    await Notification.updateMany(
      { userId: req.params.userId, isRead: false }, // Filtering notifications by userId and unread status
      { isRead: true } // Marking them as read
    )
    res.json({ message: 'Notifications marked as read' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
