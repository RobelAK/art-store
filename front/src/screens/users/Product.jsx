import React from 'react'
import ProductPreview from '../../components/users/ProductPreview'
import Navbar from '../../components/users/Navbar'
import { Container, CssBaseline, Grid, Stack, Typography } from '@mui/material'
import Footer from '../../components/users/Footer'
import PostedArt from '../../components/users/PostedArt'


function Product() {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Container sx={{ height: '55px', overflow: 'hidden' }} />
      <ProductPreview />
      <Typography variant='body2' color='GrayText' fontFamily='sora,sans-serif' align='center' gutterBottom marginTop='2%'>
        MORE FROM THE ARTIST
      </Typography>
      <PostedArt/>
      <Footer/>
    </>
  )
}

export default Product