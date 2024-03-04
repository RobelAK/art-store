import React from "react";
import Navbar from "../../components/users/Navbar";
import Footer from "../../components/users/Footer"
import ArtDiscoveryPage from "../../components/users/ArtDiscoveryPage";
import DiscoveryTitle from "../../components/users/DiscoveryTitle";
import { AppBar, Box, Card, CardActions, CardContent, CardMedia, Container, CssBaseline, Grid, Toolbar, Typography } from "@mui/material";


const DiscoverArt = () => {
  return (
    
    <>
      <CssBaseline />
      <Container sx={{ height: '108px', overflow: 'hidden' }} />
      <Navbar />
      <DiscoveryTitle />
      <ArtDiscoveryPage />
      <Container sx={{ height: '35px', color: 'gray' }} />
      <Container sx={{ height: '5px', bgcolor: 'lightgrey', marginTop: '18px', marginBottom: '15px' }} />
      <Footer />
    </>


  )
}

export default DiscoverArt