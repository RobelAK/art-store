import React, { useState } from 'react';
import { TextField, Button, Typography, Card, CardContent, Container, Box } from '@mui/material';
import axios from 'axios';

const AdminLogin = () => {
  const [adminName, setAdminName] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:8081/admin-login', {
        name: adminName,
        password: adminPassword
      });

      if (response.data.loginStatus) {
        console.log('Login successful');
        setSuccess('Login successful');
        // Store the token in local storage
        localStorage.setItem('token', response.data.token);
        // Redirect to the WaitingPrint page
        window.location.href = '/Dashboard';
      } else {
        setError('Invalid credentials. Please try again.');
      }
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
            Admin Gateway
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              label="Admin Name"
              variant="filled"
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Password"
              variant="filled"
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button sx={{marginTop:'10px'}} type="submit" fullWidth variant="contained" color="primary">
              Login
            </Button>
          </form>
          {success && (
            <Typography variant="body2" color="success" gutterBottom>
              {success}
            </Typography>
          )}
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

export default AdminLogin;




