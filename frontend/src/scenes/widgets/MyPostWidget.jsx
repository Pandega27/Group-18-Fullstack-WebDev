import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../state";
import { Button, Form, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faPaperclip,
  faFileImage,
  faMicrophone,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";
import Dropzone from "react-dropzone";
import UserImage from "../components/UserImage.jsx";
import "../css/mypostwidget.css"

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = window.innerWidth >= 1000;

  const handlePost = async () => {
    try {
      const formData = new FormData();
      formData.append("userId", _id);
      formData.append("description", post);
      if (image) {
        formData.append("picture", image);
        formData.append("picturePath", image.name);
      }

      const response = await fetch(`http://localhost:3001/posts`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Failed to post data: ${response.statusText}`);
      }

      const posts = await response.json();
      dispatch(setPosts({ posts }));
      setImage(null);
      setPost("");
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <div className="mypostwidget">
    <div className="p-3">
      <div className="d-flex align-items-center mb-3">
        <UserImage image={picturePath} />
        <InputGroup className="ml-3" style={{padding:"15px"}}>
          <Form.Control
            placeholder="What's on your mind..."
            value={post}
            onChange={(e) => setPost(e.target.value)}
          />
        </InputGroup>
      </div>
      {isImage && (
        <div className="p-3 mb-3">
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} className="border p-3 text-center">
                <input {...getInputProps()} />
                {!image ? (
                  <p style={{padding:"10px 0 0 0"}}>Add Image Here</p>
                ) : (
                  <div className="d-flex justify-content-between align-items-center">
                    <span>{image.name}</span>
                    <FontAwesomeIcon icon={faEdit} />
                  </div>
                )}
              </div>
            )}
          </Dropzone>
          {image && (
            <Button
              variant="danger"
              className="mt-2"
              onClick={() => setImage(null)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          )}
        </div>
      )}

      <hr />

      <div className="d-flex justify-content-between">
        <div
          className="d-flex align-items-center"
          onClick={() => setIsImage(!isImage)}
        >
          <FontAwesomeIcon icon={faFileImage} className="mr-2"  />
          <span style={{cursor: "pointer" }}>Image</span>
        </div>

        {isNonMobileScreens ? (
          <>
            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={faPaperclip} className="mr-2" />
              <span>Attachment</span>
            </div>

            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={faMicrophone} className="mr-2" />
              <span>Audio</span>
            </div>
          </>
        ) : (
          <div className="d-flex align-items-center">
            <FontAwesomeIcon icon={faEllipsisH} />
          </div>
        )}

        <Button
          disabled={!post}
          onClick={handlePost}
          variant="success"
          className="ml-auto"
          style={{backgroundColor:"#39FF14"}}
        >
          POST
        </Button>
      </div>
    </div>
    </div>
  );
};

export default MyPostWidget;
