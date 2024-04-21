import React from 'react';
import NavBranch from '../../components/Branch/NavBranch';
import WaitingPrints from '../../components/Branch/WaitingPrints';
import { Box } from '@mui/material';



export default function BranchHome() {
  return (
    <Box sx={{
      backgroundColor:'#d4d6d9',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
        <NavBranch />
        <WaitingPrints />
    </Box>
  );
}
