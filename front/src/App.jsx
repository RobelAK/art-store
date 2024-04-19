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
import Checkout from './components/users/Checkout'
import CartPage from './screens/users/CartPage'
import Dashboard from './screens/Admin/Dashboard'
import SignupAs from './screens/users/SignupAs'
import AddArt from './screens/users/AddArt'
import ArtSubmissionMessage from './components/users/ArtSubmissionMessage'
import AdminDashboard from './screens/Admin/AdminDashboard'
import ResetPassword from './forgot_password/ResetPassword'
import ReceiveEmail from './forgot_password/ReceiveEmail'
import WaitingArt from './components/admin/WaitingArt'
import SellerProfile from './screens/users/SellerProfile'
import Bookmark from './screens/users/Bookmark'
import BranchHome from './screens/Branch/BranchHome'
import Catagory from './screens/users/Catagory'
import AboutUs from './screens/users/AboutUsPage'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landingpage />}></Route>
        <Route path='/arts' element={<DiscoverArt />}></Route>
        <Route path='/product/:id' element={<Product />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/Checkout' element ={<Checkout/>}></Route>
        <Route path='/cart' element = {<CartPage/>}></Route>
        <Route path='/message' element= {<ArtSubmissionMessage/>}></Route>
        <Route path='/addart' element = {<AddArt/>}></Route>
        <Route path='/category' element= {<Catagory/>}></Route>
        <Route path='/dashboard' element = {<Dashboard/>}></Route>
        <Route path='/SellerProfile' element={<SellerProfile/>}></Route>
        <Route path='/profilepage' element={<ProfilePage/>}></Route>
        <Route path='/signupas' element= {<SignupAs/>}></Route>
        <Route path='/saved' element= {<Bookmark/>}></Route>
        <Route path='/forgotpassword' element={<Forgotpassword />}></Route>
        <Route path='/admindashboard' element={<AdminDashboard />}></Route>
        <Route path='/ResetPassword' element={<ResetPassword/>}></Route>
        <Route path='/ReceiveEmail' element={<ReceiveEmail/>}></Route>
        <Route path='/WaitingArt' element={<WaitingArt/>}></Route>
        <Route path='/Branch' element={<BranchHome/>}></Route>
        <Route path='/about' element={<AboutUs/>}></Route>
        <Route path="/reset_password/:id/:token" element={<ResetPassword />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App