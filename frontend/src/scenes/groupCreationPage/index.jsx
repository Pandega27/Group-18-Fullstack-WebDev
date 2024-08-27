import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Switch,
  Typography,
  FormControlLabel,
  Chip,
  IconButton,
  useTheme,
} from "@mui/material";
import { CloudUpload, AddCircleOutline } from "@mui/icons-material";
import Navbar from "../navbar";

const GroupCreationPage = () => {
  const theme = useTheme();
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
    <Box>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
          backgroundColor: theme.palette.background.default,
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            backgroundColor: theme.palette.background.alt,
            borderRadius: "8px",
            padding: "20px",
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 0 10px rgba(255, 255, 255, 0.1)"
                : "0 0 10px rgba(0, 0, 0, 0.1)",
            width: "80%",
            maxWidth: "600px",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              marginBottom: "20px",
              textAlign: "center",
              color: theme.palette.primary.main,
            }}
          >
            Create a New Group
          </Typography>

          {/* Group Name */}
          <TextField
            fullWidth
            label="Group Name"
            variant="outlined"
            sx={{ marginBottom: "20px" }}
          />

          {/* Group Visibility */}
          <FormControlLabel
            control={
              <Switch
                checked={visibility}
                onChange={handleVisibilityToggle}
                name="visibility"
                color="primary"
              />
            }
            label={visibility ? "Public" : "Private"}
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          />

          {/* Tags */}
          <Box sx={{ marginBottom: "20px" }}>
            <TextField
              fullWidth
              label="Tags"
              variant="outlined"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleTagAdd()}
            />
            <IconButton onClick={handleTagAdd} color="primary">
              <AddCircleOutline />
            </IconButton>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                marginTop: "10px",
              }}
            >
              {tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  onDelete={() => handleTagDelete(tag)}
                  color="primary"
                />
              ))}
            </Box>
          </Box>

          {/* Image Upload */}
          <Button
            variant="contained"
            component="label"
            startIcon={<CloudUpload />}
            fullWidth
            sx={{ marginBottom: "20px" }}
          >
            Upload Image
            <input type="file" hidden />
          </Button>

          {/* Location */}
          <TextField
            fullWidth
            label="Location"
            variant="outlined"
            sx={{ marginBottom: "20px" }}
          />

          {/* Group Description */}
          <TextField
            fullWidth
            label="Group Description"
            variant="outlined"
            multiline
            rows={4}
            sx={{ marginBottom: "20px" }}
          />

          {/* Group Rules */}
          <TextField
            fullWidth
            label="Group Rules"
            variant="outlined"
            multiline
            rows={4}
            sx={{ marginBottom: "20px" }}
          />

          {/* Submit Button */}
          <Button variant="contained" color="primary" fullWidth>
            Create Group
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default GroupCreationPage;
