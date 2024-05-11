import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PaletteIcon from '@mui/icons-material/Palette';
import HourglassFullIcon from '@mui/icons-material/HourglassFull';
import StorefrontIcon from '@mui/icons-material/Storefront';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import Overview from '../../components/admin/Overview';
import UserManagement from '../../components/admin/UserManagement';
import WaitingArt from '../../components/admin/WaitingArt';
import AdminMenu from '../../components/admin/AdminMenu';
import AvilableArts from '../../components/admin/AvilableArts';
import WaitingUsers from '../../components/admin/WaitingUsers';
import Seller from '../../components/admin/Seller';
import Branch from '../../components/admin/Branch';
import Admins from '../../components/admin/Admins';
import WithdrawRequest from '../../components/admin/WithdrawRequest';
import WithdrawalList from '../../components/admin/WithdrawalList';
import SalesList from '../../components/admin/SalesList';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const PersistentDrawerLeft = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [selectedComponent, setSelectedComponent] = useState('Overview');

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleListItemClick = (component) => {
    setSelectedComponent(component);
  };

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#f0f1f2' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <AdminMenu />
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Overview','Admins', 'Users', 'Sellers', 'Branches', 'Artworks' ,'withdrawals', 'Sales'].map((text, index) => (
            <ListItem
              key={text}
              disablePadding
              button
              onClick={() => handleListItemClick(text)}
            >
              <ListItemButton>
                {index === 0 && <ListItemIcon><AccountTreeIcon /></ListItemIcon>}
                {index === 1 && <ListItemIcon><AdminPanelSettingsIcon /></ListItemIcon>}
                {index === 2 && <ListItemIcon><PersonIcon /></ListItemIcon>}
                {index === 3 && <ListItemIcon><StorefrontIcon /></ListItemIcon>}
                {index === 4 && <ListItemIcon><HomeWorkIcon /></ListItemIcon>}
                {index === 5 && <ListItemIcon><PaletteIcon /></ListItemIcon>}
                {index === 6 && <ListItemIcon><AccountBalanceIcon /></ListItemIcon>}
                {index === 7 && <ListItemIcon><MonetizationOnIcon /></ListItemIcon>}
               
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Pending Art', 'Pending Sellers', 'Waiting Withdraws'].map((text, index) => (
            <ListItem
              key={text}
              disablePadding
              button
              onClick={() => handleListItemClick(text)}
            >
              <ListItemButton>
                {index === 0 && <ListItemIcon><HourglassFullIcon /></ListItemIcon>}
                {index === 1 && <ListItemIcon><HourglassTopIcon /></ListItemIcon>}
                {index === 2 && <ListItemIcon><HourglassBottomIcon /></ListItemIcon>}
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {selectedComponent === 'Overview' ? <Overview /> : []}
        {selectedComponent === 'Admins' ? <Admins /> : []}
        {selectedComponent === 'Users' ? <UserManagement /> : []}
        {selectedComponent === 'Sellers' ? <Seller/> : []}
        {selectedComponent === 'Branches' ? <Branch/> : []}
        {selectedComponent === 'Pending Art' ? <WaitingArt /> : []}
        {selectedComponent === 'withdrawals' ? <WithdrawalList /> : []}
        {selectedComponent === 'Sales' ? <SalesList /> : []}
        {selectedComponent === 'Artworks' ? <AvilableArts /> : []}
        {selectedComponent === 'Pending Sellers' ? <WaitingUsers /> : []}
        {selectedComponent === 'Waiting Withdraws' ? <WithdrawRequest /> : []}
      </Main>
    </Box>
  );
};

export default PersistentDrawerLeft;
