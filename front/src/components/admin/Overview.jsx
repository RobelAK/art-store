// Overview.js
import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';
import axios from 'axios';
import WaitingArt from './WaitingArt';

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
        console.log(res.data)
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <>
    <Container style={{justifyContent:'space-between'}}>
    <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', backgroundColor: '#f5f5f5' }}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <div style={{ textAlign: 'center', padding: '15px', background: '#2196f3', color: 'white' }}>
            <Typography variant="h6">Total Users</Typography>
            <Typography variant="h4">{userCount}</Typography>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div style={{ textAlign: 'center', padding: '15px', background: '#4caf50', color: 'white' }}>
            <Typography variant="h6">Total Arts</Typography>
            <Typography variant="h4">{artCount}</Typography>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div style={{ textAlign: 'center', padding: '15px', background: '#ff9800', color: 'white' }}>
            <Typography variant="h6">Branches</Typography>
            <Typography variant="h4">{branchCount}</Typography>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div style={{ textAlign: 'center', padding: '15px', background: '#2196f3', color: 'white' }}>
            <Typography variant="h6">Admins</Typography>
            <Typography variant="h4">{adminCount}</Typography>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div style={{ textAlign: 'center', padding: '15px', background: '#4caf50', color: 'white' }}>
            <Typography variant="h6">Sellers</Typography>
            <Typography variant="h4">{sellerCount}</Typography>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div style={{ textAlign: 'center', padding: '15px', background: '#ff9800', color: 'white' }}>
            <Typography variant="h6">Buyers</Typography>
            <Typography variant="h4">{buyerCount}</Typography>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div style={{ textAlign: 'center', padding: '15px', background: '#2196f3', color: 'white' }}>
            <Typography variant="h6">seles</Typography>
            <Typography variant="h4">5 items</Typography>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div style={{ textAlign: 'center', padding: '15px', background: '#4caf50', color: 'white' }}>
            <Typography variant="h6">Transaction</Typography>
            <Typography variant="h4">{buyerCount}</Typography>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div style={{ textAlign: 'center', padding: '15px', background: '#ff9800', color: 'white' }}>
            <Typography variant="h6">Total Revenue</Typography>
            <Typography variant="h4">10,545 birr</Typography>
          </div>
        </Grid>
        
      </Grid>
    </Paper>
    </Container>
    </>
  );
};

export default Overview;
