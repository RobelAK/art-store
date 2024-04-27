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
import { Container } from '@mui/material';

const Printed = () => {
  const [art, setArt] = useState([]);
  const [open, setOpen] = useState(false); 
  const [selectedImage, setSelectedImage] = useState(null); 

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8081/art");
      setArt(response.data);
    } catch (error) {
      console.error('Error fetching artwork:', error);
    }
  };
  fetchData();

  useEffect(() => {
    fetchData();
  }, []);



  const handleOpenDialog = (art) => {
    setSelectedImage(art);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <div>
      <Container sx={{paddingTop:'100px'}}>

      <Grid container spacing={2} sx={{ padding: '10px' }}>
        {art.map((art, index) => (
          <Grid item xs={12} sm={6} md={2} key={index}>
            <Card sx={{ justifyContent: "left", alignItems: "flex-end", margin: 'auto', padding: "5px" }}>
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
                variant="text"
                color="primary"
                sx={{ marginTop: 2 }}>
                Deliverd?
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
      </Container>
    </div>
  );
};

export default Printed;
