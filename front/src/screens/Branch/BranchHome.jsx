import React, { useEffect, useState } from 'react';
import NavBranch from '../../components/Branch/NavBranch';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, Container, IconButton } from "@mui/material";





export default function BranchHome() {
  const [userData,setUserData] = useState([])
  const [userId,setUserId] = useState('')
  const [tx_ref,setTx_ref] = useState('')
  useEffect(() => {
    
    axios
      .get("http://localhost:8081/branch")
      .then((res) => {

        // // console.log(res.data);
        // const parsedData = JSON.parse(res.data[0].data);
        setUserData(res.data)
        // console.log(res.data[0].data)
        console.log(res.data)
      })
      .catch((err) => console.log(err));
  }, []);
  const handleClick = (e)=>{
    console.log(parsed)
  }
  const parseData = (stringifiedData) => {
    try {
      return JSON.parse(stringifiedData);
    } catch (error) {
      console.error('Error parsing data:', error);
      return [];
    }
  };
  return (
    <div>
      {/* <NavBranch/> */}
      <div className="cont">
        <button onClick={handleClick}>click here</button>
        <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>Tx_ref</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((item, i) => (
              <TableRow key={i}>
                <TableCell>{item.user_id}</TableCell>
                <TableCell>{item.tx_ref}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
      
    </div>
  );
}



// {parseData(item.data).map((art, index) => (
//   <React.Fragment key={index}>
//     <TableCell>{art.art}</TableCell>
//   </React.Fragment>
// ))}
