
import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const ArtSubmissionMessage = () => {
  return (
    <Container maxWidth="md" style={{ textAlign: 'center', marginTop: '20vh' }}>
      <Typography variant="h4" gutterBottom>
        Your art has been submitted!
      </Typography>
      <Typography variant="body1" gutterBottom>
        It's awaiting admin approval. We'll notify you when your art is available for sale.
      </Typography>
      
      <Button variant="text" color="primary" component={Link} to="/">
        Go to Home
      </Button>
    </Container>
  );
};

export default ArtSubmissionMessage;
