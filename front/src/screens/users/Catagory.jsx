import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import animal from "../../utils/animal.jpg";
import steam from "../../utils/steam.jpg";
import nature from "../../utils/nature.jpg";
import art1 from "../../utils/art1.jpg"
import art3 from "../../utils/art3.jpg"
import art4 from "../../utils/art4.jpg"
import art5 from "../../utils/art5.jpg"
import art6 from "../../utils/art6.jpg"
import art7 from "../../utils/art7.jpg"
import { Box, Container, Divider, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import Navbar from '../../components/users/Navbar';
import Footer from '../../components/users/Footer';

export default function Category() {
  return (
    <div >
      <Navbar/>
      <Box sx={{
        backgroundColor: '#e4eaed',
        paddingY: 4,
        
        alignItems: 'center',
      }}>
      <Container sx={{ height: '100px',  }}></Container>
      <Typography variant="h5" component="div" fontFamily="sora,sans-serif" textAlign="center">
        Avilable Category's
      </Typography>
      <Divider orientation="horizontal" flexItem variant="middle" sx={{ backgroundColor: "black", margin:'10px' }} />
      <Container  sx={{alignItems:'center'  }}>

      <Grid container spacing={4} >
        
      <Grid item sm={12} md={5}
          sx={{
            textDecoration: 'none',

          }} component={Link}  to='/arts' >
          <Card sx={{
            height:"300px",
            borderRadius: '10px',
            overflow: 'hidden',
            position: 'relative',
            transition: 'transform 0.3s',
            '&:hover': {
              transform: 'scale(1.05)',
              zIndex: 1,
            },
          }}>
            <CardMedia
              component="img"
              alt=''
              sx={{ padding: '5px',borderRadius: '10px', }}
              height="175"
              image={animal}
            />
            <CardContent>
              <Typography  component="div" fontWeight="bold" color={'Highlight'} fontFamily="Sora" mb={2}>
                Animals
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lose yourself in the intricate patterns of a jungle cat's fur or marvel at the ethereal glow of a bioluminescent jellyfish.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item sm={12} md={4} 
        sx={{textDecoration: 'none',}} component={Link}  to='/arts' >
          <Card sx={{
            height:"300px",
            color: '#d1d1d1',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '2',
            position: 'relative',
            transition: 'transform 0.3s',
            '&:hover': {
              transform: 'scale(1.05)',
              zIndex: 1,
            },
          }}>
            
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Explore a spectrum of styles and techniques, from realistic renderings to fantastical interpretations.
              </Typography>
              <Typography component="div" fontWeight="bold" color={'Highlight'} fontFamily="Sora" mt={2}>
                Nature
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              alt=''
              sx={{ padding: '5px',borderRadius: '10px', }}
              height="185"
              image={art3}
            />
          </Card>
        </Grid>

        <Grid item sm={12} md={3}
          sx={{textDecoration: 'none',}} component={Link}  to='/arts' >
          <Card sx={{
            height:"300px",
            color: '#d1d1d1',
            borderRadius: '10px',
            overflow: 'hidden',
            position: 'relative',
            transition: 'transform 0.3s',
            '&:hover': {
              transform: 'scale(1.05)',
              zIndex: 1,
            },
          }}>
            <CardMedia
              component="img"
              alt=''
              sx={{ padding: '5px' ,borderRadius: '10px', }}
              height="140"
              image={steam}
            />
            <CardContent>
              <Typography component="div" fontWeight="bold" color={'Highlight'} fontFamily="Sora" mb={2}>
                Steampunk
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Marvel at the intricate details of fantastical contraptions, where gears interlock with precision and steam engines hum with life.
              </Typography>
            </CardContent>
            
          </Card>
        </Grid>

        <Grid item sm={12} md={3}
          sx={{textDecoration: 'none',}} component={Link}  to='/arts' >
          <Card sx={{
            height:"300px",
            color: '#d1d1d1',
            borderRadius: '10px',
            overflow: 'hidden',
            position: 'relative',
            transition: 'transform 0.3s',
            '&:hover': {
              transform: 'scale(1.05)',
              zIndex: 1,
            },
          }}>
            <CardMedia
              component="img"
              alt=''
              sx={{ padding: '5px' ,borderRadius: '10px', }}
              height="140"
              image={art1}
            />
            <CardContent>
              <Typography component="div" fontWeight="bold" color={'Highlight'} fontFamily="Sora" mb={2}>
                Concept Art
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Marvel at the intricate details of fantastical contraptions, where gears interlock with precision and steam engines hum with life.
              </Typography>
            </CardContent>
            
          </Card>
        </Grid>

        <Grid item sm={12} md={5}
          sx={{
            textDecoration: 'none',

          }} component={Link}  to='/arts' >
          <Card sx={{
            height:"300px",
            borderRadius: '10px',
            overflow: 'hidden',
            position: 'relative',
            transition: 'transform 0.3s',
            '&:hover': {
              transform: 'scale(1.05)',
              zIndex: 1,
            },
          }}>
            <CardMedia
              component="img"
              alt=''
              sx={{ padding: '5px',borderRadius: '10px', }}
              height="175"
              image={art7}
            />
            <CardContent>
              <Typography  component="div" fontWeight="bold" color={'Highlight'} fontFamily="Sora" mb={2}>
                Cyberpunk
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lose yourself in the intricate patterns of a jungle cat's fur or marvel at the ethereal glow of a bioluminescent jellyfish.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={12} md={4} 
        sx={{textDecoration: 'none',}} component={Link}  to='/arts' >
          <Card sx={{
            height:"300px",
            color: '#d1d1d1',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '2',
            position: 'relative',
            transition: 'transform 0.3s',
            '&:hover': {
              transform: 'scale(1.05)',
              zIndex: 1,
            },
          }}>
            
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Explore a spectrum of styles and techniques, from realistic renderings to fantastical interpretations.
              </Typography>
              <Typography component="div" fontWeight="bold" color={'Highlight'} fontFamily="Sora" mt={2}>
                Landscape
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              alt=''
              sx={{ padding: '5px',borderRadius: '10px', }}
              height="185"
              image={nature}
            />
          </Card>
        </Grid>


        <Grid item sm={12} md={4} 
        sx={{textDecoration: 'none',}} component={Link}  to='/arts' >
          <Card sx={{
            height:"300px",
            color: '#d1d1d1',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '2',
            position: 'relative',
            transition: 'transform 0.3s',
            '&:hover': {
              transform: 'scale(1.05)',
              zIndex: 1,
            },
          }}>
            
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Explore a spectrum of styles and techniques, from realistic renderings to fantastical interpretations.
              </Typography>
              <Typography component="div" fontWeight="bold" color={'Highlight'} fontFamily="Sora" mt={2}>
                Surreal
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              alt=''
              sx={{ padding: '5px',borderRadius: '10px', }}
              height="185"
              image={art4}
            />
          </Card>
        </Grid>

        {/* Steampunk Card */}
        <Grid item sm={12} md={3}
          sx={{textDecoration: 'none',}} component={Link}  to='/arts' >
          <Card sx={{
            height:"300px",
            color: '#d1d1d1',
            borderRadius: '10px',
            overflow: 'hidden',
            position: 'relative',
            transition: 'transform 0.3s',
            '&:hover': {
              transform: 'scale(1.05)',
              zIndex: 1,
            },
          }}>
            <CardMedia
              component="img"
              alt=''
              sx={{ padding: '5px' ,borderRadius: '10px', }}
              height="140"
              image={art5}
            />
            <CardContent>
              <Typography component="div" fontWeight="bold" color={'Highlight'} fontFamily="Sora" mb={2}>
                Portrait
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Marvel at the intricate details of fantastical contraptions, where gears interlock with precision and steam engines hum with life.
              </Typography>
            </CardContent>
            
          </Card>
        </Grid>

        <Grid item sm={12} md={5}
          sx={{
            textDecoration: 'none',

          }} component={Link}  to='/arts' >
          <Card sx={{
            height:"300px",
            borderRadius: '10px',
            overflow: 'hidden',
            position: 'relative',
            transition: 'transform 0.3s',
            '&:hover': {
              transform: 'scale(1.05)',
              zIndex: 1,
            },
          }}>
            <CardMedia
              component="img"
              alt=''
              sx={{ padding: '5px',borderRadius: '10px', }}
              height="175"
              image={art6}
            />
            <CardContent>
              <Typography  component="div" fontWeight="bold" color={'Highlight'} fontFamily="Sora" mb={2}>
                Graffiti
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lose yourself in the intricate patterns of a jungle cat's fur or marvel at the ethereal glow of a bioluminescent jellyfish.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Container>
    </Box>
    <Footer/>
    </div>
  );
}
