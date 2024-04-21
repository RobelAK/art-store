import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';

const Navbar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  boxShadow: 'none',
  background: 'linear-gradient(to right, #2980B9, #6DD5FA)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
}));

const NavbarTitle = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  [theme.breakpoints.up('sm')]: {
    display: 'block',
  },
}));

const NavLinks = styled('div')({
  marginRight: '20px',
  '& a': {
    textDecoration: 'none',
    color: 'white',
    marginRight: '20px',
    transition: 'color 0.3s ease',
    '&:hover': {
      color: '#F9A825',
    },
  },
});

export default function NavBranch() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Navbar position="fixed">
      <Toolbar>
        <NavbarTitle variant="h6" color="inherit" component="div">
          My Branch
        </NavbarTitle>
        <NavLinks>
          <Link to="/branch">Waiting</Link>
          <Link to="/present">Printed</Link>
          <Link to="/delivered">Delivered</Link>
        </NavLinks>
        <div>
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
