import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, IconButton, TextField, ThemeProvider, createTheme } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Payment() {

  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')

  
  const handleName = (event) => {
    setName(event.target.value)
  }
  const handleAmount = (event) => {
    setAmount(event.target.value)
  }
  

  const values = {
    name: name,
    amount: amount,
  }


  const handleSubmit = (event) => {

    event.preventDefault();
    axios.post('http://localhost:8081/payment', values) 
      .then(res => {
        console.log(res.data)
      })
      .catch(err => console.log(err));
  }



  return (
    <div>
      <Box
          sx={{
            boxShadow: 5,
            width: '400px',
            height: '85%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: 5,
          }}
        >
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Grid container rowSpacing={2}>
              <Grid item xs={12}>
                <TextField
                  type='text'
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  onChange={handleName}
                  autoComplete='off'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type='number'
                  required
                  fullWidth
                  id="amount"
                  label="Amount"
                  name="amount"
                  autoComplete='off'
                  onChange={handleAmount}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="Remeber Me"
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 1, mb: 0 }}>
              Sign In
            </Button>
            <Link to='/forgotpassword'>Forgot password</Link><br />
            <Link to='/signup'>Don't have an account</Link>
          </Box>
        </Box>
    </div>
  )
}

export default Payment