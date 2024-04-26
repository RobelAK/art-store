import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Container } from '@mui/material';
import axios from 'axios';

const PostedArt = () => {
  const [artImages, setArtImages] = useState([]);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const token = localStorage.getItem('token');
        
        const response = await axios.get("http://localhost:8081/user/art", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setArtImages(response.data);
      } catch (error) {
        console.error('Error fetching posted artworks:', error);
      }
    };
    fetchArtworks();
  }, []);

  return (
    <Container>
      <Grid container spacing={2} marginTop={3}>
        {artImages.map((artwork) => (
          <Grid item xs={6} sm={4} md={2} key={artwork.id}>
            <Card>
                <CardMedia
                  component="img"
                  alt={`Artwork ${artwork.id}`}
                  height="auto"
                  src={`http://localhost:8081/images/${artwork.art}`} // Assuming 'art' is the property containing the image URL
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
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PostedArt;
