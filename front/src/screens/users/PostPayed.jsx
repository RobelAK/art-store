import React, { useEffect } from 'react';
import { Container, Typography, Button, Card, CardContent, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PostPaid() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = JSON.parse(atob(token.split('.')[1]));
      axios
        .post("http://localhost:8081/postpayment", { userId: user.id })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div style={{ 
      alignContent:'center',
      justifyContent:'center',
      backgroundImage: "url('https://www.transparenttextures.com/patterns/debut-light.png')",
      backgroundColor: "#f0f0f0", // Fallback color if the image fails to load
      minHeight: "100vh", // Ensures the background covers the entire viewport
    }}>
      <Container>
        <Card style={{ maxWidth: 400, margin: 'auto', padding:'40px'}}>
          <CardContent>
            <Typography variant="h5" fontFamily='sora' component="div" align="center" gutterBottom>
              Thank you for your purchase!
            </Typography>
            <Typography variant="body1" fontFamily='sora' align="center" paragraph>
              Your items have been successfully purchased. You can track the status of your items in your cart.
            </Typography>
            <Button variant="contained" color="primary" onClick={handleClick} fullWidth>
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default PostPaid;
