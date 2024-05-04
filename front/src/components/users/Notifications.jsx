import React, { useState, useEffect } from 'react';
import { IconButton, Menu, MenuItem, Typography, Button, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import axios from 'axios';

const Notifications = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token:', token);
        const response = await axios.get("http://localhost:8081/api/notifications", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    fetchNotifications();
  }, []);

  const handleSeenClick = async (notificationId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8081/api/notifications/${notificationId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setNotifications(notifications.filter(notification => notification.id !== notificationId));
    } catch (error) {
      console.error('Error updating notification:', error);
    }
  };


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton aria-controls="notification-menu" aria-haspopup="true" onClick={handleClick} color="black">
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        id="notification-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {notifications.length > 0 ? (
          notifications.map(notification => (
            <MenuItem key={notification.id}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', width: 300 }}>
                <div style={{ flex: 1, marginRight: 10 }}>
                  <Typography  color="black" style={{ overflowWrap: 'break-word',fontSize:'12px', fontFamily: 'Sora' }}>
                    {notification.message}
                  </Typography>
                  <Typography style={{ overflowWrap: 'break-word',fontSize:'10px', fontFamily: 'Sora' }} color="black">
                    {new Date(notification.datetime).toLocaleString()}
                  </Typography>
                </div>
                <Button
                  variant="text"
                  size="small"
                  color="primary"
                  sx={{color:'black'}}
                  onClick={() => handleSeenClick(notification.id)}
                >
                  Seen
                </Button>

              </div>
            </MenuItem>
          ))
        ) : (
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', width: 300 }}>
          <MenuItem>No notifications</MenuItem>
          </div>
        )}
      </Menu>
    </>
  );
};

export default Notifications;
