import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  TextField,
  Container,
  Box,
  Paper,
  Divider,
  Link,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Footer from "../../components/users/Footer";
import Navbar from "../../components/users/Navbar";

const CartPage = () => {
  const [cartData, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [itemsInCart, setItemsInCart] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(atob(token.split(".")[1]));
      axios
        .post("http://localhost:8081/cart", { userId: user.id })
        .then((res) => {
          setCartData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("token not available");
    }
  }, []);
  useEffect(() => {
    const totalPrice = calculateTotalPrice();
    setTotalPrice(totalPrice);
    if (cartData.length == 0) {
      setItemsInCart(false);
    } else {
      setItemsInCart(true);
    }
  }, [cartData]);

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartData.forEach((item) => {
      totalPrice += item.quantity * item.price;
    });
    return totalPrice;
  };

  const handleRemoveItem = (id) => {
    axios
      .post("http://localhost:8081/removecartitem", { id: id })
      .then((res) => {
        console.log(res.data);
        setCartData(cartData.filter((cart) => cart.id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleCheckout = () => {
    console.log(itemsInCart);
  };

  return (
    <>
      <Navbar />
      <Box style={{ backgroundColor: "#f0f1f2", minHeight: "100vh" }}>


        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "100px",
          }}
        >
          {itemsInCart ? (
            <Grid container spacing={1} >
              
                <Grid  item xs={12} md={6} >
                {cartData.map((cartItem, i) => (
                  <Card sx={{
                    boxShadow: 1,marginBottom:'5px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: '05px', padding: 1,
                  }}>
                    <Grid key={i} container spacing={2}>
                      <Grid item xs={12} md={8}>
                        <Grid container  >
                          <Grid item>
                            <Link
                              href={`/product/${cartItem.art_id}`}
                              underline="none"
                            >
                              <CardMedia
                                component="img"
                                sx={{ width: 100, margin: 1, aspectRatio: 4 / 6 }}
                                src={`http://localhost:8081/images/${cartItem.art}`}
                                alt="Product Image"
                              />
                            </Link>
                          </Grid>
                          <Divider orientation="vertical" flexItem variant="middle" sx={{ backgroundColor: "black" }} />

                          <Grid item>
                            <CardContent sx={{ flex: 1 }}>
                              <Typography variant="h6"
                                component="div"
                                fontWeight="light"
                                fontFamily="Sora"
                                textAlign="center">Title : {cartItem.art_title}</Typography>
                              <Typography variant="body2"
                                component="div"
                                fontWeight="bold"
                                fontFamily="Sora"
                                mb={2}>{"Art by : " + cartItem.seller_name}</Typography>
                              <Typography variant="body2"
                                component="div"
                                fontFamily="Sora"> Size : {cartItem.size}</Typography>
                              <Typography variant="body2"
                                component="div"
                                fontFamily="Sora">Quantity : {cartItem.quantity}</Typography>
                              <Typography variant="body2"
                                component="div"
                                fontFamily="Sora">Price: {cartItem.price * cartItem.quantity + " birr"}</Typography>
                            </CardContent>

                          </Grid>
                        </Grid>

                      </Grid>
                      <Grid item sm={12} md={4}>
                        <Button variant="text" sx={{ color: 'red', marginTop: '30%', }} onClick={() => handleRemoveItem(cartItem.id)} >
                          Remove Item
                        </Button>

                      </Grid>
                    </Grid>
                  </Card>
                  ))}
                </Grid>
              


              {/* ///////////////////////////////////checkout part///////////////////// */}


              <Grid item xs={12} md={6}  >
                <Container >
                  <Card sx={{
                    boxShadow: 1,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    borderRadius: '05px',
                    padding: 5,
                  }}>

                    <Box component="form" sx={{ mt: 1 }}>
                      <CardContent>
                        <Typography variant="h6" component="div" fontFamily="sora,sans-serif" textAlign="center">
                          Checkout Here
                        </Typography>
                        <Typography variant="body2" component="div" fontFamily="sora,sans-serif" textAlign="center">
                          Total Cart Items
                        </Typography>
                      </CardContent>
                      <Grid container rowSpacing={2}>
                        <Grid item xs={12}>
                          <Grid container direction={"row"}>
                            <Grid item xs={6}>
                              <Typography variant="body2" fontWeight='bold' component="div" fontFamily="sora,sans-serif" textAlign="center"> Title </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="body2" fontWeight='bold' component="div" fontFamily="sora,sans-serif" marginBottom={"5px"} textAlign="center"> Price </Typography>
                            </Grid>
                          </Grid>

                          {cartData.map((cartItem, i) => (
                            <Grid container direction={"row"}>
                              <Grid item xs={8}>
                                <Typography variant="body2" component="div" fontFamily="sora,sans-serif" >
                                  {cartItem.art_title} </Typography>
                              </Grid>
                              <Grid item xs={4}>
                                <Typography variant="body2" component="div" fontFamily="sora,sans-serif" textAlign="center">
                                  {cartItem.price}ETB </Typography>
                              </Grid>
                            </Grid>
                          ))}

                          <Grid
                            item
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              flexDirection: "column",
                              justifyContent: "center",
                              marginTop: "5px",
                            }}
                          >
                            <Grid container direction={"row"}>
                              <Grid item xs={8}>
                                <Typography variant="body2" color='darkblue' fontWeight='bold' component="div" fontFamily="sora,sans-serif" >Total Price</Typography>
                              </Grid>
                              <Grid item xs={4}>
                                <Typography variant="body2" color='darkBlue' fontWeight='bold' component="div" fontFamily="sora,sans-serif" textAlign="center">{totalPrice} ETB</Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid item xs={12}>
                          <Divider
                            orientation="horizontal"
                            flexItem
                            variant="middle"
                            sx={{ backgroundColor: "black" }}
                          />
                        </Grid>

                      </Grid>
                      <CardContent>
                        <Typography variant="h6" component="div" fontFamily="sora,sans-serif" textAlign="center">
                          Pay With Chapa
                        </Typography>
                        <Typography variant="body2" component="div" fontFamily="sora,sans-serif" textAlign="center">
                          Fill The Form Correctly
                        </Typography>
                      </CardContent>
                      <Grid container rowSpacing={1}>
                        <Grid item xs={12}>
                          <TextField
                            type='name'
                            required
                            fullWidth
                            size='small'
                            id="first_name"
                            label="First Name"
                            name="first_name"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            type='name'
                            size='small'
                            required
                            fullWidth
                            id="last_name"
                            label="Last Name"
                            name="last_name"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            type='email'
                            required
                            fullWidth
                            size='small'
                            id="email"
                            label="Email Address"
                            name="email"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            type='number'
                            required
                            fullWidth
                            size='small'
                            id="phone_number"
                            label="Phone Number"
                            name="phone_number"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <FormControl fullWidth>
                            <InputLabel>Choose your Location</InputLabel>
                            <Select
                              name="Branch"
                              label="location"
                              onChange={(e) => setCategory(e.target.value)}
                              fullWidth
                              required
                            >
                              <MenuItem value="Abstract">Addis Ababa , Akaky Kaliti ,Branch</MenuItem>
                              <MenuItem value="Animals">Addis Ababa , Bole ,Branch</MenuItem>
                              <MenuItem value="Animals">Addis Ababa , Lideta ,Branch</MenuItem>
                              <MenuItem value="Animals">Wolkite , gubre, branch</MenuItem>
                              <MenuItem value="Animals">Wolkite , branch</MenuItem>

                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                          <Button variant="contained" fullWidth onClick={handleCheckout}>
                            checkout
                          </Button>
                        </Grid>
                      </Grid>

                    </Box>
                  </Card>

                </Container>
              </Grid>
            </Grid>
          ) : (
            <Grid
              container
              height={"50vh"}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Typography variant="h5" mb={1}>
                Nothing here
              </Typography>
              <Link variant="h6" underline="none" href="/arts">
                Back to shopping
              </Link>
            </Grid>
          )}
        </Container>
        <Divider
          orientation="vertical"
          flexItem
          variant="middle"
          sx={{ backgroundColor: "black" }}
        />


        <Footer />
      </Box>
    </>
  );
};

export default CartPage;
