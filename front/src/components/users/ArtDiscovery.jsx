import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, CardContent, CardMedia, Grid, Typography, Box, Link } from '@mui/material';
const ArtDiscovery = () => {
  const [art, setArt] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8081/art")
    .then(res =>{
      setArt(res.data)
    })
    .catch(err =>{
      console.log(err)
    })
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
    <Box>
      <Grid container spacing={3} sx={{ padding: "50px"}}>
        {art.map((Art, index) => (
          <Grid sx={{padding: 3}} item key={`${Art.id}-${index}`} xs={12} sm={6} md={3} lg={3} xl={10}>
            
            <Link href= {`/product/${Art.id}`} underline='none'>
              <Card
                sx={{
                  padding: 1,
                  backgroundColor: '#ebebeb',
                  maxWidth: 260,
                  aspectRatio: "3.3/5",
                  margin: "auto",
                  borderRadius: "4px",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ aspectRatio: "4/5" ,background: 'aqua',borderRadius: "4px"}}
                  src={`http://localhost:8081/images/${Art.art}`}
                  alt={Art.title}
                />
                <CardContent sx={{display: 'flex',justifyContent: 'center'}}>
                  <Typography variant='h6'>{Art.title}</Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
      {/* <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Button variant="contained" onClick={handleLoadMore}>
          Load More
        </Button>
      </div> */}
    </Box>
  );
};

export default ArtDiscovery;
