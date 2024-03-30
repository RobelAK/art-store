import React, { useState } from 'react';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import ArtInfo from './ArtInfo';
import { Card, Grid } from '@mui/material';

const ProductPreview = () => {
  const imageUrl = 'https://source.unsplash.com/random/800x1000';

  const [selectedButton, setSelectedButton] = useState(1);

  const handleButtonClick = (buttonNumber) => {
    setSelectedButton(buttonNumber);
  };

  return (
    <Box sx={{ boxShadow: 'inherit', backgroundImage: 'linear-gradient(to bottom, #dbe4f0, #f0f4f7)', }}>
      <Grid container>
        <Grid item xs={12} md={7}>
          <Card sx={{
            width: '100%',
            height: '100%',
            backgroundImage: 'linear-gradient(to bottom, #dbe4f0, #f0f4f7)',
            color: 'transparent',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'none',
          }}>
            <CardMedia
              component="img"
              alt="Artwork Preview"
              height="auto"
              image={imageUrl}
              sx={{
                maxWidth: selectedButton === 1 ? '200px' : selectedButton === 2 ? '260px' : '340px',
                aspectRatio: '4/5',
                boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.3)',
                borderRadius: '4px',
                padding: '0.1%',
                marginTop: '8%',
                marginRight: '8%',
                marginLeft: '8%',
                marginBottom: '8%',
                transition: 'max-width 0.3s ease-in-out',
              }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'center' }}>
          <ArtInfo
            onButtonClick={handleButtonClick}
            selectedButton={selectedButton}
            sx={{
              margin:'3%',
              position: 'absolute',
              top: 0,
              right: 0,
              background: 'rgba(255, 255, 255, 0.8)',
              padding: '2%',
              '@media (max-width: 600px)': {
                position: 'relative',
                top: 'unset',
                right: 'unset',
                background: 'transparent',
                padding: '0 10px', // Adjust padding as needed
              },
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductPreview;
