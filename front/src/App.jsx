import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signup from './screens/users/Signup'
import Login from './screens/users/Login'
import Profile from './screens/users/Profile'
import Forgotpassword from './screens/users/Forgotpassword'
import 'bootstrap/dist/css/bootstrap.min.css'
import Landingpage from './screens/users/Landingpage'



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landingpage/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/profile' element={<Profile/>}></Route>
      <Route path='/forgotpassword' element={<Forgotpassword/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App