import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Button, Container } from '@mui/material';
import Footer from '../../components/users/Footer';
import Navbar from '../../components/users/Navbar';
import { Link } from 'react-router-dom';

const generateDummyData = () => {
  // Generate random dummy data
  return Array.from({ length: 4 }, (_, index) => ({
    id: index + 1,
    title: `Item ${index + 1}`,
    price: Math.floor(Math.random() * 50) + 1, // Random price between 1 and 50
    thumbnail: `https://source.unsplash.com/random/800x1000${index + 1}`, // Unsplash image URL
  }));
};

const CartPage = () => {
  const cartItems = generateDummyData();

  const removeFromCart = (itemId) => {
    // Implement the logic to remove an item from the cart
    console.log(`Removing item with ID: ${itemId}`);
  };

  const calculateTotal = () => {
    // Implement the logic to calculate the total value
    return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <>
    <div style={{backgroundColor:'#f0f1f2'}}>
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
                    image={item.thumbnail}
                  />
                  <CardContent >
                    <Typography variant="h6" fontFamily='sora,sans-serif' fontWeight='light' component="div">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${item.price}
                    </Typography>
                  </CardContent>
                  <Button variant="contained" margin='-20px' fullWidth onClick={() => removeFromCart(item.id)} color="primary" >
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
