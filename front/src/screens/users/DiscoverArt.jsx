import React from "react";
import Navbar from "../../components/users/Navbar";
import Footer from "../../components/users/Footer"
import ArtDiscoveryPage from "../../components/users/ArtDiscoveryPage";
import DiscoveryTitle from "../../components/users/DiscoveryTitle";
import {  Container, CssBaseline, } from "@mui/material";


function DiscoverArt() {
  return (

    <>
      <CssBaseline />
      <Container sx={{ height: '80px', overflow: 'hidden' }} />
      <Navbar />     
      <DiscoveryTitle />     
      <Container sx={{ height: '2px', bgcolor: '#e3e3e3', marginTop: '18px', marginBottom: '15px' }} />
      <ArtDiscoveryPage />
      <Container sx={{ height: '10px', color: '#e3e3e3' }} />
      <Container sx={{ height: '2px', bgcolor: '#e3e3e3', marginTop: '18px', marginBottom: '15px' }} />
      <Footer />
    </>


  )
}

export default DiscoverArt