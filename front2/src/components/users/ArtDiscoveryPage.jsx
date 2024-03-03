import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ArtCard from './ArtCard'; // Adjust the import path

const ArtDiscoveryPage = () => {
  const initialArtItems = Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    title: `Artwork ${index + 1}`,
    artist: `Artist ${index + 1}`,
    imageUrl: `https://source.unsplash.com/random/300x400?art=${index + 1}`,
  }));

  const [artItems, setArtItems] = useState(initialArtItems);

  const handleLoadMore = () => {
    // Add 12 more items to the existing list
    const newArtItems = Array.from({ length: 12 }, (_, index) => ({
      id: artItems.length + index + 1,
      title: `Artwork ${artItems.length + index + 1}`,
      artist: `Artist ${artItems.length + index + 1}`,
      imageUrl: `https://source.unsplash.com/random/300x400?art=${artItems.length + index + 1}`,
    }));

    setArtItems((prevItems) => [...prevItems, ...newArtItems]);
  };

  return (
    <div >
      <Grid container spacing={4} sx={{  padding: '20px',}}>
        {artItems.map((artItem) => (
          <Grid item key={artItem.id} xs={12} sm={6} md={4} lg={3}>
            <ArtCard {...artItem} />
          </Grid>
        ))}
      </Grid >
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" onClick={handleLoadMore} sx={{ margin: '20px' }}>
          Load More
        </Button>
      </div>
    </div>
  );
};

export default ArtDiscoveryPage;
