import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Logo from "../../utils/logo.png";
import backgroundImage from "../../utils/333.png";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  IconButton,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";

function Signup() {
  const defaultTheme = createTheme();
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isValidName, setIsValidName] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const navigate = useNavigate();

  const handleName = (event) => {
    setName(event.target.value);
    setIsValidName(validateName(event.target.value));
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
    setIsValidPassword(validatePassword(event.target.value));
  };
  const handlePasswordConfirm = (event) => {
    setPasswordConfirm(event.target.value);
  };
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  const validateName = (name) => {
    const minLength = 2;
    const maxLength = 20;
    const lettersRegex = /^[a-zA-Z]+$/;

    if (name.length < minLength || name.length > maxLength) {
      return false;
    }

    if (!lettersRegex.test(name.trim())) {
      return false;
    }
    return true;
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

  const values = {
    name: name,
    email: email,
    password: password,
    passwordConfirm: passwordConfirm,
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValidName) {
      console.log("invalid");
    } else {
      if (!isValidPassword) {
        console.log("Invalid password");
      } else {
        axios
          .post("http://localhost:8081/signup", values)
          .then((res) => {
            if (res.data.signup) {
              console.log(res.data.Message)
              navigate("/login");
            } else {
              console.log(res.data.Message)
              navigate("/signup");
            }
          })
          .catch((err) => console.log(err));
      }
    }
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        component="main"
        maxWidth="100vw"
        sx={{
          height: "100vh",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            boxShadow: 5,
            width: "400px",
            height: "85%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: "20px",
            padding: 5,
          }}
        >
          <Box>
            <Link to="/">
              <img
                src={Logo}
                alt="Logo"
                style={{ width: "100%", marginBottom: "5px" }}
              />
            </Link>
          </Box>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Grid container rowSpacing={2}>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  id="name"
                  label="Name"
                  required
                  fullWidth
                  name="name"
                  onChange={handleName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  type="email"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleEmail}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  required
                  name="password"
                  label="Password"
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="new-password"
                  onChange={handlePassword}
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={handleTogglePassword} edge="end">
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  required
                  name="passwordConfirm"
                  label="Confirm Password"
                  fullWidth
                  type={showConfirmPassword ? "text" : "password"}
                  id="passwordConfirm"
                  autoComplete="new-password"
                  onChange={handlePasswordConfirm}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={handleToggleConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="Agreed to terms and conditions"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 0 }}
            >
              Sign Up
            </Button>
            <Link to="/login">Already have an account</Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Signup;
