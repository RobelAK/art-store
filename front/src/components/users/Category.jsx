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
import { Container, Divider, Grid } from '@mui/material';

export default function Category() {
  return (
    <Container>
      <Typography variant="h5" component="div" fontFamily="sora,sans-serif" textAlign="center">
        Avilable Category's
      </Typography>
      <Container sx={{ height: '60px', maxWidth: '325px', bgcolor: '#fffff' }}></Container>
      <Divider orientation="horizontal" flexItem variant="middle" sx={{ backgroundColor: "black" }} />

      <Grid container spacing={1}>
        {/* Animals Card */}
        <Grid item xs={12} md={4}
          sx={{
            '&:nth-child(1)': {
              transform: 'rotate(-10deg)',
            },
          }}>
          <Card sx={{
            maxWidth: 345,
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
              sx={{ padding: '5px' }}
              height="140"
              image={animal}
            />
            <CardContent>
              <Typography component="div" fontWeight="bold" color={'Highlight'} fontFamily="Sora" mb={2}>
                Animals
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lose yourself in the intricate patterns of a jungle cat's fur or marvel at the ethereal glow of a bioluminescent jellyfish.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">More Categories</Button>
              <Button size="small">Explore</Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Nature Card */}
        <Grid item xs={12} md={4} sx={{
          '&:nth-child(2)': {
            transform: 'rotate(20deg)',
          },
        }}>
          <Card sx={{
            maxWidth: 345,
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
            <CardActions>
              <Button size="small">More Categories</Button>
              <Button size="small">Explore</Button>
            </CardActions>
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
              sx={{ padding: '5px' }}
              height="140"
              image={nature}
            />
          </Card>
        </Grid>

        {/* Steampunk Card */}
        <Grid item xs={12} md={4}
          sx={{
            '&:nth-child(3)': {
              transform: 'rotate(-6deg)',
            },
          }}>
          <Card sx={{
            maxWidth: 345,
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
              sx={{ padding: '5px' }}
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
            <CardActions>
              <Button size="small">More Categories</Button>
              <Button size="small">Explore</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
