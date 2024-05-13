import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';

const texturedPaperStyle = {
  background: 'url("path_to_your_texture_image")',
  padding: '20px',
};

export default function PrintPrice() {
  const [smallArtPrice, setSmallArtPrice] = useState('');
  const [mediumArtPrice, setMediumArtPrice] = useState('');
  const [largeArtPrice, setLargeArtPrice] = useState('');
  const [newSmallArtPrice, setNewSmallArtPrice] = useState('');
  const [newMediumArtPrice, setNewMediumArtPrice] = useState('');
  const [newLargeArtPrice, setNewLargeArtPrice] = useState('');
  const [message, setMessage] = useState('')
  const [messageColor, setMessageColor] = useState('green')


  useEffect(() => {
    axios.get('http://localhost:8081/printPrices')
      .then(res => {
        setSmallArtPrice(res.data[0].price);
        setMediumArtPrice(res.data[1].price);
        setLargeArtPrice(res.data[2].price);
      })
      .catch(err => console.error('Error fetching prices:', err));
  }, []);

  const handleSetPrice = (size, newPrice) => {
    if(newPrice == ''){
      console.log('price can not be empty')
      setMessageColor('red')
      setMessage('price can not be empty')
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
    else{

      axios.post('http://localhost:8081/changePrintPrice',{size:size,newPrice:newPrice})
      .then(res => {
  
        axios.get('http://localhost:8081/printPrices')
        .then(res => {
          setSmallArtPrice(res.data[0].price);
          setMediumArtPrice(res.data[1].price);
          setLargeArtPrice(res.data[2].price);
        })
        .catch(err => console.error('Error fetching prices:', err));
        setNewSmallArtPrice('')
        setNewLargeArtPrice('')
        setNewMediumArtPrice('')
        // console.log(res.data)
        setMessageColor('green')
        setMessage(res.data)
        setTimeout(() => {
          setMessage('');
        }, 3000);
      })
      .catch(err=> console.error(err))
    }
  };

  return (
    <Paper elevation={3} sx={{ ...texturedPaperStyle}}>
      <Card variant="outlined" sx={{ fontFamily: 'Sora', marginTop: '20px' }}>
        <CardContent>
          <Typography variant="h5" component="div" sx={{ fontFamily: 'Sora', margin: '20px' }}>
            Current Print Prices
          </Typography>
          <Typography variant="body1" component="div" sx={{ fontFamily: 'Sora', margin: '10px' }}>
            Small: {smallArtPrice} birr
          </Typography>
          <Typography variant="body1" component="div" sx={{ fontFamily: 'Sora', margin: '10px' }}>
            Medium: {mediumArtPrice} birr
          </Typography>
          <Typography variant="body1" component="div" sx={{ fontFamily: 'Sora', margin: '10px' }}>
            Large: {largeArtPrice} birr
          </Typography>
        </CardContent>
      </Card>


      <Card variant="outlined" sx={{ fontFamily: 'Sora' }}>
        <CardContent>
          <Typography variant="h5" component="div" sx={{ fontFamily: 'Sora', margin: '20px' }}>
            Price Change
          </Typography>
          <Typography sx={{ color: messageColor }}>{message}</Typography>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                size='small'
                fullWidth
                label="Small price"
                value={newSmallArtPrice}
                onChange={e => setNewSmallArtPrice(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                color='inherit'
                fullWidth
                variant="contained"
                onClick={() => handleSetPrice('small', newSmallArtPrice)}
              >
                Set new Small Size Price
              </Button>
            </Grid>
            <Grid item xs={6}>
              <TextField
                size='small'
                fullWidth
                label="Medium price"
                value={newMediumArtPrice}
                onChange={e => setNewMediumArtPrice(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                color='inherit'
                fullWidth
                variant="contained"
                onClick={() => handleSetPrice('medium', newMediumArtPrice)}
              >
                Set new Medium Size Price
              </Button>
            </Grid>
            <Grid item xs={6}>
              <TextField
                size='small'
                fullWidth
                label="Large price"
                value={newLargeArtPrice}
                onChange={e => setNewLargeArtPrice(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                color='inherit'
                fullWidth
                variant="contained"
                onClick={() => handleSetPrice('large', newLargeArtPrice)}
              >
                Set new Large Size Price
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      
    </Paper>
  );
}
