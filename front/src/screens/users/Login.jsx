import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Logo from '../../utils/logo.png';
import backgroundImage from '../../utils/333.png';
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, IconButton, TextField, ThemeProvider, createTheme } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const defaultTheme = createTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const values = {
      email: email,
      password: password,
    };

    axios.post('http://localhost:8081/login', values)
      .then(res => {
        const token = res.data.token;

        if (res.data.loginStatus) {
          localStorage.setItem('token', token);
          toast.success("Login successfull", {
            onClose: () => {
              navigate('/');
            }
          });
        } else {
          toast.error("Wrong email or password");
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="100vw" sx={{
        height: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Box
          sx={{
            boxShadow: 5,
            width: '400px',
            height: '85%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: 5,
          }}
        >
          <Box>
            <Link to="/Home">
              <img src={Logo} alt="Logo" style={{ width: '100%', marginBottom: '5px' }} />
            </Link>
          </Box>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Grid container rowSpacing={2}>
              <Grid item xs={12}>
                <TextField
                  type='email'
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  onChange={handleEmail}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  name="password"
                  label="Password"
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  onChange={handlePassword}
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={handleTogglePassword} edge="end">
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 1, mb: 0 }}>
              Sign In
            </Button>
            <Link to='/forgotpassword'>Forgot password</Link><br />
            <Link to='/signup'>Don't have an account</Link>
          </Box>
        </Box>
      </Container>
      <ToastContainer autoClose={2000} />
    </ThemeProvider>
  );
}

export default Login;
