import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Logout from '@mui/icons-material/Logout';
import { Dialog, DialogContent, TextField, Button, Typography } from '@mui/material';
import axios from 'axios'; // Add this line

const AdminMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openProfileDialog, setOpenProfileDialog] = useState(false);
  const [openAddAdminDialog, setOpenAddAdminDialog] = useState(false);
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleAddAdminDialogOpen = () => {
    setOpenAddAdminDialog(true);
    handleClose();
  };

  const handleAddAdminDialogClose = () => {
    setOpenAddAdminDialog(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = '/admin';
  };


  // Function to handle adding a new admin
  const handleAddAdmin = async () => {
    try {
      const response = await axios.post('http://localhost:8081/add-admin', {
        name: adminName,
        email: adminEmail,
        password: adminPassword
      });
      // Check if the admin was added successfully
      if (response.data.signup) {
        // Display success message
        setSuccessMessage(response.data.Message);
        // Clear form fields
        setAdminName('');
        setAdminEmail('');
        setAdminPassword('');
      } else {
        // Display error message
        setErrorMessage(response.data.Message);
      }
    } catch (error) {
      // Handle error
      console.error('Error adding admin:', error);
    }
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
        {/* Add Admin MenuItem */}
        <MenuItem onClick={handleAddAdminDialogOpen}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add new Admin
        </MenuItem>
        {/* Logout MenuItem */}
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


      <Dialog open={openAddAdminDialog} onClose={handleAddAdminDialogClose}>
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Add New Admin
          </Typography>
          <TextField
            variant="filled"
            label="Name"
            fullWidth
            margin="normal"
            value={adminName}
            onChange={(e) => setAdminName(e.target.value)}
          />
          <TextField
            variant="filled"
            label="Email"
            fullWidth
            margin="normal"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
          />
          <TextField
            variant="filled"
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button variant="outlined" onClick={handleAddAdminDialogClose} sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleAddAdmin}>
              Add
            </Button>
          </Box>
          {/* Success message */}
          {successMessage && (
            <Typography variant="body2" color="success" gutterBottom>
              {successMessage}
            </Typography>
          )}
          {/* Error message */}
          {errorMessage && (
            <Typography variant="body2" color="error" gutterBottom>
              {errorMessage}
            </Typography>
          )}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default AdminMenu;