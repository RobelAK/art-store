import React, { useState } from "react";
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
} from "@mui/material";

function Uspro() {
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
    <section style={{ backgroundColor: "#eee" }}>
      <Container sx={{ py: 5 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ mb: 4 }}>
              <CardContent sx={{ textAlign: "center" }}>
                <CardMedia
                  component="img"
                  height="150"
                  image="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  sx={{ borderRadius: "50%", width: "150px", margin: "0 auto" }}
                />
                <Typography variant="body2" color="textSecondary" mb={1}>
                  Full Stack Developer
                </Typography>
                <Typography variant="body2" color="textSecondary" mb={4}>
                  Bay Area, San Francisco, CA
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                  <Button variant="contained">Follow</Button>
                  <Button variant="outlined" sx={{ ml: 1 }}>
                    Message
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <Card sx={{ mb: 4 }}>
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
          </Grid>
        </Grid>
      </Container>

      {/* Edit Dialogs */}
      <Dialog open={openFullName} onClose={() => handleCloseDialog('Full Name')}>
        <DialogTitle>Edit Full Name</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label="Full Name" fullWidth value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseDialog('Full Name')}>Cancel</Button>
          <Button onClick={() => handleCloseDialog('Full Name')}>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEmail} onClose={() => handleCloseDialog('Email')}>
        <DialogTitle>Edit Email</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label="Email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseDialog('Email')}>Cancel</Button>
          <Button onClick={() => handleCloseDialog('Email')}>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openMobile} onClose={() => handleCloseDialog('Mobile')}>
        <DialogTitle>Edit Mobile</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label="Mobile" fullWidth value={mobile} onChange={(e) => setMobile(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseDialog('Mobile')}>Cancel</Button>
          <Button onClick={() => handleCloseDialog('Mobile')}>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openAddress} onClose={() => handleCloseDialog('Address')}>
        <DialogTitle>Edit Address</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label="Address" fullWidth value={address} onChange={(e) => setAddress(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseDialog('Address')}>Cancel</Button>
          <Button onClick={() => handleCloseDialog('Address')}>Save</Button>
        </DialogActions>
      </Dialog>
    </section>
  );
}

export default Uspro;
