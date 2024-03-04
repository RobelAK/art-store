import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'




function Profile() {

  axios.defaults.withCredentials = true
  const navigate = useNavigate()
  const token = Cookies.get('token')

  let userInfo = ''
  let id = ''
  let email = ''
  let name = ''
  let values = {}

  if (token){
    userInfo = JSON.parse(atob(token.split('.')[1]));
    id = userInfo.id
    email = userInfo.email
    name = userInfo.name
    values = {
      id,
      email,
      name
    }
  }
  else{
    userInfo = 'no token available'
  }
  const handleClick = (event) =>{
    event.preventDefault();
    axios.post('http://localhost:8081/profile', values)
    .then(res =>{
      console.log(res.data)
    })
  }
  const handleLogout =(event =>{
    event.preventDefault();
    Cookies.remove('token')
    navigate('/login')
  })

    
  return (
    (<div>
      <h1>{name}</h1>
      <button onClick={handleClick}>Show</button>
      <button onClick={handleLogout}>Logout</button>
    </div>)
    
  )
}

export default Profile