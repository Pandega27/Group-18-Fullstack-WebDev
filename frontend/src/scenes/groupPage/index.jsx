import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Button, Typography, useTheme, IconButton } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TagIcon from "@mui/icons-material/Tag";
import ShareIcon from "@mui/icons-material/Share";
import Navbar from "../navbar";

const GroupPage = () => {
  const { groupId } = useParams();
  const theme = useTheme();
  const mode = useSelector((state) => state.mode);

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
            width: "100%",
            height: "300px",
            backgroundImage:
              "url(https://png.pngtree.com/thumb_back/fh260/background/20240506/pngtree-a-business-team-and-its-leader-standing-together-leadership-concept-a-image_15670174.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            marginBottom: "20px",
          }}
        />

        <Box
          sx={{
            backgroundColor: theme.palette.background.alt,
            borderRadius: "8px",
            padding: "20px",
            boxShadow:
              mode === "dark"
                ? "0 0 10px rgba(255, 255, 255, 0.1)"
                : "0 0 10px rgba(0, 0, 0, 0.1)",
            width: "80%",
            maxWidth: "800px",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              marginBottom: "20px",
              color: theme.palette.primary.main,
              textAlign: "center",
            }}
          >
            Entrepreneurs
          </Typography>

          <Typography
            variant="body1"
            sx={{
              marginBottom: "20px",
              color: theme.palette.neutral.mediumMain,
              textAlign: "center",
            }}
          >
            This Group is all about Entrepreneurs, Startups & Techs to share
            your ideas with the community, ask recommendations, share your
            businesses, ideas, tech news, and more.
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <Button
              variant="contained"
              sx={{
                marginRight: "10px",
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.neutral.light,
              }}
            >
              Join Group
            </Button>
            <Button
              variant="outlined"
              startIcon={<ShareIcon />}
              sx={{
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
              }}
            >
              Share
            </Button>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              color: theme.palette.neutral.mediumMain,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <LockIcon />
              <Typography variant="body2">Private Group</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <VisibilityIcon />
              <Typography variant="body2">Visible to everyone</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <CalendarTodayIcon />
              <Typography variant="body2">Created on 19 May 2019</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <TagIcon />
              <Typography variant="body2">
                Tags: Entrepreneurship & Startups, Apps & Software
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default GroupPage;
