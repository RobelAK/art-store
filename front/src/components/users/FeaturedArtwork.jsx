import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import image from '../../utils/mod.png';




export const FeaturedArtwork = () => {
  return (
    <Container>
    <Grid container spacing={4} sx={{ marginTop: 4 }}>
        <Grid item xs={12} sm={6} md={4} >
          <Card sx={{ justifyContent: "center",backgroundColor:'#f0f1f2' , alignItems: "flex-start", maxWidth: 350, margin: 'auto', padding: 2 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="Auto"
                src={image}
                sx={{
                  justifyContent: 'center',
                  aspectRatio: '4/5',
                  display: 'flex',
                  borderRadius: '4px',
                }}
              />
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={8} >
          <Card  sx={{  backgroundColor:'#f0f1f2' , margin: 'auto', padding: "13%" }}>
          <Typography variant="body2" sx={ {fontFamily:'sora', fontWeight:'light', marginBottom:'5%'}} component="div" textAlign={"justify"} >
          Step into the digital atelier of our exclusive art emporium, where every pixel pulsates with creativity and every click unveils
           a world of artistic wonders. At our digital art store, we curate a gallery that transcends the boundaries of traditional mediums,
            offering a diverse array of printed masterpieces meticulously crafted by talented artists from around the globe.
          
                </Typography>
           <Typography variant="body2" sx={ {fontFamily:'sora', fontWeight:'light'}} component="div" textAlign={"justify"} >
           Each print tells a story, capturing moments frozen in time, emotions immortalized on canvas, and visions rendered tangible. 
           From bold brushstrokes to intricate linework, our collection spans genres and styles, ensuring there's something to captivate
            every discerning eye and adorn every cherished space.
                </Typography>
            </Card>
        </Grid>
    </Grid>
    </Container>
  );
}
