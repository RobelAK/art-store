import axios from 'axios';
import React, { useEffect } from 'react'

function PostPayed() {
  useEffect(() => {
    const token = localStorage.getItem('token')
    axios
        .post("http://localhost:8081/payment/callback")
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => console.log(err));
  }, []);
  return (
    <div>Thank u for purchasing items from out store u can track items status in the cart</div>
  )
}

export default PostPayed