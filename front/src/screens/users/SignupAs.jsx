import React from 'react';
import { Container, Typography, TextField, Button, Grid, Box, Divider, Card, CardContent, CardMedia } from '@mui/material';
import Logo from '../../utils/logo.png';
import video from "../../utils/23.mp4";
import { Link } from 'react-router-dom';

const SignupAs = () => {
  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      backgroundSize: 'cover',
      padding: '25px',
      backgroundColor: '#bababa'
    }} >

      <Container maxWidth="md" style={{ alignContent: 'center', marginTop: '2%' }}>
        <Grid container spacing={2}>
          <Grid item sm='12' md='6'>
            <div style={{ position: 'relative', width: '100%', borderRadius: '2%' }}>
              <CardMedia
                component="video"
                src={video}
                autoPlay // Add autoPlay attribute to make the video autoplay
                loop // Add loop attribute to make the video loop
                muted // Add muted attribute to prevent autoplay blocking by browsers
                playsInline // Add playsInline attribute for better mobile support
                style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', borderRadius: '4%' }} // Set custom styles for the video
              />
              <div style={{ position: 'absolute', borderRadius: '4%', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography sx={{ alignItems: 'center', color: 'white', marginRight: '2%' }} variant='h6' fontFamily='sora,sans-serif'>
                  Are you an artist?
                </Typography>
                <Typography sx={{ alignItems: 'center', color: '#e8e7e6' }} variant='body2' fontFamily='sora,sans-serif'>
                  Sign up here.
                </Typography>
              </div>
            </div>
          </Grid>
          <Grid item sm='12' md='6'>
            <Card sx={{ padding: '12%', borderRadius: '4%', aspectRatio: '4/5' }}>
              <Box justifyContent='center' display='flex'>
                <Link to="/">
                  <img src={Logo} alt="Logo" style={{ width: '60%', marginBottom: '10px' }} />
                </Link>
              </Box>
              <Divider />

              <CardContent>
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
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SignupAs;
