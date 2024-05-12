import React, { useEffect, useState } from "react";
import Navbar from "../../components/users/Navbar";
import {
  Container,
  CssBaseline,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  ButtonGroup,
  Button,
  Divider,
  CardMedia,
} from "@mui/material";
import Footer from "../../components/users/Footer";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RatingComponent from "./RatingComponent";

function Product() {
  const [artInfo, setArtInfo] = useState([]);
  const [sellerInfo, setSellerInfo] = useState("");
  const [size, setSize] = useState("small");
  const [quantity, setQuantity] = useState(1);
  const [userid, setUserId] = useState("");
  const [color, setColor] = useState("green");
  const [selectedButton, setSelectedButton] = useState("small");
  const id = useParams();
  const [message, setMessage] = useState("");
  const [artPrice, setArtPrice] = useState(0);
  const [priceSmall, setPriceSmall] = useState(0);
  const [priceMedium, setPriceMedium] = useState(0);
  const [priceLarge, setPriceLarge] = useState(0);
  const [price, setPrice] = useState(0);

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(atob(token.split(".")[1]));
      setUserId(user.id);
    }

    axios
      .post("http://localhost:8081/product", id)
      .then((res) => {
        setArtInfo(res.data.artInfo);
        setArtPrice(res.data.artInfo.price);
        setSellerInfo(res.data.sellerinfo);
        axios
          .get("http://localhost:8081/price")
          .then((result) => {
            setPriceSmall(result.data[0].Price);
            setPriceMedium(result.data[1].Price);
            setPriceLarge(result.data[2].Price);
            setPrice(res.data.artInfo.price+result.data[0].Price)
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSizeChange = (size) => {
    setSelectedButton(size);
    setSize(size);
    if (size == "small") {
      setPrice(artPrice + priceSmall);
    }
    if (size == "medium") {
      setPrice(artPrice + priceMedium);
    }
    if (size == "large") {
      setPrice(artPrice + priceLarge);
    }
  };

  const handleIncrement = () => {
    if (quantity === 3) setQuantity(3);
    else setQuantity((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    if (quantity === 1) setQuantity(1);
    else setQuantity((prevCount) => prevCount - 1);
  };

  const handleAddToCart = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const values = {
        sellerName: sellerInfo.name,
        artTitle: artInfo.title,
        art: artInfo.art,
        artId: artInfo.id,
        userId: userid,
        artPrice: artInfo.price,
        quantity: quantity,
        size: size,
      };
      axios
        .post("http://localhost:8081/addtocart", values)
        .then((res) => {
          setMessage(res.data);
          setTimeout(() => {
            setMessage("");
          }, 2000);
          if (res.data == "Item already in cart") {
            setColor("#f07971");
          } else setColor("#1976d2");
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      navigate("/login");
    }
  };

  if (!artInfo || !sellerInfo) {
    return <div>Loading...</div>;
  }

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
        <Grid container>
          <Grid item xs={12} md={7}>
            <Card
              sx={{
                width: "100%",
                height: "100%",
                backgroundImage: "linear-gradient(to bottom, #dbe4f0, #f0f4f7)",
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
                src={`http://localhost:8081/images/${artInfo.art}`}
                sx={{
                  maxWidth:
                    selectedButton == "small"
                      ? "200px"
                      : selectedButton == "medium"
                      ? "260px"
                      : "340px",
                  aspectRatio: "4/5",
                  boxShadow: "0px 30px 40px rgba(0, 7, 88, 0.8)",
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
                backgroundImage: "linear-gradient(to bottom, #dbe4f0, #f0f4f7)",
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
                    {artInfo.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    fontFamily={"sora,sans-serif"}
                    color="text.secondary"
                    gutterBottom
                  >
                    by {sellerInfo.name}
                  </Typography>
                  <Divider />
                  <Typography
                    variant="body2"
                    fontWeight={"light"}
                    fontFamily={"sora,sans-serif"}
                    paragraph
                  >
                    {artInfo.description}
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
                      variant={
                        selectedButton == "small" ? "contained" : "outlined"
                      }
                      onClick={() => handleSizeChange("small")}
                    >
                      8x10
                    </Button>
                    <Button
                      variant={
                        selectedButton == "medium" ? "contained" : "outlined"
                      }
                      onClick={() => handleSizeChange("medium")}
                    >
                      10x12
                    </Button>
                    <Button
                      variant={
                        selectedButton == "large" ? "contained" : "outlined"
                      }
                      onClick={() => handleSizeChange("large")}
                    >
                      12x16
                    </Button>
                  </ButtonGroup>

                  <Box
                    sx={{
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      onClick={handleDecrement}
                      variant="outlined"
                      sx={{ p: 0 }}
                    >
                      -
                    </Button>
                    <Card sx={{ width: 100, background: "transparent" }}>
                      {quantity}
                    </Card>
                    <Button
                      onClick={handleIncrement}
                      variant="outlined"
                      sx={{ p: 0 }}
                    >
                      +
                    </Button>
                  </Box>
                  <Box sx={{ alignContent: "center", mb: 2 }}>
                    <RatingComponent art_id={artInfo.id} user_id={userid} />
                  </Box>
                  <Typography
                    variant="h6"
                    fontFamily={"sora,sans-serif"}
                    gutterBottom
                  >
                    Price : {price} birr
                  </Typography>

                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddShoppingCartIcon />}
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </Button>
                  <Typography color={color}>{message}</Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Footer />
    </>
  );
}

export default Product;
