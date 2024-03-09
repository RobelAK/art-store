
import React from 'react';
import { Container, Typography, TextField, Button, Grid, Box, Divider } from '@mui/material';
import Logo from '../../utils/logo.png';
import backgroundImage from '../../utils/333.png';
import { Link } from 'react-router-dom';

const SignupAs = () => {
  return (
    <Container component="main" maxWidth="100vw" sx={{
      height: '100vh',
      position: 'fixed',
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
          borderRadius: '10px',
          padding: 5,
        }}
      >


        <Container maxWidth="md" style={{ marginTop: '80px', alignContent: 'center' }} >
          <Box>
            <Link to="/">
              <img src={Logo} alt="Logo" style={{ width: '100%', marginBottom: '10px' }} />
            </Link>
          </Box>
          <Divider />
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField size='small' label="Username" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField size='small' label="Email" type="email" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField size='small' label="Portfolio Link" type="Link" fullWidth />
            </Grid>
              <Grid item xs={12} >
                <Button size='small' variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>  
            </Grid>
        </Container>
      </Box>
    </Container>
  );
};

export default SignupAs;
