import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar";

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
  const theme = useTheme();
  const navigate = useNavigate();

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
        {/* Create a new Group Button */}
        <Button
          variant="contained"
          size="medium"
          sx={{ marginBottom: "20px" }}
          onClick={() => navigate("/groups/create-group")}
        >
          Create a new Group
        </Button>

        <Typography
          variant="h4"
          sx={{ marginBottom: "20px", color: theme.palette.primary.main }}
        >
          More suggestions
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {groupData.map((group, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea onClick={() => navigate(group.link)}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={group.image}
                    alt={group.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {group.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {group.members} members
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default GroupListingPage;
