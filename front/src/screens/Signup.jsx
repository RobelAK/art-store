import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useNavigate} from 'react-router-dom'

function Signup() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [isValid, setIsValid] = useState(false);  
    const navigate = useNavigate()

    const handleName = (event) =>{
        setName(event.target.value)
    }
    const handleEmail = (event) =>{
        setEmail(event.target.value) 
    }
    const handlePassword = (event) =>{
        setPassword(event.target.value)
        setIsValid(validatePassword(password))
        
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





    const handlePasswordConfirm = (event) =>{
        setPasswordConfirm(event.target.value)
    }
    const values = {
        name: name,
        email: email,
        password: password,
        passwordConfirm: passwordConfirm,
    };
    const handleSubmit = (event) =>{
        event.preventDefault();
        if(!isValid){console.log("password invalid")}
        else {
            axios.post('http://localhost:8081/signup', values)
            .then(res => {
                if(res.data.signup){
                    alert(res.data.Message)
                    navigate('/login')
                }
                else{
                    console.log(res.data)
                }
            })
            .catch(err => console.log(err)); 
        }
    }
  return (
    <div className="cont">
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" onChange={handleName} required/>
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" onChange={handleEmail} required/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" onChange={handlePassword} required/>
            </div>
            <div>
                <label htmlFor="passwordConfirm">Confirm Password</label>
                <input type="password" name="passwordConfirm" onChange={handlePasswordConfirm} required/>
            </div>
            <button type="submit">Signup</button>
        </form>
        <Link to='/login'>Already have an account</Link>
    </div>
  )
}

export default Signup