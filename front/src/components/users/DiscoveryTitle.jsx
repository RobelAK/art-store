import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function DiscoveryTitle() {
  return (
    <div>
      <Container sx={{ overflow: 'hidden' }}>
        <Typography color='textSecondary' align="center" variant="h6" fontFamily='sora,sans-serif' fontWeight='light' gutterBottom>
          Discover New And Beautiful Artworks Created By Ethiopian Digital Artists.
        </Typography>
      </Container>
    </div>
  );
}

export default DiscoveryTitle;
