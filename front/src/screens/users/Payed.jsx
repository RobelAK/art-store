import React, { useEffect } from 'react'


function Payed() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(atob(token.split(".")[1]));
      setId(user.id);
      setName(user.name);
      setEmail(user.email);
    }
  }, []);
  return (
    <div>Payed</div>
  )
}

export default Payed