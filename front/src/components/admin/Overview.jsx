// Overview.js
import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import UserManagement from './UserManagement';
import { Container } from '@mui/material';

const Overview = () => {
  // Dummy data (replace with data from your database later)
  const totalUsers = 100;
  const pendingRequests = 5;
  const activeBranches = 3;

  return (
    <>
    <Container style={{justifyContent:'space-between'}}>
    <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', backgroundColor: '#f5f5f5' }}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <div style={{ textAlign: 'center', padding: '15px', background: '#2196f3', color: 'white' }}>
            <Typography variant="h6">Total Users</Typography>
            <Typography variant="h4">{totalUsers}</Typography>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div style={{ textAlign: 'center', padding: '15px', background: '#4caf50', color: 'white' }}>
            <Typography variant="h6">Pending Requests</Typography>
            <Typography variant="h4">{pendingRequests}</Typography>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div style={{ textAlign: 'center', padding: '15px', background: '#ff9800', color: 'white' }}>
            <Typography variant="h6">Active Branches</Typography>
            <Typography variant="h4">{activeBranches}</Typography>
          </div>
        </Grid>
      </Grid>
    </Paper>
    <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', backgroundColor: '#f5f5f5' }}>
      <UserManagement/>

    </Paper>
    </Container>
    </>
  );
};

export default Overview;
