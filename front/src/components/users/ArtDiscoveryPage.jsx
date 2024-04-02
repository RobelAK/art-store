import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';

const ArtDiscoveryPage = () => {
  const [art, setArt] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/art");
        setArt(response.data);
      } catch (error) {
        console.error('Error fetching artwork:', error);
      }
    };
    fetchData();
  }, []);

  const handleLoadMore = async () => {
    try {
      const response = await fetch('http://localhost:8081/art');
      if (!response.ok) {
        throw new Error('Failed to fetch artwork');
      }
      const data = await response.json();
      setArt(prevArt => [...prevArt, ...data]);
    } catch (error) {
      console.error('Error fetching artwork:', error);
    }
  };

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
                    component="img"
                    sx={{aspectRatio:'4/5'}}
                    src={`http://localhost:8081/images/${Art.art}`}
                    alt={Art.title}
                  />
                </CardActionArea>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Button variant="contained" onClick={handleLoadMore}>
          Load More
        </Button>
      </div>
    </div>
  );
};

export default ArtDiscoveryPage;
