import React, { useState } from 'react';
import { TextField, Button, Typography, Card, CardContent, Container, Box } from '@mui/material';
import axios from 'axios';

const BranchLogin = () => {
  const [branchName, setBranchName] = useState('');
  const [branchPassword, setBranchPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8081/branch-login', {
        name: branchName,
        password: branchPassword
      });

      // Handle successful login
      console.log(response.data);
      // Manually redirect to the WaitingPrint page
      window.location.href = '/WaitingPrint';
    } catch (error) {
      // Handle login failure
      setError('Invalid credentials. Please try again.');
      console.error('Login error:', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor:'GrayText',
        justifyContent: 'center',
        minHeight: '100vh', // Set minimum height to fill the viewport
      }}
    >
      <Card>
        <CardContent>
          <Typography fontFamily='sora' fontWeight='bold' variant="h5" gutterBottom>
            Branch Gateway
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              label="Branch Name"
              variant="filled"
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Password"
              variant="filled"
              type="password"
              value={branchPassword}
              onChange={(e) => setBranchPassword(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button sx={{marginTop:'10px'}} type="submit" fullWidth variant="contained" color="primary">
              Login
            </Button>
          </form>
          {error && (
            <Typography variant="body2" color="error" gutterBottom>
              {error}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default BranchLogin;
