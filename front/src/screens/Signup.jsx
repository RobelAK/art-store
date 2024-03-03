// import React, { useState } from 'react'
// import axios from 'axios'
// import { Link } from 'react-router-dom'
// import { useNavigate} from 'react-router-dom'

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
    
    const defaultTheme = createTheme();

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [isValid, setIsValid] = useState(false);  
    const navigate = useNavigate()

    const handleName = (event) =>{
        setName(event.target.value)
    }
    const handleEmail = (event) =>{
        setEmail(event.target.value) 
    }
    const handlePassword = (event) =>{
        setPassword(event.target.value)
        setIsValid(validatePassword(password))
        
    }

    const validatePassword = (password) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    
        return (
          password.length >= minLength &&
          hasUpperCase &&
          hasLowerCase &&
          hasNumber &&
          hasSpecialChar
        );
    };





    const handlePasswordConfirm = (event) =>{
        setPasswordConfirm(event.target.value)
    }
    const values = {
        name: name,
        email: email,
        password: password,
        passwordConfirm: passwordConfirm,
    };
    const handleSubmit = (event) =>{
        event.preventDefault();
        if(!isValid){console.log("password invalid")}
        else {
            axios.post('http://localhost:8081/signup', values)
            .then(res => {
                if(res.data.signup){
                    alert(res.data.Message)
                    navigate('/login')
                }
                else{
                    console.log(res.data)
                }
            })
            .catch(err => console.log(err)); 
        }
    }
//   return (
//     <div className="cont">
//         <form onSubmit={handleSubmit}>
//             <div>
//                 <label htmlFor="name">Name</label>
//                 <input type="text" name="name" onChange={handleName} required/>
//             </div>
//             <div>
//                 <label htmlFor="email">Email</label>
//                 <input type="email" name="email" onChange={handleEmail} required/>
//             </div>
//             <div>
//                 <label htmlFor="password">Password</label>
//                 <input type="password" name="password" onChange={handlePassword} required/>
//             </div>
//             <div>
//                 <label htmlFor="passwordConfirm">Confirm Password</label>
//                 <input type="password" name="passwordConfirm" onChange={handlePasswordConfirm} required/>
//             </div>
//             <button type="submit">Signup</button>
//         </form>
//         <Link to='/login'>Already have an account</Link>
//     </div>
//   )
return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  onChange={handleName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleEmail}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handlePassword}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="passwordConfirm"
                  label="Confirm Password"
                  type="password"
                  id="passwordConfirm"
                  autoComplete="new-password"
                  onChange={handlePasswordConfirm}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Signup