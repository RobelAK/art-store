import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const BranchMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = '/login';
  };

  const handleProfile = () => {
    // Implement your profile logic here
    console.log("Profile clicked");
    handleMenuClose();
  };

  return (
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
      >
        <MenuItem onClick={handleProfile}>
          <AccountCircleIcon />
          Profile
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <LogoutIcon />
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default BranchMenu;
