import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import Navbar from "../navbar";
import "bootstrap/dist/css/bootstrap.min.css";

const groupData = [
  {
    name: "English & Vietnamese Exchange CLUB in HCMC",
    members: "3.5K",
    image: "https://via.placeholder.com/300x200?text=Group+1",
    link: "/groups/1",
  },
  {
    name: "Learn Vietnamese free",
    members: "14K",
    image: "https://via.placeholder.com/300x200?text=Group+2",
    link: "/groups/2",
  },
  {
    name: "Việc Làm IT - IT Jobs Việt Nam",
    members: "110K",
    image: "https://via.placeholder.com/300x200?text=Group+3",
    link: "/groups/3",
  },
  {
    name: "Remote Jobs Work from Anywhere",
    members: "85K",
    image: "https://via.placeholder.com/300x200?text=Group+4",
    link: "/groups/4",
  },
  {
    name: "Entrepreneurs Network",
    members: "55K",
    image: "https://via.placeholder.com/300x200?text=Group+5",
    link: "/groups/5",
  },
  {
    name: "Tech Enthusiasts",
    members: "65K",
    image: "https://via.placeholder.com/300x200?text=Group+6",
    link: "/groups/6",
  },
  {
    name: "Startup Founders",
    members: "22K",
    image: "https://via.placeholder.com/300x200?text=Group+7",
    link: "/groups/7",
  },
  {
    name: "Digital Nomads",
    members: "33K",
    image: "https://via.placeholder.com/300x200?text=Group+8",
    link: "/groups/8",
  },
  {
    name: "Fitness & Wellness",
    members: "10K",
    image: "https://via.placeholder.com/300x200?text=Group+9",
    link: "/groups/9",
  },
  {
    name: "Coding & Development",
    members: "20K",
    image: "https://via.placeholder.com/300x200?text=Group+10",
    link: "/groups/10",
  },
];

const GroupListingPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <Container className="d-flex flex-column align-items-center py-4">
        {/* Create a new Group Button */}
        <Button
          size="md"
          className="mb-4"
          onClick={() => navigate("/groups/create-group")}
          style={{backgroundColor:"#39FF14", color:"black"}}
        >
          Create a new Group
        </Button>

        {/* More suggestions title */}
        <h4 className="mb-4 text">More suggestions</h4>

        {/* Group Cards */}
        <Row>
          {groupData.map((group, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card onClick={() => navigate(group.link)} style={{ cursor: "pointer" }}>
                <Card.Img variant="top" src={group.image} alt={group.name} />
                <Card.Body>
                  <Card.Title>{group.name}</Card.Title>
                  <Card.Text className="text-muted">
                    {group.members} members
                  </Card.Text>
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
