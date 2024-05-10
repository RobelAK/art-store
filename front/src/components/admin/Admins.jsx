import React, { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Container, Card, CardContent, Typography, TextField } from "@mui/material";
import axios from 'axios';

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8081/admin/admins')
      .then(res => {
        setAdmins(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this Branch?')) {
      axios
        .delete(`http://localhost:8081/user/delete/${id}`)
        .then((res) => {
          setAdmins(branches.filter((branch) => branch.id !== id));
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleAddAdmin = () => {
    const branchData = {
      name: adminName,
      email: adminEmail,
      password: adminPassword
    };

    axios.post('http://localhost:8081/addadmin', branchData)
      .then((res) => {
        console.log(res.data);
        // Refresh the list of branches
        axios.get('http://localhost:8081/admin/branches')
          .then(res => {
            setAdmins(res.data);
          })
          .catch(err => console.log(err));
      })
      .catch((err) => {
        console.log(err);
        // Handle error
      });

    // Close the dialog
    setOpenDialog(false);
    // Clear the input fields
    setAdminName('');
    setAdminPassword('');
    setAdminEmail('');
  };

  return (
    <div>
      <Container>
        <Card sx={{margin:'10px', justifyContent:'center',}}>
          <CardContent>
            <Typography gutterBottom fontFamily='sora'> Click here to Create a new Branch</Typography>
            <Button variant='outlined' fullWidth onClick={() => setOpenDialog(true)}>
              Add Admin
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
            {admins.map((admin) => (
              <TableRow key={admin.id}>
                <TableCell>{admin.id}</TableCell>
                <TableCell>{admin.name}</TableCell>
                <TableCell>{admin.email}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDelete(admin.id)}> <DeleteIcon/> </IconButton> 
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
            label="Admin Name"
            variant="filled"
            value={adminName}
            onChange={(e) => setAdminName(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Branch Location"
            variant="filled"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            variant="filled"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddAdmin} variant="contained" color="primary">Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Admins