import React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const ArtCard = ({ id, imageUrl, title, artist }) => {
  return (
    <Link to='/product'>
    <Card
      sx={{
        maxWidth: 300,
        margin: 'auto', // Center the card
        borderRadius: '8px', // Add border-radius for curved edges
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
          style={{ padding: '12px', borderRadius: '16px' }}
          height="400" // 4:5 ratio
          image={imageUrl}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Artist: {artist}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Link>
  );
};

export default ArtCard;
