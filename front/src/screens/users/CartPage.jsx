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
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import Footer from "../../components/users/Footer";
import Navbar from "../../components/users/Navbar";
import { useNavigate } from "react-router-dom";

const NAME_VALID = /^[a-zA-Z][a-zA-Z0-9-_/]{3,20}$/;
const PHONE_VALID = /^[0-9]{9}$/;

const CartPage = () => {
  const navigate = useNavigate();
  
  const [openOrdereInfo, setOpenOrderInfo] = useState(false);
  const [location, setLocation] = useState('');
  const [cartData, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [itemsInCart, setItemsInCart] = useState(false);
  const [id, setId] = useState("");
  const [orderedItems, setOrderedItems] = useState([]);

  const [branch, setBranchs] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [fname, setFname] = useState("");
  const [validFname, setValidFname] = useState(false);

  const [lname, setLname] = useState("");
  const [validLname, setValidLname] = useState(false);

  const [phoneNo, setPhoneNo] = useState("");
  const [validPhoneNo, setValidPhoneNo] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(atob(token.split(".")[1]));
      setId(user.id);
      setName(user.name);
      setEmail(user.email);

      axios
        .post("http://localhost:8081/cart", { userId: user.id })
        .then((res) => {
          setCartData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

        axios
        .post("http://localhost:8081/ordereditems", { userId: user.id})
        .then((res) => {
          setOrderedItems(res.data)
        })
        .catch((err) => {
          console.log(err);
        });

    } else {
      navigate("/login");
    }
    axios.get("http://localhost:8081/fetchBranch").then((res) => {
      setBranchs(res.data);
      console.log(res.data);
    });


    
    


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

  useEffect(() => {
    const result = NAME_VALID.test(fname);
    console.log("FName validation: ", result);
    setValidFname(result);
  }, [fname]);
  useEffect(() => {
    const result = NAME_VALID.test(lname);
    console.log("LName validation: ", result);
    setValidLname(result);
  }, [lname]);
  useEffect(() => {
    const result = PHONE_VALID.test(phoneNo);
    console.log("Phone validation: ", result);
    setValidPhoneNo(result);
  }, [phoneNo]);

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartData.forEach((item) => {
      totalPrice += item.quantity * item.price;
    });
    return totalPrice;
  };
  const handleOpenOrderInfo = () => {
    setOpenOrderInfo(true);
  };
  const handleRemoveItem = (id) => {
    axios
      .post("http://localhost:8081/removecartitem", { id: id })
      .then((res) => {
        console.log(res.data);
        setCartData((prevCartData) =>
          prevCartData.filter((cart) => cart.id !== id)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const values = {
    phoneNo: phoneNo,
    cartData: cartData,
    totalPrice: totalPrice,
    user_Id: id,
    email: email,
    location: location,
    fname: fname,
    lname: lname,
  };
  const handleCheckout = (event) => {
    event.preventDefault();

    if (validFname && validLname && validPhoneNo) {
      axios
        .post("http://localhost:8081/payment/pay", values)
        .then((res) => {
          if (res.data.data.checkout_url) {
            window.location.href = res.data.data.checkout_url;
          }
        })
        .catch((err) => console.log(err));
    } else console.log("not good");
  };
  const handleclick =()=>{
    console.log(orderedItems)
  }
  const parseData = (stringifiedData) => {
    try {
      return JSON.parse(stringifiedData);
    } catch (error) {
      console.error("Error parsing data:", error);
      return [];
    }
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
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                {cartData.map((cartItem, i) => (
                  <Card
                    key={i}
                    sx={{
                      boxShadow: 1,
                      marginBottom: "5px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "white",
                      borderRadius: "5px",
                      padding: 1,
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={8}>
                        <Grid container>
                          <Grid item>
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
                          <Grid item>
                            <CardContent sx={{ flex: 1 }}>
                              <Typography
                                variant="h6"
                                component="div"
                                fontWeight="light"
                                fontFamily="Sora"
                                textAlign="center"
                              >
                                Title: {cartItem.art_title}
                              </Typography>
                              <Typography
                                variant="body2"
                                component="div"
                                fontWeight="bold"
                                fontFamily="Sora"
                                mb={2}
                              >
                                Art by: {cartItem.seller_name}
                              </Typography>
                              <Typography
                                variant="body2"
                                component="div"
                                fontFamily="Sora"
                              >
                                Size: {cartItem.size}
                              </Typography>
                              <Typography
                                variant="body2"
                                component="div"
                                fontFamily="Sora"
                              >
                                Quantity: {cartItem.quantity}
                              </Typography>
                              <Typography
                                variant="body2"
                                component="div"
                                fontFamily="Sora"
                              >
                                Price: {cartItem.price * cartItem.quantity} birr
                              </Typography>
                            </CardContent>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item sm={12} md={4}>
                        <Button
                          variant="text"
                          sx={{ color: "red", marginTop: "30%" }}
                          onClick={() => handleRemoveItem(cartItem.id)}
                        >
                          Remove Item
                        </Button>
                      </Grid>
                    </Grid>
                  </Card>
                ))}
              </Grid>

              <Grid item xs={12} md={6}>
                <Container>
                  <Card
                    sx={{
                      boxShadow: 1,
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "white",
                      borderRadius: "5px",
                      padding: 5,
                    }}
                  >
                    <Box sx={{ mt: 1 }}>
                      <CardContent>
                        <Typography
                          variant="h6"
                          component="div"
                          fontFamily="Sora, sans-serif"
                          textAlign="center"
                        >
                          Checkout Here
                        </Typography>
                        <Typography
                          variant="body2"
                          component="div"
                          fontFamily="Sora, sans-serif"
                          textAlign="center"
                        >
                          Total Cart Items
                        </Typography>
                      </CardContent>
                      <Grid container rowSpacing={2}>
                        <Grid item xs={12}>
                          <Grid container direction={"row"}>
                            <Grid item xs={6}>
                              <Typography
                                variant="body2"
                                fontWeight="bold"
                                component="div"
                                fontFamily="Sora, sans-serif"
                                textAlign="center"
                              >
                                Title
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography
                                variant="body2"
                                fontWeight="bold"
                                component="div"
                                fontFamily="Sora, sans-serif"
                                marginBottom={"5px"}
                                textAlign="center"
                              >
                                Price
                              </Typography>
                            </Grid>
                          </Grid>

                          {cartData.map((cartItem, i) => (
                            <Grid container direction={"row"} key={i}>
                              <Grid item xs={8}>
                                <Typography
                                  variant="body2"
                                  component="div"
                                  fontFamily="Sora, sans-serif"
                                >
                                  {cartItem.art_title}
                                </Typography>
                              </Grid>
                              <Grid item xs={4}>
                                <Typography
                                  variant="body2"
                                  component="div"
                                  fontFamily="Sora, sans-serif"
                                  textAlign="center"
                                >
                                  {cartItem.price} ETB
                                </Typography>
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
                                <Typography
                                  variant="body2"
                                  color="darkblue"
                                  fontWeight="bold"
                                  component="div"
                                  fontFamily="Sora, sans-serif"
                                >
                                  Total Price
                                </Typography>
                              </Grid>
                              <Grid item xs={4}>
                                <Typography
                                  variant="body2"
                                  color="darkblue"
                                  fontWeight="bold"
                                  component="div"
                                  fontFamily="Sora, sans-serif"
                                  textAlign="center"
                                >
                                  {totalPrice} ETB
                                </Typography>
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
                        <Typography
                          variant="h6"
                          component="div"
                          fontFamily="Sora, sans-serif"
                          textAlign="center"
                        >
                          Pay With Chapa
                        </Typography>
                        <Typography
                          variant="body2"
                          component="div"
                          fontFamily="Sora, sans-serif"
                          textAlign="center"
                        >
                          Fill The Form Correctly
                        </Typography>
                      </CardContent>

                      <Box component="form" onSubmit={handleCheckout}>
                        <Grid container rowSpacing={1}>
                          <Grid item xs={12}>
                            <TextField
                              type="text"
                              required
                              fullWidth
                              size="small"
                              id="first_name"
                              label="First Name"
                              name="first_name"
                              onChange={(e) => setFname(e.target.value)}
                              helperText={
                                !validFname &&
                                fname &&
                                "Name must start with letter, must be between 3 to 20 characters long and can't contain space"
                              }
                              error={!validFname && fname}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              type="text"
                              size="small"
                              required
                              fullWidth
                              id="last_name"
                              label="Last Name"
                              name="last_name"
                              onChange={(e) => setLname(e.target.value)}
                              helperText={
                                !validLname &&
                                lname &&
                                "Name must start with letter, must be between 3 to 20 characters long and can't contain space"
                              }
                              error={!validLname && lname}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              type="email"
                              required
                              fullWidth
                              size="small"
                              id="email"
                              label="Email Address"
                              name="email"
                              value={email}
                              disabled
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              type="tel"
                              required
                              fullWidth
                              size="small"
                              id="phone_number"
                              label="Phone Number"
                              name="phone_number"
                              onChange={(e) => setPhoneNo(e.target.value)}
                              InputProps={{
                                startAdornment: "+251",
                              }}
                              inputProps={{
                                maxLength: 9,
                              }}
                              helperText={
                                !validPhoneNo &&
                                phoneNo &&
                                "phone_no must contain 9 numbers"
                              }
                              error={!validPhoneNo && phoneNo}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <FormControl fullWidth>
                              <InputLabel>Location</InputLabel>
                              <Select
                                label="Location"
                                onChange={(e) => setLocation(e.target.value)}
                                fullWidth
                                required
                                value={location}
                              >
                                {branch.map((branch) => (
                                  <MenuItem key={branch.id} value={branch.name}>
                                    {branch.name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12}>
                            <Button
                              fullWidth
                              type="submit"
                              variant="contained"
                              sx={{
                                marginTop: "10px",
                                bgcolor: "darkblue",
                                color: "white",
                              }}
                            >
                              Pay
                            </Button>
                          </Grid>
                        </Grid>
                      </Box>
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
        <Button variant="contained" onClick={handleOpenOrderInfo}>
          Order information
        </Button>
        <Footer />
      </Box>
      <Dialog open={openOrdereInfo} onClose={() => setOpenOrderInfo(false)}>
        <DialogTitle>Ordered Items</DialogTitle>
        <DialogContent>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Container>
              {orderedItems.map((items, i) => (
                <Grid container key={i} spacing={2}>
                  {parseData(items.data).map((item, j) => (
                    <Card key={j} sx={{ display: 'flex'}}>
                      <CardMedia
                        component="img"
                        sx={{
                          width: 70,
                          margin: 1,
                          aspectRatio: 4 / 6,
                        }}
                        src={`http://localhost:8081/images/${item.art}`}
                        alt="Product Image"
                      />
                      <CardContent>
                        {item.art_title}
                        <Typography>Size: {item.size}</Typography>
                        <Typography>Status: {items.print_status}</Typography>
                        {/* <Typography>Estimated date: 5d</Typography> */}
                      </CardContent>
                    </Card>
                  ))}
                </Grid>
              ))}
            </Container>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CartPage;
