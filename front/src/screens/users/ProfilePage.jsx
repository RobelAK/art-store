// import React, { useEffect,useState} from "react";

// import PostedArt from "../../components/users/PostedArt";
// import Footer from "../../components/users/Footer";
// import Navbar from "../../components/users/Navbar";
// import EditIcon from "@mui/icons-material/Edit";
// import {Container,Grid,Card,CardContent,Button,Typography,Box,Avatar,IconButton} from "@mui/material";
// import axios from "axios";

// function ProfilePage() {
//   axios.defaults.withCredentials = true;
//   const [id, setId] = useState(null);
//   const [name, setName] = useState(null);
//   const [email, setEmail] = useState(null);
//   const [role, setRole] = useState(null);
//   const [newName, setNewname] = useState("");
//   useEffect(() => {
//     const token = localStorage.getItem('token')
//     if (token) {
//       const user = JSON.parse(atob(token.split(".")[1]));
//       setId(user.id);
//       setName(user.name);
//       setEmail(user.email);
//       setRole(user.role);
//     } else {
//       navigate("/login");
//     }
//   }, [])
//   return (
//     <>
//       <Navbar />
//       <Container sx={{ height: "90px", overflow: "hidden" }} />

//       <Card sx={{ maxWidth: "100%", margin: "auto" }}>
//         <Box
//           sx={{
//             position: "relative",
//             height: 150,
//             background: "#d3dce3",
//             backgroundSize: "cover",
//           }}
//         >
//           <IconButton
//             sx={{ position: "absolute", top: 0, right: 0, color: "white" }}
//           >
//             <EditIcon />
//           </IconButton>
//         </Box>
//         <Avatar
//           // src="url(https://source.unsplash.com/random/300x400?Avatar)"
//           alt="Profile Image"
//           sx={{
//             width: 100,
//             height: 100,
//             border: "4px solid #fff",
//             position: "relative",
//             top: -50,
//             left: "50%",
//             transform: "translateX(-50%)",
//           }}
//         />
//         <Container
//           sx={{ display: "flex", justifyContent: "end", marginTop: -12 }}
//         >
//           <Button variant="contained" color="primary" sx={{ marginRight: 2 }}>
//             Edit Profile
//           </Button>
//           <Button variant="outlined" color="primary">
//             Add Art
//           </Button>
//         </Container>
//         <CardContent sx={{ textAlign: "center" }}>
//           <Typography variant="h5" component="div" gutterBottom>
//             {name}
//           </Typography>
//         </CardContent>
//       </Card>



//       <Card sx={{ mb: 4, borderTop: '1px solid black' }}>
//               <CardContent>
//                 <Grid container spacing={2}>
//                   <Grid item xs={3}>
//                     <Typography variant="body2">Full Name</Typography>
//                   </Grid>
//                   <Grid item xs={6}>
//                     <Typography variant="body2" color="textSecondary">
//                       {name}
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={3}>
//                     <Button variant="outlined" size="small" onClick={() => handleOpenDialog('Full Name')}>Edit</Button>
//                   </Grid>

//                   <Grid item xs={3}>
//                     <Typography variant="body2">Email</Typography>
//                   </Grid>
//                   <Grid item xs={6}>
//                     <Typography variant="body2" color="textSecondary">
//                       {email}
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={3}>
//                     <Button variant="outlined" size="small" onClick={() => handleOpenDialog('Email')}>Edit</Button>
//                   </Grid>

//                   <Grid item xs={3}>
//                     <Typography variant="body2">Mobile</Typography>
//                   </Grid>
//                   <Grid item xs={6}>
//                     <Typography variant="body2" color="textSecondary">
//                       {role}
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={3}>
//                     <Button variant="outlined" size="small" onClick={() => handleOpenDialog('Mobile')}>Edit</Button>
//                   </Grid>

//                   <Grid item xs={3}>
//                     <Typography variant="body2">Address</Typography>
//                   </Grid>
//                   <Grid item xs={6}>
//                     <Typography variant="body2" color="textSecondary">
//                       {"address"}
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={3}>
//                     <Button variant="outlined" size="small" onClick={() => handleOpenDialog('Address')}>Edit</Button>
//                   </Grid>
//                 </Grid>
//               </CardContent>
//             </Card>
      
//       <Footer />
//     </>
//   );
// }

// export default ProfilePage;









import React, { useEffect, useState} from "react";
import EditIcon from "@mui/icons-material/Edit";
import {Container, Grid, Card, CardContent, Button, Typography, Box, Avatar, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField} from "@mui/material";
import axios from "axios";
import Footer from "../../components/users/Footer";
import Navbar from "../../components/users/Navbar";
import { red } from "@mui/material/colors";

function ProfilePage() {
  axios.defaults.withCredentials = true;
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [role, setRole] = useState(null);
  const [newPassword, setnewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [openPopupName, setOpenPopupName] = useState(false);
  const [openPopupPassword, setOpenPopupPassword] = useState(false);
  const [newName, setNewName] = useState("");

  const handleOpenPopupName = () => {
    setOpenPopupName(true);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
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


  
  const handleChangeName = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    const value = {
      name: newName,
      id: id,
      email: email,
      role: role,
    };
    axios.post("http://localhost:8081/profile/changename", value)
      .then((res) => {
        const token = res.data.token
        localStorage.removeItem('token')
        localStorage.setItem('token', token)
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
          sx={{ display: "flex", justifyContent: "end", marginTop: -12, backgroundColor: "red"}}
        >
          <Button variant="contained" color="primary" sx={{ marginRight: 2 }}>
            Edit Profile
          </Button>
          {/* <Button variant="outlined" color="primary">
            Add Art
          </Button> */}
        </Container>
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h5" component="div" gutterBottom>
            {name}
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ mb: 4, borderTop: '1px solid black' }}>
        <CardContent>
          <Grid container spacing={2} mb={2}>
            <Grid item xs={3}>
              <Typography variant="body2">Name</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                {name}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Button variant="outlined" size="small" onClick={handleOpenPopupName}>Edit</Button>
            </Grid>
          </Grid>
          <Grid container spacing={2} mb={2}>
            <Grid item xs={3}>
              <Typography variant="body2">Password</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">password</Typography>
            </Grid>
            <Grid item xs={3}>
              <Button variant="outlined" size="small" onClick={handleOpenPopupName}>Edit</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Dialog open={openPopupName} onClose={() => setOpenPopupName(false)}>
        <DialogTitle>Edit Name</DialogTitle>
        <DialogContent>
          <TextField
            label="New Name"
            onChange={handleNewname}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPopupName(false)}>Cancel</Button>
          <Button onClick={handleChangeName} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openPopupPassword} onClose={() => setOpenPopupPassword(false)}>
        <DialogTitle>Edit Name</DialogTitle>
        <DialogContent>
          <TextField label="Current Password" onChange={handleCurrentPassword} fullWidth/>
          <TextField label="New password" onChange={handleNewPassword} fullWidth/>
          <TextField label="Confirm password" onChange={handleNewPasswordConfirm} fullWidth/>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPopupPassword(false)}>Cancel</Button>
          <Button onClick={handleChangePassword} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Footer />
    </>
  );
}

export default ProfilePage;