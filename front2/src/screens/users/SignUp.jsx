// import * as React from 'react';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import { Link } from 'react-router-dom';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import Logo from '../../utils/logo.png';
// import backgroundImage from '../../utils/334.jpg';
// import IconButton from '@mui/material/IconButton';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

// function SignUp() {
//   const [showPassword, setShowPassword] = React.useState(false);

//   const handleTogglePassword = () => {
//     setShowPassword((prevShowPassword) => !prevShowPassword);
//   };

  

//   return (
//     <ThemeProvider theme={createTheme()}>
//       <div style={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         width: '100vw',
//         backgroundColor: 'purple',
//         height : '100vh',
//         margin: '0px'
//       }}>
//         {/* Card */}
//         <Card
//           sx={{
//             backgroundColor: 'green',
//             width: '30%'
//             // height
//           }}
//           >
//           <CardContent>
//             {/* Logo */}
//             <Link to="/">
//               <img src={Logo} alt="Logo" style={{ width: '100%', marginBottom: '20px' }} />
//             </Link>

//             {/* Form */}
//             <Box
//               component="form"
//               Validate
//               sx={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 backgroundColor: 'aqua',
//               }}
//               >
//               {/* Username */}
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="username"
//                 label="Username"
//                 name="username"
//                 autoComplete="username"
//                 autoFocus
//                 size='small'
//               />

//               {/* Email */}
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="email"
//                 label="Email Address"
//                 name="email"
//                 autoComplete="email"
//                 size='small'
//               />

//               {/* Password */}
//               <TextField
//                 margin="normal"
//                 size='small'
//                 required
//                 fullWidth
//                 name="password"
//                 label="Password"
//                 type={showPassword ? 'text' : 'password'}
//                 id="password"
//                 autoComplete="new-password"
//                 InputProps={{
//                   endAdornment: (
//                     <IconButton onClick={handleTogglePassword} edge="end">
//                       {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
//                     </IconButton>
//                   ),
//                 }}
//               />

//               {/* Confirm Password */}
//               <TextField
//                 margin="normal"
//                 required
//                 size='small'
//                 fullWidth
//                 name="confirmPassword"
//                 label="Confirm Password"
//                 type={showPassword ? 'text' : 'password'}
//                 id="confirmPassword"
//                 autoComplete="new-password"
//                 InputProps={{
//                   endAdornment: (
//                     <IconButton onClick={handleTogglePassword} edge="end">
//                       {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
//                     </IconButton>
//                   ),
//                 }}
//               />

//               {/* Terms and Conditions Checkbox */}
//               <FormControlLabel
//                 control={<Checkbox value="termsAndConditions" color="primary" />}
//                 label="I agree to the Terms and Conditions"
//               />

//               {/* Sign Up Button */}
//               <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 0.2 }}>
//                 Sign Up
//               </Button>
//               <Link to='/signupas' style={{ width: '100%' }}>
//                 <Button type="submit" fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }}>
//                   Sign Up as a seller
//                 </Button>
//               </Link>
//               <Grid container>
//                 <Grid item xs>
//                   {/* You can add a link to your terms and conditions here */}
//                   <Link href="#" variant="body2">
//                     Terms and Conditions
//                   </Link>
//                 </Grid>
//               </Grid>
//               <Grid container>
//                 <Grid item xs>
//                   <Link to="/signin" variant="body2" >
//                     {"Already have an account? Sign In"}
//                   </Link>
//                 </Grid>
//               </Grid>

//             </Box>
//           </CardContent>
//         </Card>

//         {/* Copyright */}
//         <Typography
//           variant="body2"
//           color="text.secondary"
//           align="center"
//           sx={{ mt: 4, mb: 2, color: '#666' }}
//         >
//           {'Copyright © '}
//           <Link color="inherit" href="https://mui.com/">
//             Your Website
//           </Link>{' '}
//           {new Date().getFullYear()}
//           {'.'}
//         </Typography>
//       </div>
//     </ThemeProvider>
//   );
// }

// export default SignUp;



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



const defaultTheme = createTheme();

function SignUp() {
  




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
  const handlePasswordConfirm = (event) =>{
    setPasswordConfirm(event.target.value)
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
                <Link to="/SignIn"></Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}


export default SignUp;