import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function DiscoveryTitle() {
  return (
    <div>
      <Container sx={{ overflow: 'hidden' }}>
        <Typography color='textPrimary' align="center" variant="h4" fontFamily='sora,sans-serif' fontWeight='mid' gutterBottom>
          Available Artworks
        </Typography>
        <Typography color='textSecondary' align="center" variant="h6" fontFamily='sora,sans-serif' fontWeight='light' gutterBottom>
          Discover New And Beautiful Artworks Created By Ethiopian Digital Artists.
        </Typography>
        <Container sx={{ height: '5px', bgcolor: 'lightgrey', marginTop: '18px', marginBottom: '15px' }} />
      </Container>
    </div>
  );
}

export default DiscoveryTitle;
