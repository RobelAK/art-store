import React, { useEffect, useState } from "react";
import axios from "axios";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Container,
  Box,
  Paper,
  Divider,
  Link,
} from "@mui/material";
import Footer from "../../components/users/Footer";
import Navbar from "../../components/users/Navbar";

const Bookmark = () => {
  const [userId, setUserId] = useState(null);
  const [bookmarkedArtworks, setBookmarkedArtworks] = useState([]);

  useEffect(() => {
    // Assuming you have some way of getting the userId (e.g., from local storage)
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(atob(token.split(".")[1]));
      setUserId(user.id);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchBookmarkedArtworks(userId);
      

    }
  }, [userId]);
  

  const fetchBookmarkedArtworks = async (userId) => {
    try {
      // Make a GET request to the backend endpoint
      const response = await axios.get(`http://localhost:8081/api/bookmarked-art/${userId}`);

      // Extract the bookmarked artworks from the response
      const bookmarkedArtworksData = response.data;

      // Update the state with the retrieved artworks
      setBookmarkedArtworks(bookmarkedArtworksData);
    } catch (error) {
      console.error('Error fetching bookmarked artworks:', error);
    }
  };
 
  const removeBookmark = async (userId, artId) => {
    try {
      const response = await axios.delete(`http://localhost:8081/api/bookmarks/${userId}/${artId}`);
      console.log('Bookmark removed successfully:', response.data);
      
      // Remove the deleted artwork from the state
      setBookmarkedArtworks(prevArtworks => prevArtworks.filter(artwork => artwork.id !== artId));
      
      // Optionally, you can also show a success message or perform other UI updates
    } catch (error) {
      console.error('Error removing bookmark:', error);
      // Handle error state or display error message to the user
    }
  };
  
  return (
    <>
      <Navbar/>
      <Container sx={{ height: '2px', bgcolor: '#e3e3e3', marginTop: '50px', marginBottom: '15px' }} />
      <Card>
        <CardContent>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontFamily: 'Sora, sans-serif',
              fontWeight: 700,
              marginTop: 6,
              color: 'black', 
            }}
          >
            Saved Artworks
          </Typography>
        </CardContent>
      </Card>
      <Container>
        <Box>
          {bookmarkedArtworks.length === 0 ? (
            <Typography
              variant="body1"
              sx={{
                fontFamily: 'Sora, sans-serif',
                fontWeight: 600,
                marginTop: 6,
                color: 'black', 
                textAlign: 'center'
              }}
            >
              No saved artworks
            </Typography>
          ) : (
            <Grid container spacing={3} sx={{ padding: "20px" }}>
              {bookmarkedArtworks.map((artwork, index) => (
                <Grid item key={`${artwork.id}-${index}`} xs={12} sm={6} md={4} lg={3}>
                  <Card
                    sx={{
                      backgroundColor: '#f7fdff',
                      maxWidth: 280,
                      aspectRatio: "4/6",
                      margin: "5",
                      borderRadius: "3px",
                    }}
                  >
                    <Link href={`/product/${artwork.id}`} underline='none'>
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
                        src={`http://localhost:8081/images/${artwork.art}`}
                        alt={artwork.title}
                      />
                    </Link>
                    <CardContent>
                      <Grid container >
                        <Grid item xs={10.5} sm={10.5} md={10.5}>
                          <Typography variant="body1" fontWeight={"600"} fontFamily={'sora,sans-serif'}>
                            {artwork.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            fontFamily={'sora,sans-serif'}
                            gutterBottom
                          >
                            Price : {artwork.price} birr
                          </Typography>
                        </Grid>
                        <BookmarkIcon onClick={() => removeBookmark(userId, artwork.id)} />
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
          <div
            style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
          >
          </div>
        </Box>
      </Container>
      <Footer/>
    </>
  );  
};

export default Bookmark;
