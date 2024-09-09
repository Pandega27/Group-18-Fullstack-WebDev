import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPost } from '../state';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import "../css/CommentReply.css";

function CommentReply({ postId, comments }) {
  const [localComments, setLocalComments] = useState(comments);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);

  useEffect(() => {
    setLocalComments(comments); // Update local state with new comments
  }, [comments]);

  const addComment = async (newComment) => {
    try {
      const response = await fetch(`http://localhost:3001/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...newComment, userId: loggedInUserId }),
      });
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
      setLocalComments(updatedPost.comments);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const response = await fetch(`http://localhost:3001/posts/${postId}/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
      setLocalComments(updatedPost.comments);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const likeComment = async (commentId) => {
    try {
      const response = await fetch(`http://localhost:3001/posts/${postId}/comments/${commentId}/like`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      });
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
      setLocalComments(updatedPost.comments);
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  return (
    <div className="comment-reply">
      <CommentForm postId={postId} addComment={addComment} />
      <CommentList 
        comments={localComments} 
        addComment={addComment} 
        deleteComment={deleteComment} 
        likeComment={likeComment} 
      />
    </div>
  );
}

export default CommentReply;
