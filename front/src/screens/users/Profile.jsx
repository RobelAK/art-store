import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { Box } from '@mui/material'





function Profile() {

  axios.defaults.withCredentials = true
  const navigate = useNavigate()
  const token = Cookies.get('token')

  let userInfo = ''
  let id = ''
  let email = ''
  let name = ''
  let password = ''
  let values = {}
  let isValid = false;

  if (token) {
    userInfo = JSON.parse(atob(token.split('.')[1]));
    id = userInfo.id
    email = userInfo.email
    name = userInfo.name
    password = userInfo.password
    values = {
      id,
      email,
      name,
      password
    }
  }
  else {
    userInfo = 'no token available'
    navigate('/login')
  }

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar
    );
  };

  const handleClick = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8081/profile', values)
      .then(res => {
        console.log(res.data)
      })
  }
  const handleLogout = (event) => {
    event.preventDefault();
    Cookies.remove('token')
    navigate('/login')
  }


  const [newName, setNewname] = useState('')

  const handleNewname = (event) => {
    setNewname(event.target.value)
  }
  const handleChangeName = (event) => {
    event.preventDefault();
    const value = {
      name: newName,
      id: id,
      email: email,
      password: password,
    }
    axios.post('http://localhost:8081/profile/changename', value)
      .then(res => {
        alert(res.data.Message)
        window.location.reload()
      })
      .catch(err => console.log(err));
  }
  const [newPassword, setnewPassword] = useState('')
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const handleCurrentPassword = (event) => {
    setCurrentPassword(event.target.value)
  }
  const handleNewPassword = (event) => {
    setnewPassword(event.target.value)
  }
  const handleNewPasswordConfirm = (event) => {
    setNewPasswordConfirm(event.target.value)
  }
  const handleChangePassword = (event)=>{
    event.preventDefault();
    const value = {
      id: id,
      newPassword: newPassword,
      newPasswordConfirm: newPasswordConfirm,
      currentPassword: currentPassword,
    }
    isValid = validatePassword(newPassword)
    if(!isValid){
      console.log("Invalid Password")
    }
    else{
      if(newPassword == newPasswordConfirm){
        axios.post('http://localhost:8081/profile/changepassword', value)
        .then(res => {
          // console.log(res.data)
          alert(res.data.Message)
          window.location.reload()
        })
      .catch(err => console.log(err));
      }
      else{
        console.log("Password doesnt match")
      }
    } 
  }


  return (
    (<div>
      <h1>{name}</h1>
      <button onClick={handleClick}>Show</button>
      <button onClick={handleLogout}>Logout</button><br />
      <label htmlFor="Change name">Change Name</label><br />
      <Box component='form' onSubmit={handleChangeName}>
        <input required type="text" name='newname' placeholder='New name' onChange={handleNewname} /><br />
        <button type="submit">Confirm</button>
      </Box>
      <label htmlFor="Change password">Change Password</label><br /><br />
      <Box component='form' onSubmit={handleChangePassword}>
        <input required type="text" name='currentPassword' placeholder='Current password' onChange={handleCurrentPassword} /><br />
        <input required type="text" name='newPassword' placeholder='New password' onChange={handleNewPassword}/><br />
        <input required type="text" name='newPasswrodConfirm' placeholder='Confirm password' onChange={handleNewPasswordConfirm}/><br />
        <button type="submit">Change Password</button>
      </Box>
    </div>)

  )
}

export default Profile