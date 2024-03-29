import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Divider } from '@mui/material';

const ArtInfo = ({ onButtonClick, selectedButton, ...props }) => {
  const [rating, setRating] = useState(4);

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleAddToCart = () => {
    console.log('Product added to cart!');
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'linear-gradient(to bottom, #dbe4f0, #f0f4f7)',
      }}
    >
      <Card
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          borderRadius: '8px',
          p: 2,
          textAlign: 'center',
          width: '70%',
          m: '2%',
          ...props,
        }}
      >
        <CardContent>
          <Typography variant="h4" fontFamily={'sora,sans-serif'}>
            Artwork Title
          </Typography>
          <Typography
            variant="subtitle1"
            fontFamily={'sora,sans-serif'}
            color="text.secondary"
            gutterBottom
          >
            by Artist Name
          </Typography>
          <Divider />
          <Typography
            variant="body2"
            color={''}
            fontFamily={'sora,sans-serif'}
            paragraph
          >
            Artwork Description goes here. Provide details about the artwork and its significance.
          </Typography>
          <Divider />
          <Typography variant="body2" fontWeight="bold">
            Available Sizes
          </Typography>
          <ButtonGroup
            sx={{
              mb: 2,
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
            }}
          >
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
          <Typography
            variant="h5"
            fontFamily={'sora,sans-serif'}
            gutterBottom
          >
            Price : 2000 birr
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2,
            }}
          >
            <Typography
              variant="h6"
              component="span"
              sx={{ mr: 1 }}
            >
              Rating:
            </Typography>
            <Rating
              name="product-rating"
              value={rating}
              onChange={handleRatingChange}
              precision={0.5}
              sx={{ ml: 1 }}
            />
            <Typography variant="subtitle2" color="text.secondary" sx={{ ml: 1 }}>
              {rating}/5
            </Typography>
          </Box>

          <Button
            variant="contained"
            color="primary"
            startIcon={<AddShoppingCartIcon />}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ArtInfo;
