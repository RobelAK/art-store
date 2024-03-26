import React, {useState} from "react";
import PostedArt from "../../components/users/PostedArt";
import Footer from "../../components/users/Footer";
import Navbar from "../../components/users/Navbar";
import EditIcon from "@mui/icons-material/Edit";
import {
  Container,
  Grid,
  Breadcrumbs,
  Link,
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Avatar,
  IconButton
} from "@mui/material";

function ProfilePage() {
  const [fullName, setFullName] = useState("Johnatan Smith");
  const [email, setEmail] = useState("example@example.com");
  const [mobile, setMobile] = useState("(098) 765-4321");
  const [address, setAddress] = useState("Bay Area, San Francisco, CA");

  const [openFullName, setOpenFullName] = useState(false);
  const [openEmail, setOpenEmail] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);

  const handleOpenDialog = (field) => {
    switch (field) {
      case "Full Name":
        setOpenFullName(true);
        break;
      case "Email":
        setOpenEmail(true);
        break;
      case "Mobile":
        setOpenMobile(true);
        break;
      case "Address":
        setOpenAddress(true);
        break;
      default:
        break;
    }
  };

  const handleCloseDialog = (field) => {
    switch (field) {
      case "Full Name":
        setOpenFullName(false);
        break;
      case "Email":
        setOpenEmail(false);
        break;
      case "Mobile":
        setOpenMobile(false);
        break;
      case "Address":
        setOpenAddress(false);
        break;
      default:
        break;
    }
  };
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



      <Card sx={{ mb: 4, borderTop: '1px solid black' }}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <Typography variant="body2">Full Name</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="textSecondary">
                      {fullName}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Button variant="outlined" size="small" onClick={() => handleOpenDialog('Full Name')}>Edit</Button>
                  </Grid>

                  <Grid item xs={3}>
                    <Typography variant="body2">Email</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="textSecondary">
                      {email}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Button variant="outlined" size="small" onClick={() => handleOpenDialog('Email')}>Edit</Button>
                  </Grid>

                  <Grid item xs={3}>
                    <Typography variant="body2">Mobile</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="textSecondary">
                      {mobile}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Button variant="outlined" size="small" onClick={() => handleOpenDialog('Mobile')}>Edit</Button>
                  </Grid>

                  <Grid item xs={3}>
                    <Typography variant="body2">Address</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="textSecondary">
                      {address}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Button variant="outlined" size="small" onClick={() => handleOpenDialog('Address')}>Edit</Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
      
      <Footer />
    </>
  );
}

export default ProfilePage;
