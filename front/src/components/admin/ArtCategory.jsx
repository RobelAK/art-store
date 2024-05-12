import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
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
  IconButton,
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
} from "@mui/material";
import axios from "axios";

const ArtCategory = () => {
  const [categories, setCategories] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8081/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this Branch?")) {
      axios
        .delete(`http://localhost:8081/category/delete/${id}`)
        .then((res) => {
          setCategories(categories.filter((category) => category.id !== id));
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleAddCategory = () => {
    axios
      .post("http://localhost:8081/addCategory", { categoryName: categoryName })
      .then((res) => {
        console.log(res.data);
        axios
          .get("http://localhost:8081/categories")
          .then((res) => {
            setCategories(res.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
      });

    setOpenDialog(false);
    setCategoryName("");
  };

  return (
    <div>
      <Container>
        <Card sx={{ margin: "10px", justifyContent: "center" }}>
          <CardContent>
            <Typography gutterBottom fontFamily="sora">
              {" "}
              Click here to Create a new Category
            </Typography>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => setOpenDialog(true)}
            >
              Add Category
            </Button>
          </CardContent>
        </Card>
        <Typography
          marginTop="20px"
          align="center"
          gutterBottom
          fontFamily="sora"
          fontWeight="bold"
        >
          {" "}
          List of available Categories
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>No</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Name</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((x, index) => (
                <TableRow key={x.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{x.name}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDelete(x.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Branch Location"
            variant="filled"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            onClick={handleAddCategory}
            variant="contained"
            color="primary"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ArtCategory;
