import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Logo from '../../utils/logo.png';
import backgroundImage from '../../utils/333.png';
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, IconButton, TextField, ThemeProvider, createTheme } from '@mui/material';


function Login() {

  const defaultTheme = createTheme();


  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value)
  }
  const handlePassword = (event) => {
    setPassword(event.target.value)
  }
  const values = {
    email: email,
    password: password,
  }

  const navigate = useNavigate()
  axios.defaults.withCredentials = true
  const [error, setError] = useState(null)
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8081/login', values) 
      .then(res => {
        if (res.data.loginStatus) {
          navigate('/profile')
        }
        else {
          console.log('wrong email or password')
        }
      })
      .catch(err => console.log(err));
  }





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
            <Link to="/">
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
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="Remeber Me"
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
    </ThemeProvider>
  );
}

export default Login