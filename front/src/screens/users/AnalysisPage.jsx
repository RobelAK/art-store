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
  Divider,
  Link,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Footer from "../../components/users/Footer";
import Navbar from "../../components/users/Navbar";
import { useNavigate } from "react-router-dom";
import Withdrawal from "../../components/users/Withdrawal";



const AnalysisPage = () => {
  const navigate = useNavigate();

  const [cartData, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [itemsInCart, setItemsInCart] = useState(false);
  const [id, setId] = useState("");


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(atob(token.split(".")[1]));
      setId(user.id);

      axios
        .post("http://localhost:8081/sold", { userId: user.id })
        .then((res) => {
          setCartData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

    } else {
      navigate("/login");
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
      totalPrice += item.sales * item.price;
    });
    return totalPrice;
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

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
            <Card sx={{ padding:'30px', marginBottom:'10px'}}>
              <Grid container spacing={2}>
                
                  <Grid item xs={12} justifyContent={"center"} display={'-ms-grid'}>

                    <Typography variant="h5" sx={{ fontFamily: 'Sora', color:'darkblue', fontWeight:'medium' }}>
                      Revenue Summary
                    </Typography>
                    <Typography variant="body2" sx={{ fontFamily: 'Sora'}}>
                      here is your lifetime earnings with the number of artworks sold.
                    </Typography>
                  </Grid>
                  <Grid item sm={12}>
                      
                  <Divider
                orientation="horizontal"
                flexItem
                variant="middle"
                sx={{ backgroundColor: "black" }}
              />
                  </Grid>
                  
                  <Grid item sm={6}>
                      <Typography fontFamily={"sora"} fontWeight={"medium"} variant="subtitle1">
                        Lifetime Earnings 
                      </Typography>
                      <Typography fontFamily={"sora"} variant="body1">
                        $1000
                      </Typography>
                  </Grid>
                  <Grid item sm={6}>
                      <Typography fontFamily={"sora"} fontWeight={"medium"} variant="subtitle1">
                        Lifetime Sold Items
                      </Typography>
                      <Typography fontFamily={"sora"} variant="body1">
                        $2000
                      </Typography>
                  </Grid>
                  </Grid>
                </Card>
              
              <Card>
                <Typography
                  variant="h5"
                  paddingTop="20px"
                  component="div"
                  fontWeight="middle"
                  fontFamily="Sora"
                  textAlign="center">
                  New Sold Arts
                </Typography>
                <Typography
                  variant="body2"
                  paddingBottom="20px"
                  component="div"
                  fontWeight="middle"
                  fontFamily="Sora"
                  textAlign="center">
                  all The arts that have been sold Since your last withdrawal are here
                </Typography>

                {itemsInCart ? (
                  <div>
                    {cartData.map((cartItem, i) => (
                      <Card
                        key={i}
                        sx={{

                          boxShadow: 1,
                          margin: "5px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "white",
                          borderRadius: "5px",
                          padding: "2%",
                        }}
                      >
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={12}>
                            <Grid container>
                              <Grid item md={3}>
                                <Link
                                  to={`/product/${cartItem.art_id}`}
                                  style={{ textDecoration: "none" }}
                                >
                                  <CardMedia
                                    component="img"
                                    sx={{
                                      width: 100,
                                      margin: 1,
                                      aspectRatio: 4 / 6,
                                    }}
                                    src={`http://localhost:8081/images/${cartItem.art}`}
                                    alt="Product Image"
                                  />
                                </Link>
                              </Grid>
                              <Divider
                                orientation="vertical"
                                flexItem
                                variant="middle"
                                sx={{ backgroundColor: "black" }}
                              />
                              <Grid item >
                                <CardContent sx={{ flex: 1 }}>
                                  <Typography
                                    variant="h6"
                                    component="div"
                                    fontWeight="light"
                                    fontFamily="Sora"
                                  >
                                    Title: {cartItem.title}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    component="div"
                                    fontFamily="Sora"
                                  >
                                    sales count: {cartItem.sales}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    component="div"
                                    fontFamily="Sora"
                                  >
                                    Price: {cartItem.price} birr
                                  </Typography>
                                </CardContent>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>

                      </Card>

                    ))}
                  </div>


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
                      You haven't Sold anything yet..
                    </Typography>
                    <Link variant="h6" underline="none" href="/arts">
                      Back to shopping
                    </Link>
                  </Grid>
                )}
              </Card>

            </Grid>

            <Grid item xs={12} md={6}>
              <Withdrawal totalPrice={totalPrice} />
            </Grid>
          </Grid>


        </Container>

        <Footer />
      </Box>
    </>
  );
};

export default AnalysisPage;
