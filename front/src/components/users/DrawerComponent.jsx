// DrawerComponent.jsx
import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Box, Button, ButtonGroup, Container, Grid, Typography } from '@mui/material';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";
import AccountMenu from "./AccountMenu";
import { Divider } from "@mui/material";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Logo from "../../utils/logo1.png";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Notifications from "./Notifications";

const logoStyle = {
  width: "auto",
  height: "50px",
  cursor: "pointer",
  margin: "6px",
};

const DrawerComponent = ({ open, handleClose, isLoggedIn, isSeller }) => {
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={handleClose}
      sx={{
        "& .MuiDrawer-paper": {
          backdropFilter: "blur(64px)",
          width: "220px",
          borderRadius: "0px  0px 30px 0px",
          backgroundColor: "Background",
        },
      }}
    >
      <Box sx={{ backgroundColor: '#4287f5', height: '140px' }}>
        <List>
          <ListItem sx={{ justifyContent: "space-between" }}>
            {isLoggedIn ? (
              <AccountMenu />
            ) : (
              <Link to="/login">
                <LoginIcon sx={{ color: "white" }} />
              </Link>
            )}

            {isLoggedIn && (
              <Notifications />
            )}
          </ListItem>
        </List>
      </Box>
      <Box sx={{ backgroundColor: '#4287f5', alignContent: "space-between", height: '70px' }}>
        <Grid container sx={{ padding: '10px', display: 'flex', justifyContent: 'space-between' }}>
          <Grid item>
            {isSeller && (
              <Link to="/addart">
                <AddPhotoAlternateIcon color="primary" sx={{ color: "white", }} />
              </Link>
            )}
          </Grid>
          <Grid item>
            <Link to="/cart">
              <ShoppingCartIcon color="primary" sx={{ color: "white", }} />
            </Link>
          </Grid>
          <Grid item>
            <Link to="/saved">
              <BookmarkIcon color="primary" sx={{ color: "white", }} />
            </Link>
          </Grid>
        </Grid>
      </Box>
      <List sx={{ padding: 0 }}>
        <ListItem sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 1, paddingBottom: 1 }}>
          <Button
            fullWidth
            variant="text"
            sx={{ color: "black", borderRadius: 0 }}
            size="large"
            component={Link} to='/arts'
            onClick={handleClose}
          >
            Discover Art
          </Button>
        </ListItem>
        <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.12)' }} />
        <ListItem sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 1, paddingBottom: 1 }}>
          <Button
            color="primary"
            fullWidth
            variant="text"
            size="large"
            component={Link} to='/category'
            sx={{
              color: "black",
              fontWeight: "light",
              fontFamily: "sora,sans-serif",
              borderRadius: 0,
            }}
          >
            Category
          </Button>
        </ListItem>
        <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.12)' }} />
        <ListItem sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 1, paddingBottom: 1 }}>
          <Button
            color="primary"
            fullWidth
            variant="text"
            size="large"
            component={Link} to='/about'
            sx={{
              color: "black",
              fontWeight: "light",
              fontFamily: "sora,sans-serif",
              borderRadius: 0,
            }}
          >
            About Us
          </Button>
        </ListItem>
        <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.12)' }} />
      </List>

      <Container sx={{ height: "700px" }}></Container>
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
        <img src={Logo} style={logoStyle} alt="Habesha Art" />
        <Typography
          variant="body2"
          component="h1"
          sx={{

            fontFamily: 'Sora, sans-serif',
            fontWeight: 200,
            color: 'gray',
          }}
        >
          Habesha Art Store
        </Typography>
      </Link>
    </Drawer>
  );
};

export default DrawerComponent;
