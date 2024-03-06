import React from 'react'
import Hero from '../../components/users/Hero'
import Navbar from '../../components/users/Navbar'
import FeaturedArtwork from '../../components/users/FeaturedArtwork'
import Features from '../../components/users/Features'
import FAQ from '../../components/users/FAQ';
import Testimonials from '../../components/users/Testimonials';
import Highlights from '../../components/users/Highlights'
import Footer from '../../components/users/Footer';
import AboutUs from '../../components/users/AboutUs';
import { Container, CssBaseline } from '@mui/material';


function Landingpage() {
  return (
    <div>
      <CssBaseline/>
      <Navbar />
      <Container sx={{ height: '55px', bgcolor: '#fffff' }}></Container>
      <Hero />
      <Container sx={{ width: '120px', height: '8px', bgcolor: '#d0d2d4' }}></Container>
      <FeaturedArtwork />
      <Features />
      <Highlights />
      <Testimonials />
      <AboutUs />
      <FAQ />
      <Footer />

    </div>
  )
}

export default Landingpage