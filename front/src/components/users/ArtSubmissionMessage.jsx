import React from 'react';
import { Container, Typography, Button, Card, CardContent, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const ArtSubmissionMessage = () => {
  return (
    <Paper
      style={{
        backgroundImage: "url('https://www.transparenttextures.com/patterns/debut-light.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card
        variant="outlined"
        sx={{
          maxWidth: 600,
          textAlign: 'center',
          p: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.9)', // Adjust transparency as needed
        }}
      >
        <CardContent>
          <Typography variant="h4" gutterBottom fontFamily="Sora">
            Your Request has been submitted!
          </Typography>
          <Typography variant="body1" gutterBottom fontFamily="Sora">
            It's awaiting admin approval. We'll notify you when the admin sees your request.
          </Typography>
          <Button variant="contained" color="primary" component={Link} to="/">
            Go to Home
          </Button>
        </CardContent>
      </Card>
    </Paper>
  );
};

export default ArtSubmissionMessage;
