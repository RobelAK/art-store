import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const ArtInfo = ({ onButtonClick, selectedButton, ...props }) => {
  const [rating, setRating] = useState(4);

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleAddToCart = () => {
    console.log('Product added to cart!');
  };

  return (
    <Card sx={{
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      borderRadius: '8px',
      p: 3,
      textAlign: 'center',
      m: '2%',
      width: '30%', ...props
    }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Artwork Title
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          by Artist Name
        </Typography>
        <Typography variant="body1" paragraph>
          Artwork Description goes here. Provide details about the artwork and its significance.
        </Typography>
        <Typography variant="body2" fontWeight='bold'>
          Avilable Sizes
        </Typography>
        <ButtonGroup sx={{ mb: 2 }}>
          <Button
            variant="contained"
            onClick={() => {
              onButtonClick(1);
            }}
            disabled={selectedButton === 1}
          >
            M 45*32cm
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              onButtonClick(2);
            }}
            disabled={selectedButton === 2}
          >
            L 67.5*48cm
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              onButtonClick(3);
            }}
            disabled={selectedButton === 3}
          >
            XL 90*64cm
          </Button>
        </ButtonGroup>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
          <Typography variant="h6" component="span" sx={{ mr: 1 }}>
            Rating:
          </Typography>
          <Rating name="product-rating" value={rating} onChange={handleRatingChange} precision={0.5} sx={{ ml: 1 }} />
          <Typography variant="subtitle2" color="text.secondary" sx={{ ml: 1 }}>
            {rating}/5
          </Typography>
        </Box>
        <Button variant="contained" color="primary" startIcon={<AddShoppingCartIcon />} onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ArtInfo;
