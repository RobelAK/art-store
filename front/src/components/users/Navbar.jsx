import React, { useState } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Logo from '../../utils/logo.png';
import LoginIcon from '@mui/icons-material/Login';
import { Link } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import AccountMenu from './AccountMenu';
import { Divider } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const logoStyle = {
  width: 'auto',
  height: '50px',
  cursor: 'pointer',
  margin: 'auto',
  paddingLeft: '10px',
};

const Navbar = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(true);
  const [isSeller, setSeller] = useState(true);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              borderRadius: '999px',
              bgcolor:
                theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, 0.4)'
                  : 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(24px)',
              maxHeight: 40,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow:
                theme.palette.mode === 'light'
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
            })}
          >
            <Box sx={{ display: { sm: '', md: 'none' } }}>
              <IconButton
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={handleDrawerOpen}
                sx={{ minWidth: '30px', p: '4px' }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="left"
                open={isDrawerOpen}
                onClose={handleDrawerClose}
                sx={{
                  '& .MuiDrawer-paper': {
                    backdropFilter: 'blur(64px)',
                    width: '220px',
                    borderRadius: '10px',
                    backgroundColor: 'Background',
                  },
                }}
              >

                <List>
                  <ListItem sx={{ justifyContent: "space-between" }}>

                    <Link to='/cart'>
                      <ShoppingCartIcon color='primary' sx={{ marginRight: 2, color: 'black' }} />
                    </Link>
                    <Divider orientation='vertical' component="li" />

                    {isLoggedIn ? (
                      <AccountMenu />
                    ) : (
                      <Link to="/signup">
                        <LoginIcon sx={{ color: 'black' }} />
                      </Link>

                    )}
                  </ListItem>
                  <Divider component="li" />
                  <ListItem>
                    <Link to='/arts' style={{ textDecoration: 'none' }}>
                      <Button fullWidth sx={{ color: 'black' }} size="small" onClick={handleDrawerClose}>
                        Discover Art
                      </Button>
                    </Link>
                  </ListItem>
                  <Divider component="li" />
                  <ListItem>
                    <Link style={{ textDecoration: 'none' }}>
                      <Button fullWidth sx={{ color: 'black' }} size="small" onClick={handleDrawerClose}>
                        Features
                      </Button>
                    </Link>
                  </ListItem>
                  <Divider component="li" />
                  <ListItem>
                    <Link style={{ textDecoration: 'none' }}>
                      <Button fullWidth sx={{ color: 'black' }} size="small" onClick={handleDrawerClose}>
                        About Us
                      </Button>
                    </Link>
                  </ListItem>
                  <Divider component="li" />
                </List>
              </Drawer>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', ml: '-18px', px: 0 }}>
              <Link to='/'>
                <img src={Logo} style={logoStyle} alt="Habesha Art" />
              </Link>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, alignItems: 'center' }}>
              <Link to='/arts'>
                <Button color="primary" variant="text" size="small" sx={{ color: 'black', fontWeight: 'light', fontFamily: 'sora,sans-serif' }}>
                  Discover Art
                </Button>
              </Link>
              <Link >
                <Button color="primary" variant="text" size="small" sx={{ color: 'black', fontWeight: 'light', fontFamily: 'sora,sans-serif' }}>
                  Features
                </Button>
              </Link>
              <Link >
                <Button color="primary" variant="text" size="small" sx={{ color: 'black', fontWeight: 'light', fontFamily: 'sora,sans-serif' }}>
                  About Us
                </Button>
              </Link>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, alignItems: 'center' }}>
            {isSeller ? (
                      <Link to='/addart'>
                      <AddPhotoAlternateIcon color='primary' sx={{ marginRight: 2, color: 'black' }} />
                    </Link>
                    ) : (
                      ''

                    )}
            
              <Link to='/cart'>
                <ShoppingCartIcon color='primary' sx={{ marginRight: 2, color: 'black' }} />
              </Link>
              {isLoggedIn ? (
                <AccountMenu />
              ) : (
                <Link to="/signup">
                  <LoginIcon sx={{ color: 'black' }} />
                </Link>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Navbar;