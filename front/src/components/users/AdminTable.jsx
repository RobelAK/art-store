import React from 'react'

function AdminTable() {
  axios.post('http://localhost:8081/admintables', values)
      .then(res => {
        if (res.data.loginStatus) {
          navigate('/profile')
        }
        else {
          console.log('wrong email or password')
        }
      })
      .catch(err => console.log(err));
  return (
    <div>AdminTable</div>
  )
}

export default AdminTable