import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Link } from 'react-router-dom';
import { Container } from '@mui/material';

const PostedArt = () => {
  // Dummy data for image URLs
  const artImages = [
    'https://source.unsplash.com/random/800x1000',
    'https://source.unsplash.com/random/800x1001',
    'https://source.unsplash.com/random/800x1002',
    'https://source.unsplash.com/random/800x1003',
    'https://source.unsplash.com/random/800x1004',
    'https://source.unsplash.com/random/800x1005',
    'https://source.unsplash.com/random/800x1006',
    'https://source.unsplash.com/random/800x1007',
    // Add more image URLs as needed
  ];

  return (
    <Container>

    <Grid container spacing={2} marginTop={3}>
      {artImages.map((imageUrl, index) => (
        <Grid item xs={6} sm={4} md={2} key={index}>
          <Card >
            <Link to='/product' >
              <CardMedia
                component="img"
                alt={`Artwork ${index + 1}`}
                height="auto"

                image={imageUrl}
                sx={{
                  height: '40%',
                  width: '100%',
                  aspectRatio: '4/5',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                }}
              />
            </Link>
          </Card>
        </Grid>
      ))}
    </Grid>
    </Container>
  );
};

export default PostedArt;
