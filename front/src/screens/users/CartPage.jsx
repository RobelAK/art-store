import React from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Container,
  Box
} from "@mui/material";
import Footer from "../../components/users/Footer";
import Navbar from "../../components/users/Navbar";
import { Link } from "react-router-dom";


const CartPage = () => {

  return (
    <>
      <Box style={{ backgroundColor: "#f0f1f2" }}>
        <Navbar />

        <Grid container  spacing={2} sx={{background:'green', minHeight: '100vh', marginTop: 10,padding: 1}}>
          <Grid item  sx={{width: '100%', background:'red'}}>
            <Card sx={{
              backgroundColor: '#808080',
              width: 'auto',
              height: 100,
            }}>
            </Card>
          </Grid>
          <Grid item md={3} lg={2}>
            <Card sx={{
              backgroundColor: '#808080',
              width: 'auto',
              height: 200,
            }}>
              
            </Card>
          </Grid>
        </Grid>
        
      </Box>
    </>
  );
};

export default CartPage;
