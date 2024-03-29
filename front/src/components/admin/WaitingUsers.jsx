import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Container, IconButton } from "@mui/material";
import axios from 'axios';

const WaitingUsers = () => {
  const [users, setUsers] = useState([]);
  const [originalUsers, setOriginalUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8081/admin/userstable')
      .then(res => {
        setUsers(res.data);
        setOriginalUsers(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      axios.put('http://localhost:8081/admin/deleteuser/' + id)
        .then(res => {
          setUsers(users.filter(user => user.id !== id));
        })
        .catch(err => console.log(err));
    }
  };

  const handleSearch = () => {
    const filteredUsers = originalUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setUsers(filteredUsers);
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleApprove = (id) => {
    // Implement the logic to approve the user
    console.log('User approved with ID:', id);
  };

  const handleDecline = (id) => {
    // Implement the logic to decline the user
    console.log('User declined with ID:', id);
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
      </Container>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Link</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((data, i) => (
              <TableRow key={i}>
                <TableCell>{data.id}</TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.email}</TableCell>
                <TableCell>
                  <Button onClick={() => handleApprove(data.id)}>Approve</Button>
                  <Button onClick={() => handleDecline(data.id)}>Decline</Button>
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
              <p>Link: {selectedUser.Link}</p>
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

export default WaitingUsers;
