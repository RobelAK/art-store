import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, Link} from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleEmail = (event) =>{
        setEmail(event.target.value)
    }
    const handlePassword = (event)=> {
        setPassword(event.target.value)
    }
    const values = {
        email: email, 
        password: password,
    }
    
    const navigate = useNavigate()
    axios.defaults.withCredentials = true
    const [error, setError] = useState(null)
    const handleSubmit = (event) =>{
        event.preventDefault();
        axios.post('http://localhost:8081/login', values)
        .then(res => {
            if(res.data.loginStatus){ 
                navigate('/profile')
            }
            else{
                console.log('wrong email or password')
            }
        })
        .catch(err => console.log(err));
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div className='mb3'>
                <label htmlFor="email" className='form-label'>Email</label>
                <input type="email" name="email" onChange={handleEmail} required/>
            </div>
            <div className='mb3'>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" onChange={handlePassword} required/>
            </div>
            <button type="submit">Login</button>
        </form>
        <div className="text-warning">
            {error && error}
        </div>
        <Link to='/signup'>Dont have an account</Link>
    </div>
  )
}

export default Login
// import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import { useNavigate, Link} from 'react-router-dom'
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import Logo from '../utils/logo.png'
// import backgroundImage from '../utils/334.jpg'
// import { useState } from 'react';
// import axios from 'axios';



// function Login() {



//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const handleEmail = (event) =>{
//         setEmail(event.target.value)
//     }
//     const handlePassword = (event)=> {
//         setPassword(event.target.value)
//     }
//     const values = {
//         email: email, 
//         password: password,
//     }
    
//     const navigate = useNavigate()
//     axios.defaults.withCredentials = true
//     const [error, setError] = useState(null)
//     const handleSubmit = (event) =>{
//         event.preventDefault();
//         axios.post('http://localhost:8081/login', values)
//         .then(res => {
//             if(res.data.loginStatus){ 
//                 navigate('/profile')
//             }
//             else{
//                 setError(res.data.Error)
//             }
//         })
//         .catch(err => console.log(err));
//     }




//   return (
//     <ThemeProvider theme={createTheme()}>
//       <Box
//         sx={{
//           height: '98vh',
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           justifyContent: 'center',
//           backgroundImage: `url(${backgroundImage})`,
//           backgroundSize: 'cover',
//         }}
//       >
//         <Card
//           sx={{
//             boxShadow: 3,
//             padding: 3,
//             maxWidth: '400px',
//             width: '100%',
//             borderRadius: '16px',
//             margin: '20px', // Adjust margin
//           }}
//         >
//           <CardContent>
//             <Link to="/">
//               <img src={Logo} alt="Logo" style={{ width: '100%', marginBottom: '5px' }} />
//             </Link>

//             {/* Form */}
//             <Box
//               component="form"
//               noValidate
//               sx={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//               }}
//             >
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="email"
//                 label="Email Address"
//                 name="email"
//                 autoComplete="email"
//                 autoFocus
//                 onChange={handleEmail}
//               />
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 name="password"
//                 label="Password"
//                 type="password"
//                 id="password"
//                 autoComplete="current-password"
//                 onChange={handlePassword}
//               />
//               <FormControlLabel
//                 control={<Checkbox value="remember" color="primary" />}
//                 label="Remember me"
//               />
//               <Button type="submit" onClick={handleSubmit} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
//                 Sign In
//               </Button>
//               <Grid container>
//                 <Grid item xs>
//                   <Link href="#" variant="body2">
//                     Forgot password?
//                   </Link>
//                 </Grid>
//               </Grid>
//               <Grid container>
//                 <Grid item xs>
//                   <Link to="/signup" color='#32c8fa' variant="body2">
//                     Don't have an account? Sign Up
//                   </Link>
//                 </Grid>
//               </Grid>
//             </Box>
//           </CardContent>
//         </Card>
//       </Box>
//     </ThemeProvider>
//   );
// }

// export default Login;