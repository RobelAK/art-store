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

const AvilableArts = () => {
  const [art, setArt] = useState([]);
  const [open, setOpen] = useState(false); 
  const [selectedImage, setSelectedImage] = useState(null); 

  useEffect(() => {
    axios.get("http://localhost:8081/art")
    .then((res)=>{
      setArt(res.data)
      console.log(res.data)
    })
  }, []);

  const handleHiding = async (id) => {
    try {
      await axios.put(`http://localhost:8081/art/hide/${id}`);
      console.log('Artwork Hidden successfully');
    } catch (error) {
      console.error('Error hiding artwork:', error);
    }
  };
  
  const handleDecline = async (id) => {
    try {
      console.log('Declining artwork with ID:', id);
      await axios.delete(`http://localhost:8081/art/decline/${id}`);
      console.log('Artwork declined successfully');
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
                onClick={() => handleHiding(art.id)}
                variant="contained"
                color="primary"
                sx={{ marginTop: 2 }}>
                suspend
              </Button>
              <Button
                fullWidth
                onClick={() => handleDecline(art.id)}
                variant="outlined"
                color="warning"
                sx={{ marginTop: 2 }}>
                Delete
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>About the Art</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {selectedImage && (
              <>
                <img src={`http://localhost:8081/images/${selectedImage.art}`} alt={selectedImage.title} style={{ maxWidth: '100%' }} />
                <p style={{fontFamily:'sora', fontSize:'26px' , fontWeight:'bold', color:'black'}}>Art Title : {selectedImage.title}</p>
                <p style={{fontFamily:'sora', fontSize:'23px' ,marginTop:'-25px', fontWeight:'light', color:'gray'}}>Artists Name : {selectedImage.artist}</p>
                <p style={{fontFamily:'sora', fontSize:'16px' , fontWeight:'light', color:'black'}}>Art Description : {selectedImage.description}</p>
                <p style={{fontFamily:'sora', fontSize:'16px' , fontWeight:'light', color:'gray'}}>Art Price : {selectedImage.price}</p>
                <p style={{fontFamily:'sora', fontSize:'16px' , fontWeight:'light', color:'gray'}}>Art Category : {selectedImage.category}</p>
                <p style={{fontFamily:'sora', fontSize:'16px' , fontWeight:'light', color:'gray'}}>Artists id : {selectedImage.user_id}</p>
              </>
            )}
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

export default AvilableArts;
