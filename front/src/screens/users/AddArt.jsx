import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../../components/users/Footer";

function AddArt() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [art, setArt] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8081/categories")
      .then((res) => {
        console.log(res.data);
        setCategoryList(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleUpload = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("art", art);
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token is not available");
        return;
      }

      const user = JSON.parse(atob(token.split(".")[1]));
      const userId = user.id;
      const artist = user.name;
      formData.append("user_id", userId);
      formData.append("artist", artist);
      axios
        .post("http://localhost:8081/art/upload", formData)
        .then((res) => {
          if (res.data.status === "Success") {
            navigate("/message");
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.error("Error uploading artwork:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setArt(file);
  };

  return (
    <>
      <Container
        sx={{ height: "50px", maxWidth: "325px", bgcolor: "#fffff" }}
      />
      <Container
        style={{ alignContent: "center", display: "flow" }}
        maxWidth="md"
      >
        <Typography
          variant="h4"
          sx={{ fontFamily: "sora,sans-serif" }}
          gutterBottom
        >
          Add New Art
        </Typography>
        <Grid container spacing={3} component="form" onSubmit={handleUpload}>
          <Grid item xs={12}>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="image-upload"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="image-upload">
              <Button
                variant="outlined"
                color="primary"
                component="span"
                startIcon={<PhotoCamera />}
              >
                Upload Image
              </Button>
            </label>
            {art && (
              <div>
                <img
                  src={URL.createObjectURL(art)}
                  alt="Uploaded Art"
                  style={{ maxWidth: "100%", marginTop: 10 }}
                />
              </div>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Title"
              name="title"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                fullWidth
                required
              >
                {categoryList.map((x) => (
                  <MenuItem key={x.id} value={x.name}>
                    {x.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Price (birr)"
              type="tel"
              name="price"
              value={price}
              fullWidth
              onChange={(e) => setPrice(e.target.value.trim())}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">birr</InputAdornment>
                ),
              }}
              inputProps={{
                maxLength: 3,
              }}
              required
            />
          </Grid>

          <Grid item xs={6}>
            <Button variant="contained" color="primary" type="submit">
              Add Art
            </Button>
            <Button
              variant="outlined"
              style={{ margin: "15px" }}
              component={Link}
              to="/"
              color="primary"
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Container>
      <Container
        sx={{ height: "20px", maxWidth: "325px", bgcolor: "#fffff" }}
      />
      <Footer />
    </>
  );
}

export default AddArt;
