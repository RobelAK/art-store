import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const AboutUs = () => {
  return (
    <Box
      id="about-us"
      sx={{
        backgroundColor: '#06090a',
        paddingY: 8,
        textAlign: 'center',
      }}
    >
      <Container>
        <Typography style={{color:'white', fontFamily:'sora,sans-serif', fontWeight:'normal'} } variant="h4" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1" style={{color:'white', fontFamily:'sora,sans-serif', fontWeight:'lighter'} }>
          We are a group of graduate students from Wolkite University, passionate about art and technology.
        </Typography>
        <Typography variant="body1" style={{color:'white', fontFamily:'sora,sans-serif', fontWeight:'lighter'} } mt={2}>
          Our journey led us to create the Habesha Art Store project as our final year project.
          The project combines our love for art with the skills and knowledge we've gained during our studies.
        </Typography>
        <Typography variant="body1" style={{color:'white', fontFamily:'sora,sans-serif', fontWeight:'lighter'} } mt={2}>
          Our goal is to provide a platform for showcasing and celebrating Habesha art, connecting artists
          with art enthusiasts, and promoting the rich cultural heritage of Ethiopia through our digital art store.
        </Typography>
        <Typography variant="body1" style={{color:'white', fontFamily:'sora,sans-serif', fontWeight:'lighter'} } mt={2}>
          Thank you for joining us on this creative journey!
        </Typography>
      </Container>
    </Box>
  );
};

export default AboutUs;
