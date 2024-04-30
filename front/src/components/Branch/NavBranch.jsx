import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import BranchMenu from './BranchMenu';

const Navbar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  boxShadow: 'none',
  background: 'linear-gradient(to right, #2980B9, #6DD5FA)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
}));

const NavbarTitle = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  [theme.breakpoints.up('sm')]: {
    display: 'block',
  },
}));

const NavLinks = styled('div')({
  marginRight: '20px',
  '& a': {
    textDecoration: 'none',
    color: 'white',
    marginRight: '20px',
    transition: 'color 0.3s ease',
    '&:hover': {
      color: '#F9A825',
    },
  },
});

export default function NavBranch() {
 

  return (
    <Navbar position="fixed">
      <Toolbar>
        <NavbarTitle variant="h6" color="inherit" component="div">
          My Branch
        </NavbarTitle>
        <NavLinks>
          <Link to="/WaitingPrint">Waiting</Link>
          <Link to="/Printed">Printed</Link>
          <Link to="/delivered">asdf</Link>
        </NavLinks>
        <BranchMenu/>
      </Toolbar>
    </Navbar>
  );
}
