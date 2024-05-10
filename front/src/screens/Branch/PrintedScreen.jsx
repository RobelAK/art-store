import React from 'react';
import NavBranch from '../../components/Branch/NavBranch';
import { Box } from '@mui/material';
import Printed from '../../components/Branch/Printed';



export default function PrintedScreen() {
  return (
    <Box sx={{
      backgroundColor:'#d4d6d9',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
        <NavBranch />
        <Printed />
        something
    </Box>
  );
}
