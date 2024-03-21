import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';

const WaitingArt = () => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    {
      id: 1,
      src: 'https://via.placeholder.com/400',
      description: 'Description for image 1',
    },
    {
      id: 2,
      src: 'https://via.placeholder.com/400',
      description: 'Description for image 2',
    },
    {
      id: 3,
      src: 'https://via.placeholder.com/400',
      description: 'Description for image 1',
    },
    {
      id: 4,
      src: 'https://via.placeholder.com/400',
      description: 'Description for image 2',
    },
    {
      id: 5,
      src: 'https://via.placeholder.com/400',
      description: 'Description for image 1',
    },
    {
      id: 6,
      src: 'https://via.placeholder.com/400',
      description: 'Description for image 2',
    },
    // Add more images as needed
  ];

  const handleOpenDialog = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <div>
      <Grid container spacing={2} sx={{ padding: '10px' }}>
        {images.map((image) => (
          <Grid item key={image.id} xs={12} sm={6} md={4} lg={2}>
            <div style={{  maxWidth: 260,
              aspectRatio: '4/5',
              margin: '12px',
              borderRadius: '4px',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.05)',
              },textAlign: 'center' }}
> 
              <img
                onClick={() => handleOpenDialog(image)}
                
                src={image.src}
                alt={`Image ${image.id}`}
              />
              <Button
                variant="contained"
                style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
                sx={{ margin: '12px', padding: '10px', width: '260px' }}
                color="primary"

              >
                Aprove
              </Button>

              <Button
                sx={{ margin: '12px', padding: '10px', width: '260px' }}

                style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
                variant="outlined"
                color="primary">
                dicline
              </Button>
            </div>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Image Description</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {selectedImage && selectedImage.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default WaitingArt;
