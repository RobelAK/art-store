import React, { useState } from 'react';
import { Box, Button, Container, AppBar, Toolbar,IconButton, Drawer, List, ListItem} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Logo from '../../utils/logo.png';
import { Link } from 'react-router-dom';


const logoStyle = {
  width: 'auto',
  height: '60px',
  cursor: 'pointer',
  margin: 'auto',
  paddingLeft: '10px',
};

const Navbar = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

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
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                ml: '-18px',
                px: 0,
              }}
            >
              <Link to='/'>
                <img
                  src={Logo}
                  style={logoStyle}
                  alt="Habesha Art"
                />
              </Link>
            </Box>
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 0.5,
                alignItems: 'center',
              }}
            >
              <Link to='/arts'>
                <Button
                  color="primary"
                  variant="text"
                  size="small"
                >
                  Discover Art
                </Button>
              </Link>
              <Button
                color="primary"
                variant="text"
                size="small"
              >
                Features
              </Button>
              <Button
                color="primary"
                variant="text"
                size="small"
              >
                Categories
              </Button>
              <Button
                color="primary"
                variant="text"
                size="small"
              >
                About Us
              </Button>
            </Box>
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
                anchor="right"
                open={isDrawerOpen}
                onClose={handleDrawerClose}
                sx={{ '& .MuiDrawer-paper': { backdropFilter: 'blur(24px)', width: '220px', bgcolor: 'White', } }}
                >
                <List>
                  <ListItem>
                    <Button
                      color="primary"
                      size="small"
                      onClick={handleDrawerClose}
                    >
                      <ShoppingCartIcon/>
                    </Button>
                  </ListItem>

                  <Container sx={{ height: '50px', }} />
                  <ListItem>
                    <Link to='/arts'>

                      <Button
                        color="Primary"
                        size="small"
                        onClick={handleDrawerClose}
                      >
                        Discover Art
                      </Button>

                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link to='/arts'>
                      <Button
                        color="Primary"
                        size="small"
                        onClick={handleDrawerClose}
                      >
                        Discover Art
                      </Button>
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link to='/arts'>
                      <Button
                        color="primary"
                        size="small"
                        onClick={handleDrawerClose}
                      >
                        Discover Art
                      </Button>
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link to='/arts'>
                      <Button
                        color="primary"
                        size="small"
                        onClick={handleDrawerClose}
                      >
                        Discover Art
                      </Button>
                    </Link>
                  </ListItem>
                  <Container sx={{ height: '300px', }} />
                  {/* Add other menu items here */}

                </List>
              </Drawer>
            </Box>
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 0.5,
                alignItems: 'center',
              }}
            >
              <Button
                color="primary"
                variant="text"
                size="small"
              >
                <ShoppingCartIcon/>
              </Button>
              <Link to="/signup">
                <Button
                  color="primary"
                  variant="text"
                  size="small"
                >
                  Sign Up
                </Button>
              </Link>

            </Box>

          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Navbar;
