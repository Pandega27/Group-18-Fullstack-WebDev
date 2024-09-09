import React from 'react';

function Comment({ comment, deleteComment, likeComment }) {
  return (
    <div className="comment">
      <div className="comment-header">
        <img
          src={comment.profilePicture || '/default-profile.jpg'}
          alt={`${comment.firstName}'s profile`}
          className="profile-picture"
        />
        <strong style={{color:"black"}}>{comment.firstName} {comment.lastName}</strong>
      </div>
      <p className="comment-text">{comment.text}</p>
    </div>
  );
}

export default Comment;
