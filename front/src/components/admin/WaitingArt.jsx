import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';

const WaitingArt = () => {
  const [art, setArt] = useState([]);
  const [open, setOpen] = useState(false); 
  const [selectedImage, setSelectedImage] = useState(null); 

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8081/art/waiting");
      setArt(response.data);
    } catch (error) {
      console.error('Error fetching artwork:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleApprove = async (id) => {
    try {
      console.log('Approving artwork with ID:', id);
      await axios.put(`http://localhost:8081/art/approve/${id}`);
      console.log('Artwork approved successfully');
      fetchData();
    } catch (error) {
      console.error('Error approving artwork:', error);
    }
  };
  
  const handleDecline = async (id) => {
    try {
      console.log('Declining artwork with ID:', id);
      await axios.delete(`http://localhost:8081/art/waiting/${id}`);
      console.log('Artwork declined successfully');
      fetchData();
    } catch (error) {
      console.error('Error declining artwork:', error);
    }
  };

  const handleOpenDialog = (art) => {
    setSelectedImage(art);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <div>
      <Grid container spacing={2} sx={{ padding: '10px' }}>
        {art.map((art, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ justifyContent: "left", alignItems: "flex-end", margin: 'auto', padding: 2 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  onClick={() => handleOpenDialog(art)} 
                  src={`http://localhost:8081/images/${art.art}`}
                  alt={art.title}
                  sx={{
                    justifyContent: 'center',
                    aspectRatio: '4/5',
                    display: 'flex',
                    borderRadius: '4px',
                  }}
                />
              </CardActionArea>
              <Button
                fullWidth
                onClick={() => handleApprove(art.id)}
                variant="contained"
                color="primary"
                sx={{ marginTop: 2 }}>
                Approve
              </Button>
              <Button
                fullWidth
                onClick={() => handleDecline(art.id)}
                variant="outlined"
                color="warning"
                sx={{ marginTop: 2 }}>
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
            {/* Render description or additional information here */}
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
