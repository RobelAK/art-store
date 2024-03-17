import React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const ArtCard = ({ id, imageUrl, title, artist, price }) => {
  return (
    <Link to='/product'>
      <Card
        sx={{
          maxWidth: 260,
          aspectRatio: '4/5',
          margin: 'auto', // Center the card
          borderRadius: '4px', // Add border-radius for curved edges
          transition: 'transform 0.2s', // Add smooth transition for zoom effect
          '&:hover': {
            transform: 'scale(1.05)', // Zoom effect on hover
          },
        }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            alt={title}
            image={imageUrl}
          />
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default ArtCard;
