import React, { useEffect } from 'react';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './screens/users/Signup';
import Login from './screens/users/Login';
import ProfilePage from './screens/users/ProfilePage';
import Forgotpassword from './screens/users/Forgotpassword';
import Landingpage from './screens/users/Landingpage';
import DiscoverArt from './screens/users/DiscoverArt';
import Product from './screens/users/Product';
import Checkout from './components/users/Checkout';
import CartPage from './screens/users/CartPage';
import Dashboard from './screens/Admin/Dashboard';
import SignupAs from './screens/users/SignupAs';
import AddArt from './screens/users/AddArt';
import ArtSubmissionMessage from './components/users/ArtSubmissionMessage';
import ResetPassword from './forgot_password/ResetPassword';
import ReceiveEmail from './forgot_password/ReceiveEmail';
import WaitingArt from './components/admin/WaitingArt';
import SellerProfile from './screens/users/SellerProfile';
import Bookmark from './screens/users/Bookmark';
import BranchHome from './screens/Branch/BranchHome';
import Catagory from './screens/users/Catagory';
import AboutUs from './screens/users/AboutUsPage';
import PrintedScreen from './screens/Branch/PrintedScreen';
import NotFound from './components/users/NotFound';
import PostPayed from './screens/users/PostPayed';


const decodeToken = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (error) {
    return null;
  }
}

function App() {
  const isAuthorized = (roles) => {
    const token = localStorage.getItem('token');
  
  const token = localStorage.getItem('token');
  const isAuthorized = (role) => {
    const userRole = token ? decodeToken(token).role : null;
    return roles.includes(userRole);
  };

  const RenderProfilePage = () => {
    if (isAuthorized(['seller'])) {
      return <SellerProfile />;
    }
    else if (isAuthorized(['buyer'])){
      return <ProfilePage/>;
    } else {
      return <Navigate to="/NotFound" replace />;
    }
  };
  const RenderSignas = () => {
    if (isAuthorized(['buyer'])) {
      return <SignupAs />;
    } else {
      return <Navigate to="/NotFound" replace />;
    }
  };


  const RenderAddart = () => {
    if (isAuthorized(['seller'])) {
      return <AddArt />;
    } else {
      return <Navigate to="/NotFound" replace />;
    }
  };
  const RenderLogin = () => {
    if (isAuthorized(['branch'])) {
      return <BranchHome />;
    }
    else if (isAuthorized(['admin'])){
      return <Dashboard />;
    }
    
    else {
      return <Landingpage/>;
    }
  }

    return userRole === role;
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RenderLogin/>} />
        <Route path='*' element={<NotFound />} />
        <Route path='/Home' element={<Landingpage />} />
        <Route path='/' element={<Landingpage />} />
        <Route path='/arts' element={<DiscoverArt />} />
        <Route path='/product/:id' element={<Product />} />

        <Route path='/login' element={!token ?  <Login /> : <Navigate to="/" replace />} />
        <Route path='/signup' element={!token ?  <Signup /> : <Navigate to="/" replace />} />

        <Route path='/Checkout' element={<Checkout />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/message' element={<ArtSubmissionMessage />} />
        <Route path='/addart' element={<RenderAddart/>} />
        {/* <Route path='/addart' element={<AddArt />} /> */}
        <Route path='/addart' element={ isAuthorized('seller') ?  <AddArt /> : <Navigate to="/signupas" replace /> } />
        <Route path='/category' element={<Catagory />} />
        <Route path='/profilepage' element={<RenderProfilePage />} />
        <Route path='/signupas' element={<RenderSignas/>} />
        <Route path='/profilepage' element={ isAuthorized('buyer') ?  <ProfilePage /> : <Navigate to="/SellerProfile" replace /> } />
        <Route path='/signupas' element={ isAuthorized('buyer') ?  <SignupAs /> : <Navigate to="/" replace /> } />
        <Route path='/saved' element={<Bookmark />} />
        <Route path='/forgotpassword' element={<Forgotpassword />} />
        <Route path='/ResetPassword' element={<ResetPassword />} />
        <Route path='/ReceiveEmail' element={<ReceiveEmail />} />
        <Route path='/WaitingArt' element={isAuthorized(['admin']) ? <WaitingArt /> : <Navigate to="/NotFound" replace />} />
        <Route path='/WaitingPrint' element={isAuthorized(['branch']) ? <BranchHome /> : <Navigate to="/NotFound" replace />} />
        <Route path='/Printed' element={isAuthorized(['branch']) ? <PrintedScreen /> : <Navigate to="/NotFound" replace />} />
        <Route path='/WaitingArt' element={ isAuthorized('admin') ? <WaitingArt /> : <Navigate to="/" replace /> } />


        <Route path='/branch' element={ isAuthorized('branch') ? <BranchHome /> : <Navigate to="/" replace />} />
        <Route path='/WaitingPrint' element={isAuthorized('branch') ?  <BranchHome /> : <Navigate to="/" replace /> } />
        <Route path='/Printed' element={isAuthorized('branch') ? <PrintedScreen />: <Navigate to="/" replace /> } />

        
        <Route path='/about' element={<AboutUs />} />
        <Route path='/dashboard' element={isAuthorized(['admin']) ? <Dashboard /> : <Navigate to="/NotFound" replace />} />
        <Route path='/sellerprofile' element={isAuthorized(['seller']) ? <SellerProfile /> : <Navigate to="/Notfound" replace />} />
        <Route path='/dashboard' element={ isAuthorized('admin') ? <Dashboard /> : <Navigate to="/admin" replace />} />
        <Route path='/sellerprofile' element={ isAuthorized('seller') ? <SellerProfile /> : <Navigate to="/signupas" replace />} />
        <Route path='/postpayed' element={< PostPayed/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
