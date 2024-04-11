import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Container, CardMedia, CardContent, MenuItem, Select, Grid, Typography, Box, Link } from '@mui/material';
import video from "../../utils/rr.mp4";

const ArtDiscovery = () => {
  const [art, setArt] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchArtwork();
  }, [selectedCategory]);

  const fetchArtwork = async () => {
    try {
      const response = await axios.get('http://localhost:8081/art', {
        params: { category: selectedCategory }
      });
      if (!response.data) {
        throw new Error('Failed to fetch artwork');
      }
      setArt(response.data);
    } catch (error) {
      console.error('Error fetching artwork:', error);
    }
  };

  const handleChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
  };

  return (
    <div>
      <Container>
        {/* Card with video background and overlay */}
        <Card
          sx={{
            position: 'relative',
            backgroundColor: 'transparent',
            borderRadius: '2px',
            boxShadow: 'none',
            overflow: 'hidden',
          }}
        >
          {/* Video background */}
          <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', zIndex: -2 }}>
            <source src={video} type="video/mp4" />
          </video>
          {/* Overlay */}
          <Box
            sx={{
              zIndex: -2,
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.1)', // 50% transparent black color
            }}
          />
          {/* Content */}
          <CardContent>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontFamily: 'Sora, sans-serif',
                fontWeight: 700,
                marginTop: 6,
                color: 'black', // Text color on top of the overlay
                zIndex: 6, // Ensure text is on top of the overlay
              }}
            >
              Habesha Art Store
            </Typography>
            {/* Description */}
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{
                marginBottom: 1,
                color: 'CaptionText', // Text color on top of the overlay
                zIndex: 1, // Ensure text is on top of the overlay
              }}
            >
              Discover a world of creative and unique artworks.
            </Typography>
            {/* Navigation Bar */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'left', marginTop: 2 }}>
              <Typography sx={{
                fontFamily: 'Sora, sans-serif',
                fontWeight: "light",
                marginRight: '5px',
                color: '',
                zIndex: 6,
              }}>Choose a Category</Typography>
              <Select
                value={selectedCategory}
                onChange={handleChange}
                displayEmpty
                sx={{
                  textTransform: 'none',
                  color: 'black',
                  '&:hover': {
                    color: 'white',
                    backgroundColor: '#333', // Darker color on hover
                  },
                }}
                MenuProps={{
                  sx: {
                    '& .MuiMenuItem-root': {
                      display: 'block',
                      width: '25%',
                      boxSizing: 'border-box',
                      borderBottom: '1px solid #eee', // Add divider
                      padding: '10px ', // Add padding
                      transition: 'background-color 0.2s',
                      '&:hover': {
                        color: 'white',
                    backgroundColor: '#333',
                      },
                    },
                    '& .MuiMenuItem-root:first-child': {
                      borderTop: '1px solid #eee', // Add top border to the first item
                    },
                    '& .MuiList-root': {
                      display: 'flex',
                      flexWrap: 'wrap',
                    },
                  },
                }}
              >
                <MenuItem>All Categories</MenuItem>
                <MenuItem value="Abstract">Abstract</MenuItem>
                <MenuItem value="Animals">Animals</MenuItem>
                <MenuItem value="Anime/Manga">Anime/Manga</MenuItem>
                <MenuItem value="Character Design">Character Design</MenuItem>
                <MenuItem value="Concept Art">Concept Art</MenuItem>
                <MenuItem value="Cyberpunk">Cyberpunk</MenuItem>
                <MenuItem value="Fantasy">Fantasy</MenuItem>
                <MenuItem value="Fan Art">Fan Art</MenuItem>
                <MenuItem value="Graffiti">Graffiti</MenuItem>
                <MenuItem value="Horror">Horror</MenuItem>
                <MenuItem value="Landscape">Landscape</MenuItem>
                <MenuItem value="Minimalism">Minimalism</MenuItem>
                <MenuItem value="Nature">Nature</MenuItem>
                <MenuItem value="Pixel Art">Pixel Art</MenuItem>
                <MenuItem value="Pop Art">Pop Art</MenuItem>
                <MenuItem value="Portrait">Portrait</MenuItem>
                <MenuItem value="Sci-Fi">Sci-Fi</MenuItem>
                <MenuItem value="Steampunk">Steampunk</MenuItem>
                <MenuItem value="Surreal">Surreal</MenuItem>
              </Select>
            </Box>


          </CardContent>
        </Card>
      </Container>
      <Container sx={{ height: '2px', bgcolor: '#e3e3e3', marginTop: '18px', marginBottom: '15px' }} />
      <Container>
        <Box>
          <Grid container spacing={1} sx={{ padding: "20px" }}>
            {art.map((Art, index) => (
              <Grid item key={`${Art.id}-${index}`} xs={12} sm={6} md={4} lg={3}>
                <Link href={`/product/${Art.id}`} underline='none'>
                  <Card
                    sx={{
                      backgroundColor: 'white',
                      maxWidth: 280,
                      aspectRatio: "4/5",
                      margin: "auto",
                      borderRadius: "3px",
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        aspectRatio: "4/5",
                        padding: '2px',
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'scale(1.01)',
                        },
                      }}
                      src={`http://localhost:8081/images/${Art.art}`}
                      alt={Art.title}
                    />
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
          <div
            style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
          >
            <Button variant="contained" onClick={fetchArtwork}>
              Load More
            </Button>
          </div>
        </Box>
      </Container>
    </div>
  );
};

export default ArtDiscovery;
