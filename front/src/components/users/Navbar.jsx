
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../../utils/logo1.png";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AccountMenu from './AccountMenu';
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";
import DrawerComponent from "./DrawerComponent";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import {Typography } from '@mui/material';
import SearchBar from "./SearchBar";

const logoStyle = {
  width: "auto",
  height: "50px",
  cursor: "pointer",
  margin: "auto",
  paddingLeft: "10px",
};

const Navbar = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [isSeller, setisSeller] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setisLoggedIn(true);
      const user = JSON.parse(atob(token.split(".")[1]));
      if (user.role === "seller") {
        setisSeller(true);
      } else {
        setisSeller(false);
      }
    } else {
      setisLoggedIn(false);
    }
  }, []);

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
          bgcolor: "transparent",
          backgroundImage: "none",
          mt: 1,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              borderRadius: "999px",
              bgcolor:
                theme.palette.mode === "light"
                  ? "rgba(255, 255, 255, 0.4)"
                  : "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(24px)",
              maxHeight: 40,
              border: "1px solid",
              borderColor: "divider",
              boxShadow:
                theme.palette.mode === "light"
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
            })}
          >
            <Box sx={{ display: { sm: "", md: "none" } }}>
              <IconButton
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={handleDrawerOpen}
                sx={{ minWidth: "30px", p: "4px" }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <Box
  sx={{
    display: { xs: "none", md: "flex" },
    alignItems: "center",
    ml: "-18px",
    px: 0,
    textDecoration: 'none', // Remove underline from the text
  }}
>
  <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}> {/* Remove underline from the link */}
    <img src={Logo} style={logoStyle} alt="Habesha Art" />
    <Typography
      variant="body2"
      component="h1"
      sx={{
        
        fontFamily: 'Sora, sans-serif',
        fontWeight: 200,
        color: 'gray', // Text color on top of the overlay
        marginLeft: '5px', // Add margin for spacing between the logo and text
      }}
    >
      Habesha Art Store
    </Typography>
  </Link>
</Box>

            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 0.5,
                alignItems: "center",
              }}
            >
              <Link to="/arts">
                <Button
                  color="primary"
                  variant="text"
                  size="small"
                  sx={{
                    color: "black",
                    fontWeight: "light",
                    fontFamily: "sora,sans-serif",
                  }}
                >
                  Discover Art
                </Button>
              </Link>
              <Link>
                <Button
                  color="primary"
                  variant="text"
                  size="small"
                  component={Link}  to='/category'
                  sx={{
                    color: "black",
                    fontWeight: "light",
                    fontFamily: "sora,sans-serif",
                  }}
                >
                  category
                </Button>
              </Link>
              <Link>
                <Button
                  color="primary"
                  variant="text"
                  size="small"
                  component={Link}  to='/about'
                  sx={{
                    color: "black",
                    fontWeight: "light",
                    fontFamily: "sora,sans-serif",
                  }}
                >
                  About Us
                </Button>
              </Link>
            </Box>
            <SearchBar/>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 0.5,
                alignItems: "center",
              }}
            >
              {isSeller ? (
                <Link to="/addart">
                  <AddPhotoAlternateIcon
                    color="primary"
                    sx={{ marginRight: 2, color: "black" }}
                  />
                </Link>
              ) : (
                ""
              )}

              <Link to="/cart">
                <ShoppingCartIcon
                  color="primary"
                  sx={{ marginRight: 2, color: "black" }}
                />
              </Link>
              <Link to="/saved">
              <BookmarkIcon
              color="primary"
              sx={{ marginRight: 2, color: "black" }}
              />
              </Link>
              {isLoggedIn ? (
                <AccountMenu />
              ) : (
                <Link to="/login">
                  <LoginIcon sx={{ color: "black"}} />
                </Link>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Drawer component */}
      <DrawerComponent
        open={isDrawerOpen}
        handleClose={handleDrawerClose}
        isLoggedIn={isLoggedIn}
        isSeller={isSeller}
      />
    </div>
  );
};

export default Navbar;
