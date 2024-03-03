import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, Link} from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleEmail = (event) =>{
        setEmail(event.target.value)
    }
    const handlePassword = (event)=> {
        setPassword(event.target.value)
    }
    const values = {
        email: email, 
        password: password,
    }
    
    const navigate = useNavigate()
    axios.defaults.withCredentials = true
    const [error, setError] = useState(null)
    const handleSubmit = (event) =>{
        event.preventDefault();
        axios.post('http://localhost:8081/login', values)
        .then(res => {
            if(res.data.loginStatus){ 
                navigate('/profile')
            }
            else{
                setError(res.data.Error)
            }
        })
        .catch(err => console.log(err));
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div className='mb3'>
                <label htmlFor="email" className='form-label'>Email</label>
                <input type="email" name="email" onChange={handleEmail} required/>
            </div>
            <div className='mb3'>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" onChange={handlePassword} required/>
            </div>
            <button type="submit">Login</button>
        </form>
        <div className="text-warning">
            {error && error}
        </div>
        <Link to='/signup'>Dont have an account</Link>
    </div>
  )
}

export default Login