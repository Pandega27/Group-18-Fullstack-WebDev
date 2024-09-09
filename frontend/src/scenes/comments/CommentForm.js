// CommentForm.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function CommentForm({ addComment }) {
  const [text, setText] = useState('');
  const firstName = useSelector((state) => state.user.firstName); // Ensure you're using the correct field
  const profilePicture = useSelector((state) => state.user.profilePicture); // Ensure you're using the correct field

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addComment({
        text,
        firstName,
        profilePicture: profilePicture || '/default-profile.jpg',
        likes: {}, // Ensure this matches your backend expectation
      });
      setText(''); // Clear input field
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a comment..."
        className="comment-input"
      />
      <button type="submit" className="comment-button">
        Post
      </button>
    </form>
  );
}

export default CommentForm;
