import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Grid, Box, Divider, Card, CardContent, CardMedia } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import Logo from '../../utils/logo.png';
import video from "../../utils/23.mp4";

const SignupAs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    portfolioLink: '',
    description: ''
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    const userId = localStorage.getItem('userId');

    axios.put(`http://localhost:8081/signupas/${userId}`, formData)
      .then(response => {
        console.log(response.data);
        navigate('/message'); // Navigate to '/message' after successful submission
      })
      .catch(error => {
        console.error('Error updating user: ', error);
        // Handle error (e.g., show an error message)
      });
  };

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
                autoPlay
                loop
                muted
                playsInline
                style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', borderRadius: '4%' }}
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
                    <TextField size='small' label="name" fullWidth name="name" value={formData.name} onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField size='small' label="Email" type="email" fullWidth name="email" value={formData.email} onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField size='small' label="Portfolio Link" fullWidth name="portfolioLink" value={formData.portfolioLink} onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField size='small' label="Describe yourself" multiline rows={4} fullWidth name="description" value={formData.description} onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12} >
                    <Button size='small' variant="contained" color="primary" onClick={handleSubmit}>
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
