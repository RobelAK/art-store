import React, {useEffect, useState } from "react";
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
  Typography
} from "@mui/material";
const NAME_VALID = /^[a-zA-Z][a-zA-Z0-9-_ /]{3,24}$/;
const PASSWORD_VALID =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
const EMAIL_VALID = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Signup() {
  // const userRef = userRef()
  const defaultTheme = createTheme();

  const [name, setName] = useState('');
  const [isValidName, setIsValidName] = useState(false);
  const [userFocus,setUserFocus] = useState(false)

  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);

  const [password, setPassword] = useState('');
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [passwordFocus,setPasswordFocus] = useState(false)

  const [matchPassword, setMatchPassword] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus,setMatchFocus] = useState(false)

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(()=>{

  },[])
  useEffect(()=>{
    const result = NAME_VALID.test(name)
    console.log('Name validation: ',result)
    setIsValidName(result)
  },[name])
  useEffect(()=>{
    const result = PASSWORD_VALID.test(password)
    console.log('Password validation: ',result)
    setIsValidPassword(result)
    
    const match = password == matchPassword
    setValidMatch(match)
  },[password,matchPassword])
  useEffect(()=>{
    const result = EMAIL_VALID.test(email)
    console.log('Email validation ',result)
    setIsValidEmail(result)
  },[email])
  
  useEffect(()=>{
    setErrMsg('')
  },[name,password,matchPassword,email])
  
  
  
  const navigate = useNavigate();

  const handleName = (event) => {
    setName(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handlePasswordConfirm = (event) => {
    setMatchPassword(event.target.value);
  };
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };


  const values = {
    name: name,
    email: email,
    password: password,
    passwordConfirm: matchPassword,
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValidName) {
      console.log("invalid name");
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
                {/* <input type="text" aria-invalid="false"/> */}
                <TextField
                  size="small"
                  id="name"
                  label="Name"
                  required
                  fullWidth
                  name="name"
                  autoComplete="off"
                  onChange={handleName}
                  helperText={!isValidName && name &&("Name must start with letter, must be between 3 to 20 characters long")}
                  error={!isValidName && name}
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
                  autoComplete="off"
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
                  helperText={!isValidPassword && password &&('Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and special characters.')}
                  error={!isValidPassword && password}
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
                  helperText={!validMatch && matchPassword &&('Password doesnt match')}
                  error={!validMatch && matchPassword}
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
              <p className={"offscreen"} aria-live="assertive">{errMsg}</p>
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
