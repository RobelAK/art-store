import React, { useState } from 'react'
import { ThemeProvider } from '@emotion/react';
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, createTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Logo from '../../utils/logo.png';
import backgroundImage from '../../utils/333.png';


function Forgotpassword() {
  const [email,setEmail] = useState('')

  const defaultTheme = createTheme();
  axios.defaults.withCredentials = true

  const handleEmail = (event) => {
    setEmail(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
    .post("http://localhost:8081/forgotpassword/sendcode", { email:email, })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
    // console.log(email)
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
            height: '400px',
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
                  autoComplete="email"
                  onChange={handleEmail}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 1, mb: 2 }}>
                  Send Code
                </Button>
              </Grid>
            </Grid>
            <Link to='/login'>Sign In</Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Forgotpassword