import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Autocomplete } from '@mui/material';
// ... (other imports)

const FeaturedArtworks = ({ artworks }) => {
  const handleAddToCart = (artworkTitle) => {
    // Add your logic here for adding the artwork to the cart
    console.log(`Added ${artworkTitle} to the cart`);
  };

  return (
    <Grid container spacing={4} sx={{ marginTop: 4 }}>
      <Grid item xs={12}>
        <Typography
          variant="h4"
          component="div"
          fontWeight="mid"
          fontFamily="Sora"
          textAlign="center"
          mb={2}

        >
          Featured Artworks
        </Typography>
        <Typography
          variant="h6"
          component="div"
          fontWeight="light"
          fontFamily="Sora"
          textAlign="center"
          mb={2}

        >
          Featured Artworks
        </Typography>
      </Grid>
      {artworks.map((artwork, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card sx={{ justifyContent: "center", alignItems: "flex-start", maxWidth: 350, margin: 'auto', padding: 2 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="Auto"
                image={artwork.image}
                alt={artwork.title}
                sx={{
                  justifyContent: 'center',
                  aspectRatio: '4/5',
                  display: 'flex',
                  borderRadius: '4px',
                }}
              />
              <CardContent>
                <Typography variant="h6" component="div" textAlign="center">
                  {artwork.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" textAlign="center">
                  Price: ${artwork.price.toFixed(2)}
                </Typography>
              </CardContent>
            </CardActionArea>
            <Button
              onClick={() => handleAddToCart(artwork.title)}
              fullWidth variant="contained"
              color="primary" sx={{ marginTop: 2 }}>
              Add to Cart
            </Button>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

// ... (rest of the code)

// Example usage:
const sampleArtworks = [
  {
    title: 'Beautiful Painting 1',
    image: 'https://images.unsplash.com/photo-1602537934633-c8cadec1d16b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 150.99,
  },
  {
    title: 'Beautiful Painting 2',
    image: 'https://images.unsplash.com/photo-1584446922442-7ac6b8c118f3?q=80&w=1956&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 99.99,
  },
  {
    image: 'https://images.unsplash.com/photo-1577086677645-1e5e43894316?q=80&w=1998&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Beautiful Painting 3',
    price: 120.50,
  },
  {
    image: 'https://images.unsplash.com/photo-1577086677645-1e5e43894316?q=80&w=1998&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Beautiful Painting 3',
    price: 120.50,
  },
];

const App = () => {
  return (
    <div>
      <FeaturedArtworks artworks={sampleArtworks} />
    </div>
  );
};

export default App;
