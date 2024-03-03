import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Logo from '../../utils/logo.png';
import backgroundImage from '../../utils/334.jpg';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function SignUp() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  

  return (
    <ThemeProvider theme={createTheme()}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        backgroundColor: 'purple',
        height : '100vh',
        margin: '0px'
      }}>
        {/* Card */}
        <Card
          sx={{
            backgroundColor: 'green',
            width: '30%'
            // height
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
              Validate
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'aqua',
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
                size='small'
              />

              {/* Email */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                size='small'
              />

              {/* Password */}
              <TextField
                margin="normal"
                size='small'
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
                size='small'
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

              {/* Terms and Conditions Checkbox */}
              <FormControlLabel
                control={<Checkbox value="termsAndConditions" color="primary" />}
                label="I agree to the Terms and Conditions"
              />

              {/* Sign Up Button */}
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 0.2 }}>
                Sign Up
              </Button>
              <Link to='/signupas' style={{ width: '100%' }}>
                <Button type="submit" fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }}>
                  Sign Up as a seller
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

        {/* Copyright */}
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 4, mb: 2, color: '#666' }}
        >
          {'Copyright © '}
          <Link color="inherit" href="https://mui.com/">
            Your Website
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </div>
    </ThemeProvider>
  );
}

export default SignUp;
