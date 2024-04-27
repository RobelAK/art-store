import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import {
  Button,
  Card,
  Container,
  CardMedia,
  CardContent,
  MenuItem,
  Select,
  Grid,
  Typography,
  Box,
  Link,
} from '@mui/material';
import video from "../../utils/rr.mp4";

const ArtDiscovery = () => {
  const [art, setArt] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [bookmarkStatus, setBookmarkStatus] = useState({});
  const navigate = useNavigate(); // Get the navigate function
  
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

      // Fetch bookmark status only if user is logged in
      const token = localStorage.getItem("token");
      if (token) {
        const user = JSON.parse(atob(token.split(".")[1]));
        const userId = user.id;

        const bookmarkResponse = await axios.get(`http://localhost:8081/api/bookmarks/${userId}`);
        const bookmarkData = bookmarkResponse.data;

        const initialBookmarkStatus = {};
        response.data.forEach(item => {
          initialBookmarkStatus[item.id] = bookmarkData.includes(item.id);
        });

        setBookmarkStatus(initialBookmarkStatus);
      }
    } catch (error) {
      console.error('Error fetching artwork:', error);
    }
  };

  const handleChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
  };

  const toggleBookmark = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Redirect to login page if user is not logged in
      navigate('/login');
      return;
    }

    try {
      const user = JSON.parse(atob(token.split(".")[1]));
      const userId = user.id;

      const response = await axios.post(`http://localhost:8081/api/art/bookmark/${id}`, { userId, artId: id });

      const { message, bookmarked } = response.data;

      setBookmarkStatus(prevStatus => ({
        ...prevStatus,
        [id]: bookmarked
      }));

      console.log(message);
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };


  return (
    <div>
      <Container>
        <Card
          sx={{
            position: 'relative',
            backgroundColor: 'transparent',
            borderRadius: '2px',
            boxShadow: 'none',
            overflow: 'hidden',
          }}
        >
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
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
            }}
          />
          <CardContent>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontFamily: 'Sora, sans-serif',
                fontWeight: 700,
                marginTop: 6,
                color: 'black', 
                zIndex: 6,
              }}
            >
              Habesha Art Store
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{
                marginBottom: 1,
                color: 'CaptionText', 
                zIndex: 1, 
              }}
            >
              Discover a world of creative and unique artworks.
            </Typography>
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
                sx={{
                  textTransform: 'none',
                  color: 'black',
                  '&:hover': {
                    color: 'white',
                    backgroundColor: '#333', 
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
                    '& .MuiMenuItem-root:first-of-type': {
                      borderTop: '1px solid #eee', // Change to :first-of-type
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
          <Grid container spacing={3} sx={{ padding: "20px" }}>
            {art.map((Art, index) => (
              <Grid item key={`${Art.id}-${index}`} xs={12} sm={6} md={4} lg={3}>
                <Card
                  sx={{
                    backgroundColor: '#f7fdff',
                    maxWidth: 280,
                    aspectRatio: "4/6",
                    margin: "5",
                    borderRadius: "3px",
                  }}
                >
                  <Link href={`/product/${Art.id}`} underline='none'>
                    <CardMedia
                      component="img"
                      sx={{
                        borderRadius: "17px",
                        aspectRatio: "4/5",
                        padding: '8px',
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'scale(1.01)',
                        },
                      }}
                      src={`http://localhost:8081/images/${Art.art}`}
                      alt={Art.title}
                    />
                  </Link>
                  <CardContent>
                    <Grid container>
                      <Grid item xs={10.5} sm={10.5} md={10.5}>
                        <Typography variant="body1" fontWeight={"600"} fontFamily={'sora,sans-serif'}>
                          {Art.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          fontFamily={'sora,sans-serif'}
                          gutterBottom
                        >
                          Price : {Art.price} birr
                        </Typography>
                      </Grid>
                      {bookmarkStatus[Art.id] ? (
                        <BookmarkIcon onClick={() => toggleBookmark(Art.id)} />
                      ) : (
                        <BookmarkBorderIcon onClick={() => toggleBookmark(Art.id)} />
                      )}
                    </Grid>
                  </CardContent>
                </Card>
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
