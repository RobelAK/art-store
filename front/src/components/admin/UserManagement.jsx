import React, { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, Container, IconButton } from "@mui/material";
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [originalUsers, setOriginalUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8081/admin/userstable')
      .then(res => {
        setUsers(res.data);
        setOriginalUsers(res.data);
        // console.log(res.data)
      })
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      axios
        .delete(`http://localhost:8081/user/delete/${id}`)
        .then((res) => {
          setUsers(users.filter((user) => user.id !== id));
          console.log(res.data);
          // window.location.reload()
        })
        .catch((err) => console.log(err));
    }
  };
  const handleSearch = () => {
    const filteredUsers = originalUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedRole === 'all' || user.role === selectedRole)
    );
    setUsers(filteredUsers);
  };

  const handleRoleChange = (event) => {
    const selectedRole = event.target.value;
    setSelectedRole(selectedRole);
    
    if (selectedRole === 'all') {
      setUsers(originalUsers);
    } else {
      const filteredUsers = originalUsers.filter(user => user.role === selectedRole);
      setUsers(filteredUsers);
    }
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  

  return (
    <div>
      <Container style={{ justifyContent: 'space-between', display: 'flex', marginBottom: '10px' }}>
        <Container style={{ display: 'flex', marginLeft: '10px' }}>
          <TextField
            sx={{ marginLeft: '10px' }}
            label="Search"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="contained" onClick={handleSearch}>
            Search
          </Button>
        </Container>

        <Select value={selectedRole} onChange={handleRoleChange} variant="outlined">
          <MenuItem value="all">All Roles</MenuItem>
          <MenuItem value="buyer">buyer</MenuItem>
          <MenuItem value="seller">seller</MenuItem>
          <MenuItem value="admin">admin</MenuItem>
        </Select>
      </Container>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((data, i) => (
              <TableRow key={i}>
                <TableCell>{data.id}</TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.email}</TableCell>
                <TableCell>{data.role}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDelete(data.id)}> <DeleteIcon/> </IconButton> 
                  <Button onClick={() => handleViewDetails(data)}>Detail</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>User Details</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <div>
              <p>ID: {selectedUser.id}</p>
              <p>Name: {selectedUser.name}</p>
              <p>Email: {selectedUser.email}</p>
              <p>Role: {selectedUser.role}</p>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserManagement;
