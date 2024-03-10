import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signup from './screens/users/Signup'
import Login from './screens/users/Login'
import Profile from './screens/users/Profile'
import 'bootstrap/dist/css/bootstrap.min.css'
import Landingpage from './screens/users/Landingpage'
import DiscoverArt from './screens/users/DiscoverArt'
import Product from './screens/users/Product'
import ResetPassword from './forgot_password/ResetPassword'
import ReceiveEmail from './forgot_password/ReceiveEmail'


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landingpage/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/profile' element={<Profile/>}></Route>
      <Route path='/ReceiveEmail' element={<ReceiveEmail/>}></Route>
      <Route path='/arts' element={<DiscoverArt/>}></Route>

      <Route path='/arts' element={<Product/>}></Route>
      <Route path="/reset_password/:id/:token" element={<ResetPassword />}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App