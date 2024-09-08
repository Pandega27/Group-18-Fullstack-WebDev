import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../state";
import Friend from "../components/Friend.jsx";
import WidgetWrapper from "../components/WidgetWrapper.jsx";
import "../css/PostWidget.css"

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <div className="postwidget">
    <WidgetWrapper className="my-4">
      <Friend
        friendId={postUserId}
        name={name} 
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <p className="mt-3 text" style={{fontSize:"15px"}}>
        {description}
      </p>
      {picturePath && (
        <img 
          className="img-fluid rounded"
          alt="post"
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      <div className="d-flex justify-content-between align-items-center mt-2">
        <div className="d-flex align-items-center gap-3">
          <div className="d-flex align-items-center gap-2">
            <button className="btn btn-link p-0" onClick={patchLike} style={{color:'white'}}>
              {isLiked ? (
                <i className="bi bi-heart-fill" style={{color:'red'}}></i>
              ) : (
                <i className="bi bi-heart" ></i>
              )}
            </button>
            <span>{likeCount}</span>
          </div>

          <div className="d-flex align-items-center gap-2">
            <button
              className="btn btn-link p-0"
              onClick={() => setIsComments(!isComments)}
            >
              <i className="bi bi-chat" style={{color:"white"}}></i>
            </button>
            <span>{comments.length}</span>
          </div>
        </div>

        <button className="btn btn-link p-0">
          <i className="bi bi-share"></i>
        </button>
      </div>
      {isComments && (
        <div className="mt-2">
          {comments.map((comment, i) => (
            <div key={`${name}-${i}`}>
              <hr />
              <p className="text-muted m-2 pl-3">{comment}</p>
            </div>
          ))}
          <hr />
        </div>
      )}
    </WidgetWrapper>
    </div>
  );
};


export default PostWidget;
