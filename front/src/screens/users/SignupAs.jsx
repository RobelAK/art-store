import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Divider,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../utils/logo.png";
import video from "../../utils/23.mp4";

const SignupAs = () => {
  const navigate = useNavigate();
  // const [formData, setFormData] = useState({
  //   name: "",
  //   email: "",
  //   portfolioLink: "",
  //   description: "",
  // });

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [portfolioLink, setPortfolioLink] = useState("");
  const [description, setDescriotion] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(atob(token.split(".")[1]));
      setId(user.id);
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    } else {
      console.log("no user found");
    }
  }, []);
  const handlePortfolioLink = (event) =>{
    setPortfolioLink(event.target.value);
  }
  const handleDescription = (event) =>{
    setDescriotion(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const value = {
      id: id,
      name: name,
      email: email,
      role: role,
      portfolioLink: portfolioLink,
      description: description,
    }
    axios
      .post("http://localhost:8081/signupas", value)
      .then((res) => {
        console.log(res.data);
        // navigate("/message");
      })
      .catch((error) => {
        console.error("Error updating user: ", error);
      });
  };


  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundSize: "cover",
        padding: "25px",
        backgroundColor: "#bababa",
      }}
    >
      <Container
        maxWidth="md"
        style={{ alignContent: "center", marginTop: "2%" }}
      >
        <Grid container spacing={2}>
          <Grid item sx={{ sm: "12", md: "6" }}>
            <div
              style={{
                position: "relative",
                width: "100%",
                borderRadius: "2%",
              }}
            >
              <CardMedia
                component="video"
                src={video}
                autoPlay
                loop
                muted
                playsInline
                style={{
                  width: "100%",
                  aspectRatio: "4/5",
                  objectFit: "cover",
                  borderRadius: "4%",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  borderRadius: "4%",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    alignItems: "center",
                    color: "white",
                    marginRight: "2%",
                  }}
                  variant="h6"
                  fontFamily="sora,sans-serif"
                >
                  Are you an artist?
                </Typography>
                <Typography
                  sx={{ alignItems: "center", color: "#e8e7e6" }}
                  variant="body2"
                  fontFamily="sora,sans-serif"
                >
                  Sign up here.
                </Typography>
              </div>
            </div>
          </Grid>
          <Grid item sx={{ sm: "12", md: "6" }}>
            <Card
              sx={{ padding: "12%", borderRadius: "4%", aspectRatio: "4/5" }}
            >
              <Box justifyContent="center" display="flex">
                <Link to="/">
                  <img
                    src={Logo}
                    alt="Logo"
                    style={{ width: "60%", marginBottom: "10px" }}
                  />
                </Link>
              </Box>
              <Divider />

              <CardContent>
                <Grid container spacing={3} component="form" onSubmit={handleSubmit}>
                  <Grid item xs={12}>
                    <TextField
                      size="small"
                      label="Name"
                      fullWidth
                      name="name"
                      value={name}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      size="small"
                      label="Email"
                      type="email"
                      fullWidth
                      name="email"
                      value={email}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      size="small"
                      label="Portfolio Link"
                      fullWidth
                      name="portfolioLink"
                      required
                      onChange={handlePortfolioLink}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      size="small"
                      label="Describe yourself"
                      multiline
                      rows={4}
                      fullWidth
                      name="description"
                      onChange={handleDescription}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      size="small"
                      variant="contained"
                      color="primary"
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SignupAs;
