// HeroSection.js
import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const HeroSection = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${require('../../utils/333.jpg')})`, // Set the background image
        backgroundSize: 'cover', // Cover the entire box
        backgroundPosition: 'center', // Center the background image
        paddingY: 24,
        textAlign: 'center',
        color: '#ffffff',
      }}
    >
      <Container>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontFamily: 'Sora, sans-serif',
            fontWeight: 700,
            marginBottom: 2,
            color: 'black',
          }}
        >
          Welcome to our Digital Art Store
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{
            marginBottom: 4,
          }}
        >
          Discover a world of creative and unique artworks.
        </Typography>
        <Box>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ marginRight: 2 }}
          >
            Explore Art
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
          >
            Learn More
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
