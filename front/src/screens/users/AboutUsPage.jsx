import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Card, CardContent, CardMedia, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import Footer from '../../components/users/Footer';
import Navbar from '../../components/users/Navbar';
import tsemru from '../../utils/tsemru.jpg'
import robel from '../../utils/robel.jpg'
import nahom from '../../utils/nahom.jpg'

const AboutUs = () => {
  return (
    <>
    
    <Navbar/>
      <Container sx={{ height: '100px',  }}></Container>
    <Box
      id="about-us"
      sx={{
        backgroundColor: 'GrayText',
        paddingY: 8,
        textAlign: 'center',
      }}
    >
      <Container>
        <Typography style={{color:'white', fontFamily:'sora,sans-serif', fontWeight:'normal'} } variant="h4" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1" style={{color:'white', fontFamily:'sora,sans-serif', fontWeight:'lighter'} }>
          We are a group of graduate students from Wolkite University, passionate about art and technology.
        </Typography>
        <Typography variant="body1" style={{color:'white', fontFamily:'sora,sans-serif', fontWeight:'lighter'} } mt={2}>
          Our journey led us to create the Habesha Art Store project as our final year project.
          The project combines our love for art with the skills and knowledge we've gained during our studies.
        </Typography>
        <Typography variant="body1" style={{color:'white', fontFamily:'sora,sans-serif', fontWeight:'lighter'} } mt={2}>
          Our goal is to provide a platform for showcasing and celebrating Habesha art, connecting artists
          with art enthusiasts, and promoting the rich cultural heritage of Ethiopia through our digital art store.
        </Typography>
        <Typography variant="body1" style={{color:'white', fontFamily:'sora,sans-serif', fontWeight:'lighter'} } mt={2}>
          Thank you for joining us on this creative journey!
        </Typography>
      </Container>
      </Box>
      <Box sx={{
        backgroundColor: 'lightgray',
        paddingY: 8,
        
        alignItems: 'center',
      }}>
      <Container sx={{ height: '40px',  }}></Container>
      <Typography variant="h5" color={'GrayText'} component="div" gutterBottom fontFamily="sora,sans-serif" textAlign="center">
        The Team
      </Typography>
      
      <Container sx={{alignItems:'center',marginLeft:'20px',}}>
      <Grid  sx={{alignItems:'center'}} container spacing={2} >
      <Grid item sm={12} md={4}
            sx={{
              textDecoration: 'none',
  
            }} component={Link}  to='/arts' >
            <Card sx={{
              height:"300px",
              borderRadius: '10px',
              overflow: 'hidden',
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
                height="230"
                image={tsemru}
              />
              <CardContent >
                <Typography  component="div" fontWeight="bold"  color={'Highlight'} fontFamily="Sora" >
                  Tsemru Fikremariam
                </Typography>
                <Typography variant="body2" color="text.secondary">
                 Ui/Ux designer , Frontend developer
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item sm={12} md={4}
            sx={{
              textDecoration: 'none',
  
            }} component={Link}  to='/arts' >
            <Card sx={{
              height:"300px",
              borderRadius: '10px',
              overflow: 'hidden',
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
                height="230"
                image={robel}
              />
              <CardContent>
                <Typography  component="div" fontWeight="bold" color={'Highlight'} fontFamily="Sora" >
                  Robel Aklilu
                </Typography>
                <Typography variant="body2" color="text.secondary">
                 Backend Developer
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
        <Grid item sm={12} md={4}
            sx={{
              textDecoration: 'none',
  
            }} component={Link}  to='/arts' >
            <Card sx={{
              height:"300px",
              borderRadius: '10px',
              overflow: 'hidden',
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
                height="230"
                image={nahom}
              />
              <CardContent>
                <Typography  component="div" fontWeight="bold" color={'Highlight'} fontFamily="Sora" >
                  Nahome Endalkacew
                </Typography>
                <Typography variant="body2" color="text.secondary">
                 Database Specialist ,Frontend Developer
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
        </Grid>
        </Container>
        </Box>
      
      <Footer/>
      </>
  );
};

export default AboutUs;
