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
  }
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


  const [newname, setNewname] = useState('')

  const handleNewname = (event) => {
    setNewname(event.target.value)
  }
  const handleChangeName = (event) => {
    event.preventDefault();
    const value = {
      newname: newname,
      userInfo: userInfo
    }
    axios.post('http://localhost:8081/profile/changename', value)
      .then(res => {
        userInfo.name = newname
        const newname2 = userInfo.name
        
        const token = jwt.sign(
          {id, newname2, email, password },
          "jwt_secret_key",
          { expiresIn: "1d" }
        );
        // Cookies.set('token',token)
        console.log(newname)
      })
      .catch(err => console.log(err));
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
      <input type="text" placeholder='Current password' /><br />
      <input type="text" placeholder='New password' /><br />
      <input type="text" placeholder='Confirm password' /><br />

    </div>)

  )
}

export default Profile