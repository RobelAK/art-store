// DrawerComponent.jsx
import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Button } from '@mui/material';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";
import AccountMenu from "./AccountMenu";
import { Divider } from "@mui/material";

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
          <Link style={{ textDecoration: "none" }}>
            <Button
              fullWidth
              sx={{ color: "black" }}
              size="small"
              onClick={handleClose}
            >
              Features
            </Button>
          </Link>
        </ListItem>
        <Divider />
        <ListItem>
          <Link style={{ textDecoration: "none" }}>
            <Button
              fullWidth
              sx={{ color: "black" }}
              size="small"
              onClick={handleClose}
            >
              About Us
            </Button>
          </Link>
        </ListItem>
        <Divider />
      </List>
    </Drawer>
  );
};

export default DrawerComponent;
