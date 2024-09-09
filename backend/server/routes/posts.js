import express from "express";
import { getFeedPosts, getUserPosts, likePost,  addComment, deletePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// DELETE endpoint to remove a post by postId
router.delete('/:postId', (req, res) => {
    const { postId } = req.params;
    deletePost(postId, res);
});

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);

router.post("/:postId/comments", verifyToken, addComment);
 

export default router;
