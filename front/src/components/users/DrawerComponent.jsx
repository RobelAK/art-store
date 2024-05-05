// DrawerComponent.jsx
import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Button, Container, Grid } from '@mui/material';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";
import AccountMenu from "./AccountMenu";
import { Divider } from "@mui/material";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Notifications from "./Notifications";

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
          borderRadius: "10px",
          backgroundColor: "Background",
        },
      }}
    >
      <List>
        <ListItem sx={{ justifyContent: "space-between" }}>
          <Link to="/cart">
            <ShoppingCartIcon color="primary" sx={{ marginRight: 2, color: "black" }} />
          </Link>
          {isLoggedIn ? (
            <AccountMenu />
          ) : (
            <Link to="/login">
              <LoginIcon sx={{ color: "black" }} />
            </Link>
          )}
        </ListItem>
        <Divider />
        <ListItem>
          <Link to="/arts" style={{ textDecoration: "none" }}>
            <Button
              fullWidth
              sx={{ color: "black" }}
              size="small"
              onClick={handleClose}
            >
              Discover Art
            </Button>
          </Link>
        </ListItem>
        <Divider />
        <ListItem>
          <Button
            color="primary"
            variant="text"
            size="small"
            component={Link} to='/category'
            sx={{
              color: "black",
              fontWeight: "light",
              fontFamily: "sora,sans-serif",
            }}
          >
            category
          </Button>
        </ListItem>
        <Divider />
        <ListItem>
          <Button
            color="primary"
            variant="text"
            size="small"
            component={Link} to='/about'
            sx={{
              color: "black",
              fontWeight: "light",
              fontFamily: "sora,sans-serif",
            }}
          >
            About Us
          </Button>
        </ListItem>
        <Divider />
      </List>
      <Container sx={{ height:"1000px"}}>

      </Container>
      <Grid container >
        <Grid item  xs={3}>
        {isSeller && (
        <Link to="/addart"  >
          <AddPhotoAlternateIcon color="primary" sx={{ marginRight: 2, color: "black", }} />
        </Link>
      )}
        </Grid>
        <Grid item xs={3}>
        <Link to="/cart">
        <ShoppingCartIcon color="primary" sx={{ marginRight: 2, color: "black", }} />
      </Link>
        </Grid>
        <Grid item xs={3}>
        <Link to="/saved">
        <BookmarkIcon color="primary" sx={{ marginRight: 2, color: "black", }} />
      </Link>
        </Grid>
        <Grid item xs={3}>
        {isLoggedIn && (
        <Notifications  />
      )}
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default DrawerComponent;
