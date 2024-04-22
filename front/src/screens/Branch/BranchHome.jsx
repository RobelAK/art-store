import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container, Card, CardContent, Grid } from '@mui/material';
import BranchMenu from '../../components/Branch/BranchMenu';

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


export default function BranchHome() {


  const [userData,setUserData] = useState([])
  useEffect(() => {
    
    axios
      .get("http://localhost:8081/branch")
      .then((res) => {
        setUserData(res.data)
        console.log(res.data)
      })
      .catch((err) => console.log(err));
  }, []);

  const parseData = (stringifiedData) => {
    try {
      return JSON.parse(stringifiedData);
    } catch (error) {
      console.error('Error parsing data:', error);
      return [];
    }
  };

  return (
    <Box sx={{
      backgroundColor:'#d4d6d9',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
    }}>
        
    <Navbar position="fixed">
      <Toolbar>
        <NavbarTitle variant="h6" color="inherit" component="div">
          My Branch
        </NavbarTitle>
        <NavLinks>
          <Link to="/branch">Waiting</Link>
          <Link to="/Printed">Printed</Link>
          <Link to="/delivered">Delivered</Link>
        </NavLinks>
        <BranchMenu/>
      </Toolbar>
    </Navbar>
    
    <Container>
      <Container sx={{ height: '100px',  }}></Container>
      <Typography variant="h5" color={'GrayText'} component="div" gutterBottom fontFamily="sora,sans-serif" textAlign="center">
        Waiting Prints
      </Typography>
      
      {userData.map((item, i)=>(
        <Card key={i} style={{ marginBottom: '20px' }}>
          <CardContent>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${item.name}-content`}
                id={`panel${item.tx_ref}-header`}
              >
                <Typography variant="h6" marginRight='25px' >Buyers name </Typography>
                <Typography variant="h6">Tx_ref</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div>
                  {parseData(item.data).map((art, index) => (
                    <Card key={index} style={{ marginBottom: '10px' }}>
                      <CardContent>
                        <Typography sx={{marginRight:'5px'}} variant="subtitle1">Title: {art.art}</Typography>
                        <Typography sx={{marginRight:'5px'}} variant="subtitle1">Size: {art.size}</Typography>
                        <Typography sx={{marginRight:'5px'}} variant="subtitle1">Quantity: {art.quantity}</Typography>
                        
                        
                        
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </AccordionDetails>
            </Accordion>
          </CardContent>
        </Card>
      ))}
    </Container>
    </Box>
  );
}

