import React, { useEffect, useState } from "react";
import Navbar from "../../components/users/Navbar";
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
import Footer from "../../components/users/Footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


function Product() {
  const [artInfo, setArtInfo] = useState([]);
  const [selectedButton, setSelectedButton] = useState(1);
  const [rating, setRating] = useState(4);
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
  };

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleAddToCart = () => {
    console.log('Product added to cart!');
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
                <Card sx={{
                  width: '100%',
                  height: '100%',
                  backgroundImage: 'linear-gradient(to bottom, #dbe4f0, #f0f4f7)',
                  color: 'transparent',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'none',
                }}>
                  <CardMedia
                    component="img"
                    alt="Artwork Preview"
                    height="auto"
                    src={`http://localhost:8081/images/${item.art}`}
                    sx={{
                      maxWidth: selectedButton === 1 ? '200px' : selectedButton === 2 ? '260px' : '340px',
                      aspectRatio: '4/5',
                      boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.3)',
                      borderRadius: '4px',
                      padding: '0.1%',
                      marginTop: '8%',
                      marginRight: '8%',
                      marginLeft: '8%',
                      marginBottom: '8%',
                      transition: 'max-width 0.3s ease-in-out',
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
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    display: 'flex',
                    paddingTop: '5.7%',
                    paddingBottom: '5.6%',
                    paddingRight: { xs: 0, md: '34.6%' },
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundImage: 'linear-gradient(to bottom, #dbe4f0, #f0f4f7)',
                    '@media (max-width: 600px)': {
                      padding: 0,
                      margin: 0,
                    },
                  }}
                >
                  <Card
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.5)',
                      borderRadius: '8px',
                      p: 2,
                      textAlign: 'center',
                      width: '100%',
                      m: 0,
                    }}
                  >
                    <CardContent>
                      <Typography variant="h4" fontFamily={'sora,sans-serif'}>
                        {item.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        fontFamily={'sora,sans-serif'}
                        color="text.secondary"
                        gutterBottom
                      >
                        by {item.artist}
                      </Typography>
                      <Divider />
                      <Typography
                        variant="body2"
                        fontWeight={'light'}
                        fontFamily={'sora,sans-serif'}
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
                          display: 'flex',
                          flexDirection: { xs: 'column', sm: 'row' },
                          alignItems: 'center',
                        }}
                      >
                        <Button
                          variant="outlined"
                          onClick={() => {
                            handleButtonClick(1);
                          }}
                          disabled={selectedButton === 1}
                        >
                          M 45*32cm
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => {
                            handleButtonClick(2);
                          }}
                          disabled={selectedButton === 2}
                        >
                          L 67.5*48cm
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => {
                            handleButtonClick(3);
                          }}
                          disabled={selectedButton === 3}
                        >
                          XL 90*64cm
                        </Button>
                      </ButtonGroup>
                      <Typography
                        variant="h5"
                        fontFamily={'sora,sans-serif'}
                        gutterBottom
                      >
                        Price : {item.price} birr
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 2,
                        }}
                      >
                        <Typography
                          variant="h6"
                          component="span"
                          sx={{ mr: 1 }}
                        >
                          Rating:
                        </Typography>
                        <Rating
                          name="product-rating"
                          value={rating}
                          onChange={handleRatingChange}
                          precision={0.5}
                          sx={{ ml: 1 }}
                        />
                        <Typography variant="subtitle2" color="text.secondary" sx={{ ml: 1 }}>
                          {rating}/5
                        </Typography>
                      </Box>

                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddShoppingCartIcon />}
                        onClick={handleAddToCart}
                      >
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
            </Grid>
          </div>
        ))}
      </Box>
      <Typography
        variant="body2"
        color="GrayText"
        fontFamily="sora,sans-serif"
        align="center"
        gutterBottom
        marginTop="2%"
      >
        MORE FROM THE ARTIST
      </Typography>
      {/* <PostedArt/> */}
      <Footer/>
    </>
  );
}

export default Product;
