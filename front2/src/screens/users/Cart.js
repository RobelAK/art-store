import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Container,
  Typography,
  IconButton,
  Button,
  Stack,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Cart = () => {
  // Placeholder data for demonstration purposes
  const [cartItems, setCartItems] = useState([
    { id: 1, thumbnail: 'https://source.unsplash.com/random/50x50', title: 'Artwork 1', price: 100 },
    { id: 2, thumbnail: 'https://source.unsplash.com/random/50x50', title: 'Artwork 2', price: 150 },
    // Add more items as needed
  ]);

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  const handleRemoveItem = (itemId) => {
    // Remove the item from the cart
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const handleCheckout = () => {
    // Add logic for checkout
    console.log('Checkout button clicked');
  };

  return (
    <div align='center'>
      <Container sx={{ height: '108px', overflow: 'hidden' }} />
      <Card sx={{ width: '18%', paddingTop: '25%', position: 'relative', alignItems: 'center' }}>
        <CardContent sx={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
          <Container>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Shopping Cart
            </Typography>

            {cartItems.map((item) => (
              <Stack key={item.id} direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                <img src={item.thumbnail} alt={item.title} width={50} height={50} />

                <Typography variant="body1">{item.title}</Typography>
                <Typography variant="body1">${item.price}</Typography>

                <IconButton
                  onClick={() => handleRemoveItem(item.id)}
                  color="primary"
                  aria-label="Remove from cart"
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            ))}
            <Container sx={{ height: '108px', overflow: 'hidden' }} />
            <div align='center'>
              <Stack direction="row" justifyContent="space-evenly" alignItems="center" sx={{ mt: 2 }}>
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6">${totalPrice}</Typography>
              </Stack>
              <Button variant="contained" color="primary" onClick={handleCheckout} sx={{ mt: 2 }}>
                Checkout
              </Button>
            </div>
          </Container>
        </CardContent>
      </Card>
      <Container sx={{ height: '108px', overflow: 'hidden' }} />
    </div>
  );
};

export default Cart;
