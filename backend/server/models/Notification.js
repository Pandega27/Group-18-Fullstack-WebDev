import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Recipient of the notification
  type: { 
    type: String, 
    enum: ['friend_request', 'friend_accept', 'comment', 'reaction', 'group_request', 'group_approval'], 
    required: true 
  },
  actor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User who triggered the notification
  entity_type: { 
    type: String, 
    enum: ['post', 'comment', 'group', 'friend'], 
    required: true 
  },
  entity_id: { type: mongoose.Schema.Types.ObjectId, required: true }, // The ID of the related object (post, comment, group)
  read: { type: Boolean, default: false }, // Notification read status
  created_at: { type: Date, default: Date.now }
});


const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;


