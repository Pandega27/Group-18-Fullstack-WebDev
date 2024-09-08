import React from "react";
import { useSelector } from "react-redux"; // For navigation if needed
import { Button } from "react-bootstrap";
import { Calendar, Eye, Lock, Tag, Share } from "react-bootstrap-icons";
import Navbar from "../navbar";
import "bootstrap/dist/css/bootstrap.min.css";

const GroupPage = () => {
  const mode = useSelector((state) => state.mode);

  return (
    <div>
      <Navbar />
      <div
        className="d-flex flex-column align-items-center p-3"
        style={{
          backgroundColor: mode === "dark" ? "#121212" : "#f8f9fa",
          minHeight: "100vh",
        }}
      >
        {/* Background Image */}
        <div
          className="mb-3"
          style={{
            width: "100%",
            height: "300px",
            backgroundImage:
              "url(https://png.pngtree.com/thumb_back/fh260/background/20240506/pngtree-a-business-team-and-its-leader-standing-together-leadership-concept-a-image_15670174.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        {/* Group Details */}
        <div
          className="p-4 rounded shadow-lg"
          style={{
            backgroundColor: mode === "dark" ? "#2c2c2c" : "#fff",
            width: "80%",
            maxWidth: "800px",
          }}
        >
          <h2 className="text text-center mb-4">Entrepreneurs</h2>
          <p className="text text-center mb-4">
            This Group is all about Entrepreneurs, Startups & Techs to share
            your ideas with the community, ask recommendations, share your
            businesses, ideas, tech news, and more.
          </p>

          {/* Join Group & Share Buttons */}
          <div className="d-flex justify-content-center mb-4">
            <Button className="me-2" variant="primary">
              Join Group
            </Button>
            <Button variant="outline-primary">
              <Share className="me-2" />
              Share
            </Button>
          </div>

          {/* Group Info */}
          <div className="text d-flex flex-column align-items-center gap-2">
            <div className="d-flex align-items-center gap-2">
              <Lock />
              <p className="mb-0">Private Group</p>
            </div>
            <div className="d-flex align-items-center gap-2">
              <Eye />
              <p className="text mb-0">Visible to everyone</p>
            </div>
            <div className="d-flex align-items-center gap-2">
              <Calendar />
              <p className="text mb-0">Created on 19 May 2019</p>
            </div>
            <div className="d-flex align-items-center gap-2">
              <Tag />
              <p className="text mb-0">
                Tags: Entrepreneurship & Startups, Apps & Software
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupPage;
