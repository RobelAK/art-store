import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signup from './screens/users/Signup'
import Login from './screens/users/Login'
import ProfilePage from './screens/users/ProfilePage'
import Profile from './screens/users/Profile'
import 'bootstrap/dist/css/bootstrap.min.css'
import Forgotpassword from './screens/users/Forgotpassword'
import Landingpage from './screens/users/Landingpage'


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landingpage/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/profile' element={<Profile/>}></Route>
      <Route path='/profilepage' element={<ProfilePage/>}></Route>
      <Route path='/forgotpassword' element={<Forgotpassword/>}></Route>
    </Routes>
    </BrowserRouter> 
  )
}

export default App