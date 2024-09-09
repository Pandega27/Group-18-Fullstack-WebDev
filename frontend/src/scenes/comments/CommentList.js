import React from 'react';
import Comment from './Comments';

function CommentList({ comments, deleteComment, likeComment }) {
  return (
    <div>
      {comments.map((comment) => (
        <Comment
          key={comment._id}
          comment={comment}
          deleteComment={deleteComment}
          likeComment={likeComment}
        />
      ))}
    </div>
  );
}

export default CommentList;
