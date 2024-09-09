import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom"; // Make sure to import useNavigate
import { Button } from "react-bootstrap";
import { Calendar, Eye, Lock, Tag, Share, GeoAlt } from "react-bootstrap-icons";
import Navbar from "../navbar";
import "bootstrap/dist/css/bootstrap.min.css";

const GroupPage = () => {
  const mode = useSelector((state) => state.mode);
  const { groupName } = useParams();
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [group, setGroup] = useState({
    groupName: "",
    description: "",
    location: "",
    tags: "",
    createdOn: "",
    isPrivate: false,
  });

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await fetch(`http://localhost:3001/groups/${groupName}`);
        if (!response.ok) {
          throw new Error("Failed to fetch group data");
        }
        const data = await response.json();
        setGroup(data);
      } catch (error) {
        console.error("Error fetching group data:", error);
      }
    };

    fetchGroup();
  }, [groupName]);

  // Define the handleJoinGroup function
  const handleJoinGroup = () => {
    navigate(`/groups/${groupName}/posts`); // Navigate to posts page
  };

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
          <h2 className="text text-center mb-4">{group.groupName}</h2>
          <p className="text text-center mb-4">{group.description}</p>

          {/* Join Group & Share Buttons */}
          <div className="d-flex justify-content-center mb-4">
            <Button className="me-2" variant="primary" onClick={handleJoinGroup}>
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
              <p className="mb-0">{group.isPrivate ? "Private Group" : "Public Group"}</p>
            </div>
            <div className="d-flex align-items-center gap-2">
              <Eye />
              <p className="text mb-0">
                {group.isPrivate ? "Visible to members only" : "Visible to everyone"}
              </p>
            </div>
            <div className="d-flex align-items-center gap-2">
              <Calendar />
              <p className="text mb-0">Created on {group.createdOn}</p>
            </div>
            <div className="d-flex align-items-center gap-2">
              <Tag />
              <p className="text mb-0">Tags: {group.tags}</p>
            </div>
            <div className="d-flex align-items-center gap-2">
              <GeoAlt />
              <p className="text mb-0">Location: {group.location}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupPage;
