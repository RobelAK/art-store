import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './screens/users/Signup'
import Login from './screens/users/Login'
import ProfilePage from './screens/users/ProfilePage'
import Forgotpassword from './screens/users/Forgotpassword'
import Landingpage from './screens/users/Landingpage'
import DiscoverArt from './screens/users/DiscoverArt'
import Product from './screens/users/Product'
import Profile from './screens/users/Profile'
import Checkout from './components/users/Checkout'
import CartPage from './screens/users/CartPage'
import Dashboard from './screens/Admin/Dashboard'
import EditProfilePage from './components/users/EditProfilePage'
import SignupAs from './screens/users/SignupAs'
import Something from './screens/users/Something'



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landingpage />}></Route>
        <Route path='/arts' element={<DiscoverArt />}></Route>
        <Route path='/product' element={<Product />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/Checkout' element ={<Checkout/>}></Route>
        <Route path='/cart' element = {<CartPage/>}></Route>
        <Route path='/Dashboard' element = {<Dashboard/>}></Route>
        <Route path='/profilepage' element={<ProfilePage/>}></Route>
        <Route path='/editprofile' element= {<EditProfilePage/>}></Route>
        <Route path='/signupas' element= {<SignupAs/>}></Route>
        <Route path='/forgotpassword' element={<Forgotpassword />}></Route>
        <Route path='/something' element={<Something />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App