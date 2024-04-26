import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  Typography,
  Box,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormLabel,
} from "@mui/material";
import axios from "axios";
import Footer from "../../components/users/Footer";
import PostedArt from "../../components/users/PostedArt";
import Navbar from "../../components/users/Navbar";
import { useNavigate , Link } from "react-router-dom";

function SellerProfile() {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate()
  const [id, setId] = useState("");
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [newPassword, setnewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [OpenEditProfile, setOpenEditProfile] = useState(false);
  const [newName, setNewName] = useState("");

  const handleOpenEditProfile = () => {
    setOpenEditProfile(true);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(atob(token.split(".")[1]));
      setId(user.id);
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    } else {
      navigate("/login");
    }
  }, []);

  const handleNewname = (event) => {
    setNewName(event.target.value);
  };
  const handleCurrentPassword = (event) => {
    setCurrentPassword(event.target.value);
  };
  const handleNewPassword = (event) => {
    setnewPassword(event.target.value);
  };
  const handleNewPasswordConfirm = (event) => {
    setNewPasswordConfirm(event.target.value);
  };

  
  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
      password
    );

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar
    );
  };
  const handleChangeName = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    const value = {
      name: newName,
      id: id,
      email: email,
      role: role,
    };
    axios
      .post("http://localhost:8081/profile/changename", value)
      .then((res) => {
        const token = res.data.token;
        localStorage.removeItem("token");
        localStorage.setItem("token", token);
        alert(res.data.Message);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
  const handleChangePassword = (event) => {
    event.preventDefault();
    const value = {
      id: id,
      newPassword: newPassword,
      newPasswordConfirm: newPasswordConfirm,
      currentPassword: currentPassword,
    };
    const isValid = validatePassword(newPassword);
    if (!isValid) {
      console.log("Invalid Password");
    } else {
      if (newPassword == newPasswordConfirm) {
        axios
          .post("http://localhost:8081/profile/changepassword", value)
          .then((res) => {
            alert(res.data.Message);
            window.location.reload();
          })
          .catch((err) => console.log(err));
      } else {
        console.log("Password doesnt match");
      }
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
          <Button
            variant="contained"
            color="primary"
            sx={{ marginRight: 2 }}
            onClick={handleOpenEditProfile}
          >
            Edit Profile
          </Button>
           <Button variant="outlined" color="primary"  component={Link} to="/addart">
            Add Art
          </Button> 
        </Container>
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h5" component="div" gutterBottom>
            {name}
          </Typography>
        </CardContent>
      </Card>
      <PostedArt/>


      <Dialog open={OpenEditProfile} onClose={() => setOpenEditProfile(false)}>
        <Container sx={{ padding: 2 }}>
          <Grid sx={{display: 'flex', justifyContent: 'center'}}>
            <Typography>Edit Profile</Typography>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box component="form" onSubmit={handleChangePassword}>
                <Grid container rowSpacing={2}>
                  <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
                    <Typography>Edit Password</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      type="text"
                      name="currentPassword"
                      label="Current password"
                      onChange={handleCurrentPassword}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      type="text"
                      name="newPassword"
                      label="New password"
                      onChange={handleNewPassword}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      type="text"
                      name="newPasswrodConfirm"
                      label="Confirm password"
                      onChange={handleNewPasswordConfirm}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 1 }}
                >
                  Confirm
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box component="form" onSubmit={handleChangeName}>
                <Grid container rowSpacing={2}>
                  <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
                    <Typography>Edit Name</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      type="text"
                      name="newname"
                      label="New name"
                      onChange={handleNewname}
                    />
                  </Grid>

                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 1 }}
                >
                  Confirm
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Dialog>
      <Footer />
    </>
  );
}

export default SellerProfile;