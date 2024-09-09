import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { CloudUpload } from "react-bootstrap-icons";
import Navbar from "../navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";

const GroupCreationPage = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const [groupName, setGroupName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [rules, setRules] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [formValues, setFormValues] = useState({ visibility: "public" }); // Initialize formValues state

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setFormValues((prevValues) => ({
        ...prevValues,
        image: file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("groupName", groupName);
    formData.append("visibility", formValues.visibility);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("rules", rules);

    try {
      const response = await fetch("http://localhost:3001/groups/create-group", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData, // Send FormData (which includes file)
      });

      if (response.ok) {
        alert("Group created successfully!");
        navigate(`/groups/${groupName}`); // Navigate to the group page using the group name
      } else {
        const errorResult = await response.json();
        alert(`Failed to create group: ${errorResult.message}`);
      }
    } catch (error) {
      console.error("Error creating group:", error);
      alert("Error creating group");
    }
  };

  return (
    <div>
      <Navbar />
      <Container className="d-flex flex-column align-items-center py-4" style={{ minHeight: "100vh" }}>
        <Row className="justify-content-center w-100">
          <Col md={8} lg={6}>
            <div className="p-4 rounded shadow-sm">
              <h4 className="text-center mb-4">Create a New Group</h4>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Group Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter group name"
                    name="groupName"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3 d-flex justify-content-center">
                  <Form.Check
                    type="switch"
                    id="visibility-switch"
                    label={formValues.visibility === "public" ? "Public" : "Private"}
                    checked={formValues.visibility === "public"}
                    onChange={() =>
                      setFormValues((prevValues) => ({
                        ...prevValues,
                        visibility: prevValues.visibility === "public" ? "private" : "public"
                      }))
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Button variant="primary" as="label" htmlFor="imageUpload" className="w-100 text-dark" style={{ backgroundColor: "#39FF14" }}>
                    <CloudUpload /> Upload Image
                  </Button>
                  <Form.Control
                    type="file"
                    id="imageUpload"
                    hidden
                    onChange={handleFileChange}
                  />
                  {imagePreview && (
                    <div className="mt-3 text-center">
                      <img src={imagePreview} alt="Preview" className="img-fluid" style={{ maxHeight: '200px', maxWidth: '100%' }} />
                    </div>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter location"
                    name="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Enter group description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Rules</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Enter group rules"
                    name="rules"
                    value={rules}
                    onChange={(e) => setRules(e.target.value)}
                  />
                </Form.Group>

                <Button type="submit" variant="primary" className="w-100 text-dark" style={{ backgroundColor: "#39FF14" }}>
                  Create Group
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default GroupCreationPage;
