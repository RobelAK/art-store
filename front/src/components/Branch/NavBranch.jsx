import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import LogoutIcon from '@mui/icons-material/Logout';
import MenuItem from "@mui/material/MenuItem";

export default function NavBranch() {
  
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null);
  
  const Navbar = styled(AppBar)(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: "none",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  }));

  const NavbarTitle = styled(Typography)(({ theme }) => ({
    flexGrow: 1,
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  }));

  const NavLinks = styled("div")({
    marginRight: "20px",
    "& a": {
      textDecoration: "none",
      color: "white",
      marginRight: "20px",
      transition: "color 0.3s ease",
      "&:hover": {
        color: "#F9A825",
      },
    },
  });

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/');
    window.location.reload();
  };

  return (
    <Navbar position="fixed">
      <Toolbar>
        <NavbarTitle variant="h6" color="inherit" component="div">
          My Branch
        </NavbarTitle>
        <NavLinks>
          <Link to="/branch">Waiting</Link>
          <Link to="/Printed">Printed</Link>
          <Link to="/delivered">Delivered</Link>
        </NavLinks>
        <div>
          <IconButton
            aria-controls="avatar-menu"
            aria-haspopup="true"
            onClick={handleMenuOpen}
          >
            <Avatar />
          </IconButton>
          <Menu
            id="avatar-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleLogout}>
              <LogoutIcon />
              Logout
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </Navbar>
  );
}
