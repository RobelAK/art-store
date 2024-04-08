import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Button, Container } from '@mui/material';
import Footer from '../../components/users/Footer';
import Navbar from '../../components/users/Navbar';
import { Link } from 'react-router-dom';

const CartPage = ({ removeFromCart }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Retrieve cart items from local storage
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const handleRemoveFromCart = (itemToRemove) => {
    // Filter out the item to remove
    const updatedCartItems = cartItems.filter(item => item !== itemToRemove);
    // Update state and local storage
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  return (
    <>
      <div style={{ backgroundColor: '#f0f1f2' }}>
        <Navbar />
        <Container sx={{ height: '100px', overflow: 'hidden' }} />
        <div style={{ textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom fontFamily={'sora,sans-serif'}>
            Your Cart
          </Typography>
          <Container sx={{ Width: '290px', height: '4px', bgcolor: '#ebebeb', marginBottom: '40px' }}></Container>
          {Array.isArray(cartItems) && cartItems.length > 0 ? (
            <Grid container display='flex' justifyContent='Center' spacing={5}>
              {cartItems.map((item) => (
                <Grid item key={item.id} xs={8} sm={6} md={5} lg={2}>
                  <Card sx={{ width: '200px', height: '370px', alignContent: 'center' }}>
                    <CardMedia
                      component="img"
                      alt={item.title}
                      height="230"
                      image={item.art}
                    />
                    <CardContent >
                      <Typography variant="h6" fontFamily='sora,sans-serif' fontWeight='light' component="div">
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Size: {item.size} {/* Display the size of the art */}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ${item.price}
                      </Typography>
                    </CardContent>
                    <Button variant="contained" margin='-20px' fullWidth onClick={() => handleRemoveFromCart(item)} color="primary" >
                      Remove
                    </Button>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body1" color="text.secondary">
              Your cart is empty.
            </Typography>
          )}
          <Container sx={{ Width: '290px', height: '4px', bgcolor: '#ebebeb', margin: '40px' }}></Container>
          {cartItems.length > 0 && (
            <div>
              <Typography variant="h6" style={{ marginTop: '20px' }}>
                Total: ${calculateTotal()}
              </Typography>
              <Link to='/Checkout'>
                <Button variant="contained" color="primary" style={{ marginTop: '10px' }}>
                  Checkout
                </Button>
              </Link>
            </div>
          )}
          <Container sx={{ Width: '290px', height: '4px', bgcolor: '#ebebeb', margin: '40px' }}></Container>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default CartPage;
