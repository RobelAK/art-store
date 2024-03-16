import { green } from '@mui/material/colors';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, IconButton, TextField, ThemeProvider, createTheme } from '@mui/material';


function Something() {
  const [users,setUsers] = useState([])
  useEffect(()=>{
    axios.get('http://localhost:8081/something')
    .then(res => {
      setUsers(res.data)
      console.log(res.data)
    })
    .catch(err => console.log(err));
  }, [])
  
  return (
    <div className='vh-100 vw-100 d-flex align-items-center justify-content-center'>
      <table className='table w-50 border-black'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
          users.map((data, i)=>(
            <tr key = {i}>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td>
                <button className=''>delete</button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
    </div>
    
  )
}

export default Something