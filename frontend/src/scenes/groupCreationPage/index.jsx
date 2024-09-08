import React, { useState } from "react";
import { Button, Form, Container, Row, Col, Badge } from "react-bootstrap";
import { CloudUpload, PlusCircle } from "react-bootstrap-icons";
import Navbar from "../navbar";
import "bootstrap/dist/css/bootstrap.min.css";

const GroupCreationPage = () => {
  const [visibility, setVisibility] = useState(false); // Default to private
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const handleVisibilityToggle = () => {
    setVisibility((prev) => !prev);
  };

  const handleTagAdd = () => {
    if (tagInput.trim() !== "") {
      setTags((prevTags) => [...prevTags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleTagDelete = (tagToDelete) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToDelete));
  };

  return (
    <div>
      <Navbar />
      <Container className="d-flex flex-column align-items-center py-4" style={{ minHeight: "100vh" }}>
        <Row className="justify-content-center w-100">
          <Col md={8} lg={6}>
            <div className="p-4 rounded shadow-sm">
              <h4 className="text-center mb-4 text">Create a New Group</h4>

              {/* Group Name */}
              <Form.Group className="mb-3">
                <Form.Label>Group Name</Form.Label>
                <Form.Control type="text" placeholder="Enter group name" />
              </Form.Group>

              {/* Group Visibility */}
              <Form.Group className="mb-3 d-flex justify-content-center">
                <Form.Check 
                  type="switch" 
                  id="visibility-switch" 
                  label={visibility ? "Public" : "Private"} 
                  checked={visibility}
                  onChange={handleVisibilityToggle} 
                />
              </Form.Group>

              {/* Tags */}
              <Form.Group className="mb-3">
                <Form.Label>Tags</Form.Label>
                <div className="d-flex align-items-center">
                  <Form.Control
                    type="text"
                    placeholder="Enter tags"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleTagAdd()}
                  />
                  <Button variant="primary" onClick={handleTagAdd} className="ms-2" style={{backgroundColor:"#39FF14"}}>
                    <PlusCircle className="text-dark"/>
                  </Button>
                </div>
                <div className="mt-3">
                  {tags.map((tag, index) => (
                    <Badge pill bg="primary" key={index} className="me-2 mb-2">
                      {tag} <span style={{ cursor: "pointer" }} onClick={() => handleTagDelete(tag)}>&times;</span>
                    </Badge>
                  ))}
                </div>
              </Form.Group>

              {/* Image Upload */}
              <Form.Group className="mb-3">
                <Button variant="primary" as="label" htmlFor="imageUpload" className="w-100 text-dark" style={{backgroundColor:"#39FF14"}}>
                  <CloudUpload /> Upload Image
                </Button>
                <Form.Control type="file" id="imageUpload" hidden />
              </Form.Group>

              {/* Location */}
              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" placeholder="Enter location" />
              </Form.Group>

              {/* Group Description */}
              <Form.Group className="mb-3">
                <Form.Label>Group Description</Form.Label>
                <Form.Control as="textarea" rows={4} placeholder="Enter group description" />
              </Form.Group>

              {/* Group Rules */}
              <Form.Group className="mb-3">
                <Form.Label>Group Rules</Form.Label>
                <Form.Control as="textarea" rows={4} placeholder="Enter group rules" />
              </Form.Group>

              {/* Submit Button */}
              <Button variant="primary" className="w-100 text-dark" style={{backgroundColor:"#39FF14"}}>
                Create Group
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default GroupCreationPage;
