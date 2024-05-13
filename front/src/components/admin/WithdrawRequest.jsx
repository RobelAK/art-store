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
} from "@mui/material";
import axios from "axios";

const WithdrawRequest = () => {
  const [users, setUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8081/Withdraw/request");
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

  const handlePayed = async (id, userId) => {
    if (window.confirm('Are you sure you payed this user?')) {
      try {
        await axios.put(`http://localhost:8081/payed/user/${id}`, {userId});
        // Refresh data after approval
        fetchData();
      } catch (error) {
        console.error("Error approving user:", error);
      }
    }
  };
  

  return (
    <div>
      <Container
        style={{
          justifyContent: "space-between",
          display: "flex",
          marginBottom: "10px",
        }}
      >
      </Container>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              users.map((user,x) => (
                <TableRow key={user.id}>
                  <TableCell>{x+1}</TableCell>
                  <TableCell>{user.fname} { user.Lastname}</TableCell>
                  <TableCell>{user.total_revenue}</TableCell>

                  <TableCell>
                    <ButtonGroup>
                  <Button variant="contained" onClick={() => handleViewDetails(user)}>
                      Detail
                    </Button>
                    <Button onClick={() => handlePayed(user.id , user.user_id)}>
                      Payed
                    </Button>
                    </ButtonGroup>
                    
                  </TableCell>
                </TableRow>
              )))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Transaction Detail</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <div>
              <Typography gutterBottom  fontFamily={"sora"} >User_id: {selectedUser.user_id} </Typography>
              <Typography gutterBottom  fontFamily={"sora"} >First Name: {selectedUser.fname} </Typography>
              <Typography gutterBottom  fontFamily={"sora"} >Last Name: {selectedUser.Lastname} </Typography>
              <Typography gutterBottom  fontFamily={"sora"}>Bank: {selectedUser.bank} </Typography>
              <Typography gutterBottom  fontFamily={"sora"}>Amount: {selectedUser.total_revenue} </Typography>
              <Typography gutterBottom  fontFamily={"sora"}>Phone No: {selectedUser.Phone_no} </Typography>
              <Typography gutterBottom  fontFamily={"sora"}>Account No: {selectedUser.Account_no} </Typography>
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

export default WithdrawRequest;
