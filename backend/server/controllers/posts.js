import User from "../models/User.js";
import Post from "../models/Post.js"

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId, text } = req.body;
    // console.log("Request Body:", req.body);
    // console.log("Post ID:", req.params.postId);
    
    // Fetch user details
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    
    // Create a new comment
    const comment = {
      userId,
      text,
      firstName: user.firstName,
      lastName: user.lastName,
      userPicturePath: user.picturePath,
      likes: {}, // Changed from Map to an object for simplicity
      replies: [],
    };
 
    // Fetch post and add comment
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });
 
    post.comments.push(comment);
    const updatedPost = await post.save();
 
    res.status(201).json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
 
 
/* UPDATE - Add Reply to Comment */
export const addReply = async (req, res) => {
  try {
    const { postId, commentId } = req.params; // Get post and comment IDs from params
    const { userId, text } = req.body; // Reply text and userId from body
    const user = await User.findById(userId);
 
    const reply = {
      userId,
      text,
      firstName: user.firstName,
      lastName: user.lastName,
      userPicturePath: user.picturePath,
      likes: new Map(), // Reply likes start empty
    };
 
    const post = await Post.findById(postId);
 
    // Find the specific comment to reply to
    const comment = post.comments.find((c) => c._id.toString() === commentId);
    if (comment) {
      comment.replies.push(reply); // Add reply to the comment's replies array
    }
 
    const updatedPost = await post.save(); // Save the updated post
 
    res.status(200).json(updatedPost); // Return the updated post
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// In posts.js controller
export const deletePost = async (postId, res) => {
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    await Post.findByIdAndRemove(postId);
    res.status(204).send(); // No Content, successful deletion
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
