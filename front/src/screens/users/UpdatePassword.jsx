import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Grid,
  TextField,
  createTheme,
  IconButton,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Logo from "../../utils/logo.png";
import backgroundImage from "../../utils/333.png";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

const PASSWORD_VALID =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function UpdatePassword() {
  
  const navigate = useNavigate();
  const { token } = useParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  useEffect(() => {
    const user = JSON.parse(atob(token.split(".")[1]));
    setEmail(user.email);
  }, []);

  useEffect(() => {
    const result = PASSWORD_VALID.test(password);
    setIsValidPassword(result);

    const match = password == matchPassword;
    setValidMatch(match);
  }, [password, matchPassword]);
  const defaultTheme = createTheme();
  axios.defaults.withCredentials = true;

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handlePasswordConfirm = (event) => {
    setMatchPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const values = {
      email: email,
      password: password,
    };

    if (isValidPassword) {
      if (password == matchPassword) {
        axios
          .post("http://localhost:8081/resetpassword", values)
          .then((res) => {
            console.log(res.data.status);
            if(res.data.status){
              toast.success(res.data.Message,{
                onClose:()=>{
                  navigate('/login')
                }
              })
            }
            else toast.warning("An error has been occured")
          })
          .catch((err) => console.log(err));
      } else {
        console.log("not match");
        toast.warning("Password doesnt match");
      }
    } else {
      console.log("Invalid password");
      toast.warning("Invalid password");
    }
  };
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
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
            height: "400px",
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
                  value={password}
                  size="small"
                  required
                  name="password"
                  label="Password"
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="new-password"
                  onChange={handlePassword}
                  helperText={
                    !isValidPassword &&
                    password &&
                    "Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and special characters."
                  }
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
                  value={matchPassword}
                  size="small"
                  required
                  name="passwordConfirm"
                  label="Confirm Password"
                  fullWidth
                  type={showConfirmPassword ? "text" : "password"}
                  id="passwordConfirm"
                  autoComplete="new-password"
                  onChange={handlePasswordConfirm}
                  helperText={
                    !validMatch && matchPassword && "Password doesnt match"
                  }
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
              <Grid item xs={12}>
                <Button variant="contained" fullWidth type="submit">
                  Change Password
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <ToastContainer autoClose={2000} />
    </ThemeProvider>
  );
}

export default UpdatePassword;
