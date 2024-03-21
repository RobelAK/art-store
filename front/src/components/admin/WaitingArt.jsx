import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const WaitingArt = () => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
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
        {images.map((images, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ justifyContent: "left", alignItems: "flex-end", margin: 'auto', padding: 2 }}>
              <CardActionArea>

                <CardMedia
                  component="img"
                  image={images.image}
                  onClick={() => handleOpenDialog()}
                  alt={images.title}
                  sx={{
                    justifyContent: 'center',
                    aspectRatio: '4/5',
                    display: 'flex',
                    borderRadius: '4px',
                  }}
                />

              </CardActionArea>
              <Button
                fullWidth variant="contained"
                color="primary" sx={{ marginTop: 2 }}>
                Approve
              </Button>
              <Button
                fullWidth variant="outlined"
                color="warning" sx={{ marginTop: 2 }}>
                Decline
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Image Description</DialogTitle>
        <DialogContent>
          <DialogContentText>
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
