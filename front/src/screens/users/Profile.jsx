import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

function Profile() {
  axios.defaults.withCredentials = true;
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(atob(token.split(".")[1]));
      setId(user.id);
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    } else {
      navigate("/login");
    }
  }, []);
  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
      password
    );

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar
    );
  };

  const handleClick = (event) => {
    console.log(userInfo.id);
  };
  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    navigate("/login");
  };

  const [newName, setNewname] = useState("");

  const handleNewname = (event) => {
    setNewname(event.target.value);
  };
  const handleChangeName = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    const value = {
      name: newName,
      id: id,
      email: email,
      role: role,
    };
    axios.post("http://localhost:8081/profile/changename", value)
      .then((res) => {
        const token = res.data.token
        localStorage.removeItem('token')
        localStorage.setItem('token', token)
        alert(res.data.Message);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
  const [newPassword, setnewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const handleCurrentPassword = (event) => {
    setCurrentPassword(event.target.value);
  };
  const handleNewPassword = (event) => {
    setnewPassword(event.target.value);
  };
  const handleNewPasswordConfirm = (event) => {
    setNewPasswordConfirm(event.target.value);
  };
  const handleChangePassword = (event) => {
    event.preventDefault();
    const value = {
      id: id,
      newPassword: newPassword,
      newPasswordConfirm: newPasswordConfirm,
      currentPassword: currentPassword,
    };
    const isValid = validatePassword(newPassword);
    if (!isValid) {
      console.log("Invalid Password");
    } else {
      if (newPassword == newPasswordConfirm) {
        axios
          .post("http://localhost:8081/profile/changepassword", value)
          .then((res) => {
            alert(res.data.Message);
            window.location.reload();
          })
          .catch((err) => console.log(err));
      } else {
        console.log("Password doesnt match");
      }
    }
  };

  return (
    <div>
      <h1>{name}</h1>
      <button onClick={handleClick}>Show</button>
      <button onClick={handleLogout}>Logout</button>
      <br />
      <label htmlFor="Change name">Change Name</label>
      <br />
      <Box component="form" onSubmit={handleChangeName}>
        <input
          required
          type="text"
          name="newname"
          placeholder="New name"
          onChange={handleNewname}
        />
        <br />
        <button type="submit">Confirm</button>
      </Box>
      <label htmlFor="Change password">Change Password</label>
      <br />
      <br />
      <Box component="form" onSubmit={handleChangePassword}>
        <input
          required
          type="text"
          name="currentPassword"
          placeholder="Current password"
          onChange={handleCurrentPassword}
        />
        <br />
        <input
          required
          type="text"
          name="newPassword"
          placeholder="New password"
          onChange={handleNewPassword}
        />
        <br />
        <input
          required
          type="text"
          name="newPasswrodConfirm"
          placeholder="Confirm password"
          onChange={handleNewPasswordConfirm}
        />
        <br />
        <button type="submit">Change Password</button>
      </Box>
    </div>
  );
}

export default Profile;
