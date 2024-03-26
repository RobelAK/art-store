import React from "react";
import { Container } from "@mui/material";
import PostedArt from "../../components/users/PostedArt";
import Footer from "../../components/users/Footer";
import Navbar from "../../components/users/Navbar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function ProfilePage() {
  return (
    <>
      <Navbar />
      <Container sx={{ height: "90px", overflow: "hidden" }} />

      <Card sx={{ maxWidth: "100%", margin: "auto" }}>
        <Box
          sx={{
            position: "relative",
            height: 150,
            background: "#d3dce3",
            backgroundSize: "cover",
          }}
        >
          <IconButton
            sx={{ position: "absolute", top: 0, right: 0, color: "white" }}
          >
            <EditIcon />
          </IconButton>
        </Box>
        <Avatar
          // src="url(https://source.unsplash.com/random/300x400?Avatar)"
          alt="Profile Image"
          sx={{
            width: 100,
            height: 100,
            border: "4px solid #fff",
            position: "relative",
            top: -50,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
        <Container
          sx={{ display: "flex", justifyContent: "end", marginTop: -12 }}
        >
          <Button variant="contained" color="primary" sx={{ marginRight: 2 }}>
            Edit Profile
          </Button>
          <Button variant="outlined" color="primary">
            Add Art
          </Button>
        </Container>
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h5" component="div" gutterBottom>
            User Name
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            This is the user's bio. Add more information about yourself.
          </Typography>
        </CardContent>
      </Card>
      

      <Footer />
    </>
  );
}

export default ProfilePage;
