import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Container,
} from "@mui/material";
import axios from "axios";

const WaitingUsers = () => {
  const [users, setUsers] = useState([]);
  const [originalUsers, setOriginalUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8081/sellers/waiting");
      setUsers(response.data);
      setOriginalUsers(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = () => {
    const filteredUsers = originalUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleApprove = async (id) => {
    try {
      console.log("Approving seller with ID:", id);
      await axios.put(`http://localhost:8081/seller/approve/${id}`);
      console.log("Seller approved successfully");
      fetchData();
    } catch (error) {
      console.error("Error approving seller:", error);
    }
  };

  const handleDecline = async (id) => {
    try {
      console.log("Declining seller with ID:", id);
      await axios.delete(`http://localhost:8081/seller/decline/${id}`);
      console.log("Seller declined successfully");
      fetchData();
    } catch (error) {
      console.error("Error declining seller:", error);
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
        <Container style={{ display: "flex", marginLeft: "10px" }}>
          <TextField
            sx={{ marginLeft: "10px" }}
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
              <TableCell>Portfolio Link</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => window.open(user.portfolio_link, "_blank")}
                  >
                    View
                  </Button>
                </TableCell>

                <TableCell>
                  <Button onClick={() => handleApprove(user.id)}>
                    Approve
                  </Button>
                  <Button onClick={() => handleDecline(user.id)}>
                    Decline
                  </Button>
                  <Button onClick={() => handleViewDetails(user)}>
                    Detail
                  </Button>
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
              <p>
                <Button
                  variant="outlined"
                  onClick={() => window.open(selectedUser.portfolio_link, "_blank")}
                >
                  open portfolio
                </Button>
              </p>
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
