import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link component
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card'; // Import Card component
import CardActionArea from '@mui/material/CardActionArea'; // Import CardActionArea component
import CardMedia from '@mui/material/CardMedia'; // Import CardMedia component

const ArtDiscoveryPage = () => {
  const [art, setArt] = useState([]);

  useEffect(() => {
    const response = axios.get("http://localhost:8081/art")
      .then((response) => {
        console.log(response.data);
        setArt(response.data);

      })
      .catch((error) => {
        console.error('Error fetching artwork:', error);
      });
  }, []);
  console.log("Art", art)

  return (
    <div>
      <Grid container spacing={3} sx={{ padding: '20px' }}>
        {art.map((Art, index) => (
          <Grid item key={`${Art.id}-${index}`} xs={12} sm={6} md={4} lg={2}>
            <Link to='/product'>
              <Card
                sx={{
                  maxWidth: 260,
                  aspectRatio: '4/5',
                  margin: 'auto',
                  borderRadius: '4px',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img" // Specify component type as 'img'
                    src={`http://localhost:8081/images/${Art.art}`} // Fix variable name
                    alt={Art.title} // Fix variable name
                  />
                </CardActionArea>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ArtDiscoveryPage;
