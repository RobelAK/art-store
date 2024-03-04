// App.js
import React from 'react';
import Hero from '../../components/users/Hero';
import Navbar from '../../components/users/Navbar';
import FAQ from '../../components/users/FAQ';
import Features from '../../components/users/Features';
import Testimonials from '../../components/users/Testimonials';
import Highlights from '../../components/users/Highlights'
import Footer from '../../components/users/Footer';
import AboutUs from '../../components/users/AboutUs';
import FeaturedArtwork from '../../components/users/FeaturedArtwork'
import { Container, CssBaseline, colors } from '@mui/material';

const Landingpage = () => {
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
  );
};

export default Landingpage;
