import React, { useState } from 'react';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import ArtInfo from './ArtInfo';

const ProductPreview = () => {
  const imageUrl = 'https://source.unsplash.com/random/800x1000';

  const [selectedButton, setSelectedButton] = useState(1);

  const handleButtonClick = (buttonNumber) => {
    setSelectedButton(buttonNumber);
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'linear-gradient(to bottom, #dbe4f0, #f0f4f7)',
      }}
    >
      <CardMedia
        component="img"
        alt="Artwork Preview"
        height="auto"
        image={imageUrl}
        sx={{
          maxWidth: selectedButton === 1 ? '15%' : selectedButton === 2 ? '20%' : '25%',
          aspectRatio: '4/5',
          boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.3)',
          borderRadius: '4px',
          padding: '0.1%',
          marginTop: '8%',
          marginRight: '10%',
          marginBottom: '8%',
          transition: 'max-width 0.3s ease-in-out',
        }}
      />

      <ArtInfo
        onButtonClick={handleButtonClick}
        selectedButton={selectedButton}
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '25%',
          height: '100%',
          background: 'rgba(255, 255, 255, 0.8)',
          padding: '16px',
        }}
      />
    </Box>
  );
};

export default ProductPreview;
