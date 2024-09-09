import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import Navbar from "../navbar";
import "bootstrap/dist/css/bootstrap.min.css";
 
const GroupListingPage = () => {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();
 
  useEffect(() => {
    // Fetch group data from the API
    const fetchGroups = async () => {
      try {
        const response = await fetch("http://localhost:3001/groups"); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch groups");
        }
        const data = await response.json();
        setGroups(data);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };
 
    fetchGroups();
  }, []);
 
  return (
    <div>
      <Navbar />
      <Container className="d-flex flex-column align-items-center py-4">
        {/* Create a new Group Button */}
        <Button
          size="md"
          className="mb-4"
          onClick={() => navigate("/groups/create-group")}
          style={{ backgroundColor: "#39FF14", color: "black" }}
        >
          Create a new Group
        </Button>
 
        {/* More suggestions title */}
        <h4 className="mb-4">More suggestions</h4>
 
        {/* Group Cards */}
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {groups.map((group, index) => (
            <Col key={index} className="d-flex justify-content-center">
              <Card
                onClick={() => navigate(`/groups/${group.id}`)}
                style={{ width: "18rem", cursor: "pointer" }}
                className="text-center shadow-sm"
              >
                <Card.Img
                  variant="top"
                  src={group.image || "https://via.placeholder.com/300x200?text=Group+Image"}
                  alt={group.groupName}
                  style={{ objectFit: "cover", height: "150px" }}
                />
                <Card.Body>
                  <Card.Title>{group.groupName}</Card.Title>
                  {group.members && (
                    <Card.Text className="text-muted">
                      {group.members} members
                    </Card.Text>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};
 
export default GroupListingPage;
 
