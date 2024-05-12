import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// Sample textured paper background
const texturedPaperStyle = {
  background: 'url("path_to_your_texture_image")',
  padding: '20px', // Adjust padding as needed
};

export default function PriceChange() {
  return (
    <Paper elevation={3} sx={{ ...texturedPaperStyle  , margin:'10px'}}>
      <Card variant="outlined"  sx={{fontFamily: 'Sora'}}>
        <CardContent >
          <Typography variant="h5" component="div" sx={{ fontFamily: 'Sora' ,margin:'20px' }}>
            Price Change
          </Typography>
          <Grid  container spacing={2}>
            <Grid item xs={6}>
              <TextField size='small' fullWidth label=" small price " id="3" />
            </Grid>
            <Grid item xs={6}>
              <Button color='inherit' fullWidth variant="contained">set new Small Size Price</Button>
            </Grid>
            <Grid item xs={6}>
              <TextField size='small' fullWidth label="medium price " id="2"  />
            </Grid>
            <Grid item xs={6}>
              <Button color='inherit' fullWidth variant="contained">set new medium Size Price</Button>
            </Grid>
            <Grid item xs={6}>
              <TextField  size='small' label="Large price " id="1" fullWidth/>
            </Grid>
            <Grid item xs={6}>
              <Button color='inherit' fullWidth variant="contained">set new Large Size Price</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Paper>
  );
}
