import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Logout from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import axios from "axios";

const AccountMenu = () => {
  const [isSeller, setIsSeller] = useState(false);
  const [avatar, setAvatar] = useState(""); // State to store user's avatar

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(atob(token.split(".")[1]));
      if (user.role === "seller") {
        setIsSeller(true);
      }
      setAvatar(user.avatar); // Set user's avatar
    }
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const handleChangeAvatar = async () => {
    try {
      const response = await axios.post("http://localhost:8081/profile/changepassword");
      console.log("Avatar updated:", response.data);
      // Update the avatar state or perform any other necessary actions based on the response
    } catch (error) {
      console.error("Error updating avatar:", error);
      // Handle error
    }
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              src={`http://localhost:8081/images/${avatar}`} // Set user's avatar as src
              alt="Profile Image"
              sx={{ width: 32, height: 32 }}
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {isSeller ? (
          <Link to="/sellerprofile" style={{ textDecoration: "none" }}>
            <MenuItem onClick={handleChangeAvatar}>
              <Avatar /> Profile
            </MenuItem>
          </Link>
        ) : (
          <Link to="/profilepage" style={{ textDecoration: "none" }}>
            <MenuItem onClick={handleChangeAvatar}>
              <Avatar /> Profile
            </MenuItem>
          </Link>
        )}
        
        <Divider />
        {isSeller ? (
          ""
        ) : (
          <Link
            to="/Signupas"
            style={{ textDecoration: "none", color: "black" }}
          >
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              Sign up as a seller
            </MenuItem>
          </Link>
        )}

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default AccountMenu;
