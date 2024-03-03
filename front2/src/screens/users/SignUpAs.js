import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box'; import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Logo from '../../utils/logo.png'; // Import your logo
import backgroundImage from '../../utils/333.jpg'; // Replace with your image path
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function SignUpAs() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleFileChange = (event) => {
    // Handle the file change logic here
    const selectedFile = event.target.files[0];
    console.log('Selected File:', selectedFile);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get('username'),
      email: data.get('email'),
      password: data.get('password'),
      confirmPassword: data.get('confirmPassword'),
      termsAndConditions: data.get('termsAndConditions'),
    });
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
      }}
    >
      {/* Card */}
      <Card
        sx={{
          boxShadow: 3,
          padding: 3,
          maxWidth: '400px',
          width: '100%', // Adjust the width as needed
          borderRadius: '16px',
          margin: '65px',
        }}
      >
        <CardContent>
          {/* Logo */}
          <Link to="/">
            <img src={Logo} alt="Logo" style={{ width: '100%', marginBottom: '20px' }} />
          </Link>

          {/* Form */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Username */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />

            {/* Email */}
            <TextField
              margin="normal"
              required
              fullWidth
              type='email'
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />

            {/* Password */}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="new-password"
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleTogglePassword} edge="end">
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                ),
              }}
            />

            {/* Confirm Password */}
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              autoComplete="new-password"
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleTogglePassword} edge="end">
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                ),
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              type="link"
              required
              VisibilityOffIcon
              label="Portfolio link"
              onChange={handleFileChange}
            />

            <FormControlLabel
              control={<Checkbox value="termsAndConditions" color="primary" />}
              label="I agree to the Terms and Conditions"
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 0.2 }}>
              Sign Up
            </Button>
            <Link to='/signup' style={{ width: '100%' }}>
              <Button type="submit" fullWidth variant="outlined" sx={{ mt: 0.8, mb: 2 }}>
              Sign Up as a buyer
            </Button>
            </Link>
            <Grid container>
              <Grid item xs>
                {/* You can add a link to your terms and conditions here */}
                <Link href="#" variant="body2">
                  Terms and Conditions
                </Link>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs>
                <Link to="/signin" variant="body2" >
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
export default SignUpAs;
