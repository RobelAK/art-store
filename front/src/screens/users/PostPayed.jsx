import { Button, Container } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function PostPayed() {
  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token) {
      const user = JSON.parse(atob(token.split(".")[1]));
      axios
      .post("http://localhost:8081/postpayment", {userId: user.id})
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => console.log(err));
    }
  }, []);
  const navigate = useNavigate()
  const handleClick = ()=>{
    navigate('/')
  }
  return (
    <Container>
      <div>Thank u for purchasing items from out store u can track items status in the cart</div>
      <Button onClick={handleClick}>back to home</Button>
    </Container>
  )
}

export default PostPayed