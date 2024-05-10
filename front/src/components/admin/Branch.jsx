import React, { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Container, Card, CardContent, Typography, TextField } from "@mui/material";
import axios from 'axios';

const Branch = () => {
  const [branches, setBranches] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [branchName, setBranchName] = useState('');
  const [branchEmail, setBranchEmail] = useState('');
  const [branchPassword, setBranchPassword] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8081/admin/branches')
      .then(res => {
        setBranches(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this Branch?')) {
      axios
        .delete(`http://localhost:8081/user/delete/${id}`)
        .then((res) => {
          setBranches(branches.filter((branch) => branch.id !== id));
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleAddBranch = () => {
    const branchData = {
      name: branchName,
      email: branchEmail,
      password: branchPassword
    };

    axios.post('http://localhost:8081/addbranch', branchData)
      .then((res) => {
        console.log(res.data);
        axios.get('http://localhost:8081/admin/branches')
          .then(res => {
            setBranches(res.data);
          })
          .catch(err => console.log(err));
      })
      .catch((err) => {
        console.log(err);
      });

    setOpenDialog(false);
    setBranchName('');
    setBranchEmail('');
    setBranchPassword('');
  };

  return (
    <div>
      <Container>
        <Card sx={{margin:'10px', justifyContent:'center',}}>
          <CardContent>
            <Typography gutterBottom fontFamily='sora'> Click here to Create a new Branch</Typography>
            <Button variant='outlined' fullWidth onClick={() => setOpenDialog(true)}>
              Add Branch
            </Button>
          </CardContent>
        </Card>
        <Typography marginTop='20px' align='center' gutterBottom fontFamily='sora' fontWeight='bold'> List of available Branches</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow >
              <TableCell style={{fontWeight:'bold'}}>ID</TableCell>
              <TableCell style={{fontWeight:'bold'}}>Name</TableCell>
              <TableCell style={{fontWeight:'bold'}}>Location</TableCell>
              <TableCell style={{fontWeight:'bold'}}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {branches.map((branch) => (
              <TableRow key={branch.id}>
                <TableCell>{branch.id}</TableCell>
                <TableCell>{branch.name}</TableCell>
                <TableCell>{branch.email}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDelete(branch.id)}> <DeleteIcon/> </IconButton> 
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Container>

      {/* Add Branch Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Branch</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Branch Location"
            variant="filled"
            value={branchName}
            onChange={(e) => setBranchName(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Branch Email"
            variant="filled"
            value={branchEmail}
            onChange={(e) => setBranchEmail(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            variant="filled"
            value={branchPassword}
            onChange={(e) => setBranchPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddBranch} variant="contained" color="primary">Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Branch;
