import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Container,
  ButtonGroup,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";

const WithdrawalList = () => {
  const [users, setUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8081/Withdraw/all");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
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
    <Container>
      <Box mb={3} display="flex" justifyContent="center" alignItems="center">
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              users.map((user,x) => (
                <TableRow key={user.id}>
                  <TableCell>{x+1}</TableCell>
                  <TableCell>{user.fname} { user.Lastname}</TableCell>
                  <TableCell>{new Date(user.datetime).toLocaleString()}</TableCell>
                  <TableCell>{user.total_revenue} birr</TableCell>

                  <TableCell>
                    <ButtonGroup>
                      <Button variant="contained" onClick={() => handleViewDetails(user)}>
                        Detail
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Transaction Detail</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <div>
              <Typography variant="subtitle1" gutterBottom>
                User ID: {selectedUser.user_id}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Full Name: {selectedUser.fname} {selectedUser.Lastname}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Bank: {selectedUser.bank}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Amount: {selectedUser.total_revenue}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Phone No: {selectedUser.Phone_no}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Account No: {selectedUser.Account_no}
              </Typography>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default WithdrawalList;
