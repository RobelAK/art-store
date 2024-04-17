import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Container,
  Box,
  Paper,
  Divider,
  Link,
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
      <Box style={{ backgroundColor: "#f0f1f2", minHeight: "100vh" }}>
        <Navbar />
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "100px",
          }}
        >
          {itemsInCart ? (
            <Container>
              <Grid container m={0} spacing={2} direction="column">
                {cartData.map((cartItem, i) => (
                  <Grid key={i} item mt={2}>
                    <Card sx={{ display: "flex" }}>
                      <Link
                        href={`/product/${cartItem.art_id}`}
                        underline="none"
                      >
                        <CardMedia
                          component="img"
                          sx={{ width: 100, margin: 1 ,aspectRatio:4/5 }}
                          src={`http://localhost:8081/images/${cartItem.art}`}
                          alt="Product Image"
                        />
                      </Link>
                      <Divider
                        orientation="vertical"
                        flexItem
                        variant="middle"
                        sx={{ backgroundColor: "black" }}
                      />
                      <CardContent sx={{ flex: 1 }}>
                        <Typography gutterBottom variant="h5" component="div">
                          {cartItem.art_title}
                        </Typography>
                        <Typography>{"by " + cartItem.seller_name}</Typography>
                      </CardContent>
                      <Divider
                        orientation="vertical"
                        flexItem
                        variant="middle"
                        sx={{ backgroundColor: "black" }}
                      />
                      <CardContent sx={{ flex: 1 }}>
                        <Typography
                          variant="h5"
                          component="div"
                          color="text.secondary"
                        >
                          Size
                        </Typography>
                        <Typography>{cartItem.size}</Typography>
                      </CardContent>
                      <Divider
                        orientation="vertical"
                        flexItem
                        variant="middle"
                        sx={{ backgroundColor: "black" }}
                      />
                      <CardContent sx={{ flex: 1 }}>
                        <Typography
                          variant="h5"
                          component="div"
                          color="text.secondary"
                        >
                          Quantity
                        </Typography>
                        <Typography>{cartItem.quantity}</Typography>
                      </CardContent>
                      <Divider
                        orientation="vertical"
                        flexItem
                        variant="middle"
                        sx={{ backgroundColor: "black" }}
                      />
                      <CardContent>
                        <Grid
                          container
                          direction="column"
                          alignItems="flex-end"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Typography variant="h6" color="text.secondary">
                            Price:
                          </Typography>
                          <Typography>
                            {cartItem.price * cartItem.quantity + " birr"}
                          </Typography>
                          <Button
                            variant="outlined"
                            onClick={() => handleRemoveItem(cartItem.id)}
                          >
                            Remove Item
                          </Button>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Grid
                container
                m={2}
                spacing={2}
                direction="column"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Grid
                  item
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="h5">Total Price</Typography>
                  <Typography variant="h6">{totalPrice}</Typography>
                </Grid>
                <Grid item>
                  <Button variant="contained" onClick={handleCheckout}>
                    check out
                  </Button>
                </Grid>
              </Grid>
            </Container>
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
        <Footer />
      </Box>
    </>
  );
};

export default CartPage;
