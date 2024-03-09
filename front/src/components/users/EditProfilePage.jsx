// EditProfilePage.jsx

import React from 'react';
import { Container, Typography, TextField, Button, Grid, Box, Divider } from '@mui/material';
import Logo from '../../utils/logo.png';
import backgroundImage from '../../utils/333.png';
import { Link } from 'react-router-dom';

const EditProfilePage = () => {
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
            {/* Add components for editing username, email, and password */}
            <Grid item xs={12}>
              <TextField size='small' label="Username" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField size='small' label="Old Password" type="password" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField size='small' label="New Password" type="password" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField size='small' label="Confirm New Password" type="password" fullWidth />
            </Grid>
            <Grid container direction={'column'} sx={{ justifyContent: 'end', alignItems: 'flex-end', marginTop: '15px' }} >
              <Grid item xs={12} >
                <Button size='small' variant="contained" color="primary">
                  Save Changes
                </Button>
              </Grid>
              <Grid item xs={12} spacing={1}>
                <Button size='small' variant="outlined" color="primary">
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Container>
  );
};

export default EditProfilePage;
