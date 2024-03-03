import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './screens/users/App';
import SignIn from './screens/users/SignIn';
import SignUp from './screens/users/SignUp';
import Dashboard from './components/admin/Dashboard';
import DiscoverArt from './screens/users/DiscoverArt';
import Product from './screens/users/Product';


import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Cart from './screens/users/Cart';
import ProfilePage from './screens/users/ProfilePage';
import SignUpAs from './screens/users/SignUpAs';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "signin",
    element: <SignIn />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
  {
    path: "signupAs",
    element: <SignUpAs />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "Arts",
    element: <DiscoverArt />,
  },
  {
    path: "Product",
    element: <Product/>,
  },
  {
    path: "cart",
    element: <Cart/>,
  },
  {
    path: "Profile",
    element: <ProfilePage/>,
  },
  

]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
