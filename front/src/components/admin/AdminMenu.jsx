import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import { Dialog, DialogContent, Typography } from '@mui/material';

const AdminMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openProfileDialog, setOpenProfileDialog] = useState(false);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileDialogOpen = () => {
    setOpenProfileDialog(true);
    handleClose();
  };

  const handleProfileDialogClose = () => {
    setOpenProfileDialog(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = '/login';
  };

  return (
    <React.Fragment>
      {/* Menu Button */}
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      {/* Account Menu */}
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* Profile MenuItem */}
        <MenuItem onClick={handleProfileDialogOpen}>
          <Avatar /> Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      {/* Profile Dialog */}
      <Dialog open={openProfileDialog} onClose={handleProfileDialogClose}>
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Admin Info
          </Typography>
          {/* Add your profile details here */}
          <Avatar /> {/* Replace with actual avatar */}
          <Typography fontFamily='sora' fontWeight='bold' variant="subtitle1" gutterBottom>
            Name: John Doe {/* Replace with actual name */}
          </Typography>
          <Typography fontFamily='sora' fontWeight='light' variant="subtitle1" gutterBottom>
            Email: john@example.com {/* Replace with actual email */}
          </Typography>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default AdminMenu;