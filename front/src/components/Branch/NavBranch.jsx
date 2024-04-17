import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Link } from 'react-router-dom';

const Navbar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

const NavbarTitle = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  [theme.breakpoints.up('sm')]: {
    display: 'block',
  },
}));

export default function NavBranch() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Navbar position="fixed" sx={{
      boxShadow: 2,
      bgcolor: "#7db8f0",
      mt: 2,
      flexShrink: 0,
      backdropFilter: "blur(24px)",
    }}>
      <Toolbar style={{
        marginRight: '20px', bgcolor:
          "#7db8f0",
        backdropFilter: "blur(24px)",
        maxHeight: 40,
      }}>
        <NavbarTitle variant="h6" color="black" component="div">
          My Branch
        </NavbarTitle>
        <div style={{ marginRight: '20px' }}>
          <Link to="/waiting" style={{ textDecoration: 'none', color: 'Black' }}>
            <Typography variant="button" sx={{ marginRight: 2 }}>
              Waiting
            </Typography>
          </Link>
          <Link to="/present" style={{ textDecoration: 'none', color: 'Black' }}>
            <Typography variant="button" sx={{ marginRight: 2 }}>
              Printed
            </Typography>
          </Link>
          <Link to="/delivered" style={{ textDecoration: 'none', color: 'Black' }}>
            <Typography variant="button" sx={{ marginRight: 2 }}>
              Delivered
            </Typography>
          </Link>
        </div>
        <div style={{ marginRight: '30px' }}>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenuOpen}
            color="inherit"
          >
            <Avatar alt="Profile Picture" src="/static/images/avatar/1.jpg" />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </Navbar>
  );
}
