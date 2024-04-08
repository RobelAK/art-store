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
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(atob(token.split(".")[1]));
      axios
        .post("http://localhost:8081/cart", {userId: user.id })
        .then((res) => {
          setCartItems(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("token not available");
    }
  }, []);

  const handleRemoveItem = (id)=>{
    axios
    .post("http://localhost:8081/removecartitem", id)
    .then((res) => {
      console.log(res.data)
    })
    .catch((err) => {
      console.log(err);
    });
  }



  return (
    <>

      <Box style={{ backgroundColor: "#f0f1f2", minHeight: '100vh' }}>
        <Navbar />
        <Container
          sx={{
            background: "",
            padding: 0,
            display: "flex",
            alignItems: "center",
            paddingTop: "100px",
          }}
        >
          <Grid
            container
            m={0}
            spacing={2}
            direction="column"
          >
            {cartItems.map((cartItem, i) => (
              <Grid key={i} item mt={2}>
                  <Card sx={{ display: "flex"}}>
                  <Link  href= {`/product/${cartItem.art_id}`} underline="none">
                    <CardMedia
                      component="img"
                      sx={{ width: 100, margin: 1 }}
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
                      <Typography>
                        {"by "+ cartItem.seller_name}
                      </Typography>
                    </CardContent>
                    <Divider
                      orientation="vertical"
                      flexItem
                      variant="middle"
                      sx={{ backgroundColor: "black" }}
                    />
                    <CardContent sx={{ flex: 1 }}>
                      <Typography variant="h5" component="div"  color="text.secondary">
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
                      <Typography variant="h5" component="div"  color="text.secondary">
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
                          {cartItem.price *cartItem.quantity + " birr"}
                        </Typography>
                        <Button variant="outlined" onClick={() => handleRemoveItem(cartItem.id)}>Remove Item</Button>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default CartPage;
