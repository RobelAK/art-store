import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  TextField,
  ThemeProvider,
  createTheme,
  Typography,
} from "@mui/material";
const NAME_VALID = /^[a-zA-Z][a-zA-Z0-9-_ /]{2,24}$/;
const PASSWORD_VALID =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_VALID = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Signup() {
  const defaultTheme = createTheme();

  const [name, setName] = useState("");
  const [isValidName, setIsValidName] = useState(false);

  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [show, setShow] = useState("none");
  const [textFieldDisabled, setTextFieldDisabled] = useState(false);

  const [verificationCode, setVerificationCode] = useState("");
  const [verifyButton, setVerifyButton] = useState(false)

  const [signupButton, setSignupButton] = useState(false)
  useEffect(() => {
    const result = NAME_VALID.test(name);
    setIsValidName(result);
  }, [name]);
  useEffect(() => {
    const result = PASSWORD_VALID.test(password);
    setIsValidPassword(result);

    const match = password == matchPassword;
    setValidMatch(match);
  }, [password, matchPassword]);
  useEffect(() => {
    const result = EMAIL_VALID.test(email);
    setIsValidEmail(result);
  }, [email]);

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
  const handleVerificationCode = (event) => {
    setVerificationCode(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const values = {
      name: name,
      email: email,
      password: password,
      passwordConfirm: matchPassword,
    };
    if (!isValidName) {
      console.log("invalid name");
      toast.warning("Invalid name",{
        onClose:()=>{
          setSignupButton(false)
        }
      });
    }
    if (!isValidPassword) {
      console.log("Invalid password");
      toast.warning("Invalid password",{
        onClose:()=>{
          setSignupButton(false)
        }
      });
    } else {

      axios
        .post("http://localhost:8081/signup", values)
        .then((res) => {
          console.log(res.data);
          if (res.data.verificationSent == true) {
            toast.success(res.data.message, {
              onClose: () => {
                setTextFieldDisabled(true);
                setShow("block");
              },
            });
          } else {
            toast.warning(res.data.message, {
              onClose: () => {
                setEmail("");
                setName("");
                setPassword("");
                setMatchPassword("");
              },
            });
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleVerify = (event) => {
    event.preventDefault();
    setVerifyButton(true)
    const values = {
      name: name,
      email: email,
      password: password,
      verificationCode: verificationCode,
    };
    axios.post("http://localhost:8081/signup/verify", values).then((res) => {
      console.log(res.data);
      if (res.data.signup) {
        toast.success(res.data.Message, {
          onClose: () => {
            navigate("/login");
          },
        });
      } else {
        toast.warning(res.data.Message,{
          onClose:()=>{
            setVerifyButton(false)
          }
        });
      }
    });
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
                  autoComplete="off"
                  value={name}
                  onChange={handleName}
                  helperText={
                    !isValidName &&
                    name &&
                    "Name must start with letter, must be between 3 to 20 characters long"
                  }
                  error={!isValidName && name}
                  disabled={textFieldDisabled}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={email}
                  size="small"
                  type="email"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="off"
                  onChange={handleEmail}
                  disabled={textFieldDisabled}
                />
              </Grid>
              <Grid item xs={6} sx={{ display: show }}>
                <TextField
                  value={verificationCode}
                  size="small"
                  type="text"
                  fullWidth
                  id="verificationCode"
                  label="verificationCode"
                  name="verificationCode"
                  autoComplete="off"
                  onChange={handleVerificationCode}
                />
              </Grid>
              <Grid item xs={6} sx={{ display: show }}>
                <Button variant="contained" onClick={handleVerify} disabled={verifyButton}>
                  Verify
                </Button>
              </Grid>
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
                  disabled={textFieldDisabled}
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
                  disabled={textFieldDisabled}
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
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 0 }}
              disabled={textFieldDisabled || signupButton}
            >
              Sign Up
            </Button>
            <Link to="/login">Already have an account</Link>
          </Box>
        </Box>
      </Container>
      <ToastContainer autoClose={2000} />
    </ThemeProvider>
  );
}

export default Signup;
