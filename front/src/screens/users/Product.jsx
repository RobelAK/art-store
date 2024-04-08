import React, { useState, useEffect } from "react";
import Navbar from "../../components/users/Navbar";
import Footer from "../../components/users/Footer";
import {
  Container,
  CssBaseline,
  Grid,
  Stack,
  Typography,
  Box,
  Card,
  CardContent,
  ButtonGroup,
  Button,
  Divider,
  CardMedia,
  Rating
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

function Product() {
  const [artInfo, setArtInfo] = useState([]);
  const [selectedButton, setSelectedButton] = useState(1);
  const [rating, setRating] = useState(4);
  const [price, setPrice] = useState(0); // State to store the calculated price
  const id = useParams();

  useEffect(() => {
    axios
      .post("http://localhost:8081/product", id)
      .then((res) => {
        setArtInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleButtonClick = (buttonNumber) => {
    setSelectedButton(buttonNumber);
    // Calculate the price when the button is clicked
    const selectedSize = getSizeFromButtonNumber(buttonNumber);
    const calculatedPrice = calculatePrice(selectedSize);
    setPrice(calculatedPrice);
  };

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const calculatePrice = (selectedSize) => {
    const basePrice = artInfo[0]?.price || 0;

    switch (selectedSize) {
      case "8x10":
        return basePrice + 500;
      case "10x12":
        return basePrice + 1000;
      case "12x16":
        return basePrice + 1500;
      default:
        return basePrice + 500;
    }
  };

  const getSizeFromButtonNumber = (buttonNumber) => {
    switch (buttonNumber) {
      case 1:
        return "8x10";
      case 2:
        return "10x12";
      case 3:
        return "12x16";
      default:
        return "8x10";
    }
  };

  const handleAddToCart = (item) => {
    const selectedSize = getSizeFromButtonNumber(selectedButton);
    const calculatedPrice = calculatePrice(selectedSize);

    // Retrieve user's token from local storage
    const token = localStorage.getItem('token');

    // Decode the token to extract the identifier (e.g., id)
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const id = decodedToken.id;

    console.log("Decoded ID:", id); // Log the decoded ID

    const artToAdd = {
      id: item.id,
      title: item.title,
      artist: item.artist,
      description: item.description,
      size: selectedSize,
      price: calculatedPrice,
      art: item.art,
    };

    // Retrieve existing cart items or initialize an empty array
    const storedCartItems = JSON.parse(localStorage.getItem(id)) || [];

    // Add the new item to the cart
    const updatedCartItems = [...storedCartItems, artToAdd];

    // Save the updated cart items back to local storage
    localStorage.setItem(id, JSON.stringify(updatedCartItems));

    console.log("Art added to cart:", artToAdd);
  };


  return (
    <>
      <CssBaseline />
      <Navbar />
      <Container sx={{ height: "55px", overflow: "hidden" }} />
      <Box
        sx={{
          boxShadow: "inherit",
          backgroundImage: "linear-gradient(to bottom, #dbe4f0, #f0f4f7)",
        }}
      >
        {artInfo.map((item) => (
          <div key={item.id}>
            <Grid container>
              <Grid item xs={12} md={7}>
                <Card
                  sx={{
                    width: "100%",
                    height: "100%",
                    backgroundImage:
                      "linear-gradient(to bottom, #dbe4f0, #f0f4f7)",
                    color: "transparent",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "none",
                  }}
                >
                  <CardMedia
                    component="img"
                    alt="Artwork Preview"
                    height="auto"
                    src={`http://localhost:8081/images/${item.art}`}
                    sx={{
                      maxWidth:
                        selectedButton === 1
                          ? "200px"
                          : selectedButton === 2
                            ? "260px"
                            : "340px",
                      aspectRatio: "4/5",
                      boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.3)",
                      borderRadius: "4px",
                      padding: "0.1%",
                      marginTop: "8%",
                      marginRight: "8%",
                      marginLeft: "8%",
                      marginBottom: "8%",
                      transition: "max-width 0.3s ease-in-out",
                    }}
                  />
                </Card>
              </Grid>
              <Grid
                item
                xs={12}
                md={5}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    display: "flex",
                    paddingTop: "5.7%",
                    paddingBottom: "5.6%",
                    paddingRight: { xs: 0, md: "34.6%" },
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundImage:
                      "linear-gradient(to bottom, #dbe4f0, #f0f4f7)",
                    "@media (max-width: 600px)": {
                      padding: 0,
                      margin: 0,
                    },
                  }}
                >
                  <Card
                    sx={{
                      backgroundColor: "rgba(255, 255, 255, 0.5)",
                      borderRadius: "8px",
                      p: 2,
                      textAlign: "center",
                      width: "100%",
                      m: 0,
                    }}
                  >
                    <CardContent>
                      <Typography variant="h4" fontFamily={"sora,sans-serif"}>
                        {item.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        fontFamily={"sora,sans-serif"}
                        color="text.secondary"
                        gutterBottom
                      >
                        by {item.artist}
                      </Typography>
                      <Divider />
                      <Typography
                        variant="body2"
                        fontWeight={"light"}
                        fontFamily={"sora,sans-serif"}
                        paragraph
                      >
                        {item.description}
                      </Typography>
                      <Divider />
                      <Typography variant="body2" fontWeight="bold">
                        Available Sizes
                      </Typography>
                      <ButtonGroup
                        sx={{
                          mb: 2,
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          variant={selectedButton === 1 ? "contained" : "outlined"}
                          onClick={() => handleButtonClick(1)}
                        >
                          8x10
                        </Button>
                        <Button
                          variant={selectedButton === 2 ? "contained" : "outlined"}
                          onClick={() => handleButtonClick(2)}
                        >
                          10x12
                        </Button>
                        <Button
                          variant={selectedButton === 3 ? "contained" : "outlined"}
                          onClick={() => handleButtonClick(3)}
                        >
                          12x16
                        </Button>
                      </ButtonGroup>
                      <Box>
                        <Rating
                          name="rating"
                          value={rating}
                          onChange={handleRatingChange}
                        />
                      </Box>
                      <Box>
                        <Typography variant="body2" fontWeight="bold">
                          Price: {price}
                        </Typography>
                      </Box>
                      <Stack spacing={2} mt={2}>
                        <Button
                          variant="contained"
                          onClick={() => handleAddToCart(item)}
                          startIcon={<AddShoppingCartIcon />}
                        >
                          Add to Cart
                        </Button>
                      </Stack>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
            </Grid>
          </div>
        ))}
      </Box>
      <Footer />
    </>
  );
}

export default Product;
