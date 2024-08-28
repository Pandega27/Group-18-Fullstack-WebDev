// controllers/postController.js
const { emitNotification } = require('../services/notificationService');
const Post = require('../models/Post');

// Example function when a user comments on a post
exports.addComment = async (req, res) => {
  try {
    const { postId, commentText } = req.body;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Add comment logic (omitted for brevity)

    // Emit notification to the post's author
    const notificationData = {
      user_id: post.author, // The user who will receive the notification
      type: 'comment',
      actor_id: req.user._id, // The user who made the comment
      entity_type: 'post',
      entity_id: post._id,
      read: false,
      created_at: new Date(),
    };
    emitNotification(post.author, notificationData);

    res.status(201).json({ message: 'Comment added' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
