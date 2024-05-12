import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';
import axios from 'axios';
import PriceChange from './PriceChange';

const Overview = () => {
  const [userCount, setUserCount] = useState(0)
  const [artCount, setArtCount] = useState(0)
  const [branchCount, setBranchCount] = useState(0)
  const [adminCount, setAdminCount] = useState(0)
  const [sellerCount, setSellerCount] = useState(0)
  const [buyerCount, setBuyerCount] = useState(0)

  useEffect(() => {
    axios.get('http://localhost:8081/overview')
      .then(res => {
        setUserCount(res.data.userCount)
        setArtCount(res.data.artCount)
        setBranchCount(res.data.branchCount)
        setAdminCount(res.data.adminCount)
        setSellerCount(res.data.sellerCount)
        setBuyerCount(res.data.buyerCount)
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundImage: "url('https://www.transparenttextures.com/patterns/debut-light.png')",
      backgroundColor: "#f0f0f0", // Fallback color if the image fails to load
      minHeight: "80vh", // Ensures the background covers the entire viewport
    }}>
      <Container>
        <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <div style={{ textAlign: 'center', padding: '20px', background: '#2196f3', color: 'white', borderRadius: '10px' }}>
                <Typography variant="h6" gutterBottom>Total Users</Typography>
                <Typography variant="h4">{userCount}</Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <div style={{ textAlign: 'center', padding: '20px', background: '#4caf50', color: 'white', borderRadius: '10px' }}>
                <Typography variant="h6" gutterBottom>Total Arts</Typography>
                <Typography variant="h4">{artCount}</Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <div style={{ textAlign: 'center', padding: '20px', background: '#ff9800', color: 'white', borderRadius: '10px' }}>
                <Typography variant="h6" gutterBottom>Branches</Typography>
                <Typography variant="h4">{branchCount}</Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <div style={{ textAlign: 'center', padding: '20px', background: '#2196f3', color: 'white', borderRadius: '10px' }}>
                <Typography variant="h6" gutterBottom>Admins</Typography>
                <Typography variant="h4">{adminCount}</Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <div style={{ textAlign: 'center', padding: '20px', background: '#4caf50', color: 'white', borderRadius: '10px' }}>
                <Typography variant="h6" gutterBottom>Sellers</Typography>
                <Typography variant="h4">{sellerCount}</Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <div style={{ textAlign: 'center', padding: '20px', background: '#ff9800', color: 'white', borderRadius: '10px' }}>
                <Typography variant="h6" gutterBottom>Buyers</Typography>
                <Typography variant="h4">{buyerCount}</Typography>
              </div>
            </Grid>
          </Grid>
          <PriceChange/>
        </Paper>
      </Container>
    </div>
  );
};

export default Overview;
