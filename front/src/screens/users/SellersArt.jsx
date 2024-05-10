import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Navbar from '../../components/users/Navbar';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';

const SellersArt = () => {
  const { id } = useParams();
  const [artInfo, setArtInfo] = useState(null);

  useEffect(() => {
    const fetchArtInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8081/user/art/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setArtInfo(response.data);
      } catch (error) {
        console.error('Error fetching artwork information:', error);
      }
    };
    fetchArtInfo();
  }, [id]);

  const handleDeleteArt = async () => {
    if (window.confirm('Are you sure you want to Permanently Delate this art?')) {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8081/user/art/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      window.location.href = '/profilepage';
    } catch (error) {
      console.error('Error deleting artwork:', error);
    }
  }
};
  

  if (!artInfo) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or message
  }

  return (
    <>
      <Navbar />

      <div style={{ flexGrow: 1, margin: '5%', marginTop: '8%' }}>
        <Grid container spacing={2} justify="center">
          <Grid item xs={12} sm={6}>
            <Card sx={{ maxWidth: '1000px' }}>
              <CardMedia
                sx={{
                  height: '600px',
                  ratio: "4/5"
                }}
                image={`http://localhost:8081/images/${artInfo.art}`} // Assuming 'art' is the property containing the image URL
                title="Art"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {artInfo.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {artInfo.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card sx={{alignContent:'center' , display:'flex' , flexDirection:'column'} }>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Art Activity
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Total number of items sold: {artInfo.itemsSold}
                </Typography>
                {/* You can display more activity related to art here */}
              </CardContent>
              <Button variant="text" fullWidth color="primary" style={{ padding: '13px' ,color:'red' , margin:'10px' }} onClick={handleDeleteArt}>
              Delete Art Permanently
            </Button>
            </Card>
            
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default SellersArt;
