import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import background from '../../utils/333.jpg'
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
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
          <Link to='/arts'>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ marginRight: 2 ,marginTop:2,}}
          >
            Explore Art
          </Button>
          </Link>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            sx={{ marginRight: 2 ,marginTop:2,}}
          >
            Learn More
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
