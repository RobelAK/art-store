import React from 'react'
import Hero from '../../components/users/Hero'
import Navbar from '../../components/users/Navbar'
import FeaturedArtwork from '../../components/users/FeaturedArtwork'
import Features from '../../components/users/Features'
import FAQ from '../../components/users/FAQ';
import Footer from '../../components/users/Footer';
import AboutUs from '../../components/users/AboutUs';
import { Container, CssBaseline, Divider } from '@mui/material';
import Category from '../../components/users/Category'


function Landingpage() {
  return (
    <div style={{backgroundColor:'#f0f1f2'}}>
      <CssBaseline />
      <Navbar />
      <Container sx={{ height: '20px', maxWidth: '325px', bgcolor: '#fffff' }}></Container>
      <Hero />
      <Divider/>
      <FeaturedArtwork />
      <Container sx={{ height: '120px', maxWidth: '325px', bgcolor: '#fffff' }}></Container>
      <Category/>
      <Features />
      <AboutUs />
      <FAQ />
      <Footer />

    </div>
  )
}

export default Landingpage