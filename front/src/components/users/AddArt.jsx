import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Grid, Select, MenuItem, FormControl, InputLabel, InputAdornment } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import Footer from './Footer';

function AddArt() {
  axios.defaults.withCredentials = true
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [art, setArt] = useState(null);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  // Get userId from the token
  let userId = '';
  const token = Cookies.get('token');
  if (token) {
    const tokenParts = token.split('.');
    if (tokenParts.length === 3) {
      const payload = JSON.parse(atob(tokenParts[1]));
      userId = payload.id;
    } else {
      // Handle case where token format is incorrect
      console.error('Token format is incorrect');
    }
  } else {
    // Handle case where token is not available
    console.error('Token is not available');
  }

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("price", price);
      formData.append('art', art);

      // Append userId to form data
      formData.append('user_id', userId);

      const response = await axios.post('http://localhost:8081/add/upload', formData);

      if (response.data.status === "Success") {
        setMsg("");
        navigate('/message');
      } else {
        setMsg(response.data.message || "Unknown error occurred");
      }
    } catch (error) {
      console.error("Error uploading artwork:", error);
      setMsg("Network error occurred. Please try again.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setArt(file);
  };

  return (
    <>
      <Container sx={{ height: '50px', maxWidth: '325px', bgcolor: '#fffff' }} />
      <Container style={{ alignContent: "center", display: 'flow' }} maxWidth="md">
        <Typography variant="h4" sx={{ fontFamily: 'sora,sans-serif' }} gutterBottom>
          Add New Art
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
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
                <img src={URL.createObjectURL(art)} alt="Uploaded Art" style={{ maxWidth: '100%', marginTop: 10 }} />
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
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                fullWidth
              >
                <MenuItem value="landscape">Landscape</MenuItem>
                <MenuItem value="portrait">Portrait</MenuItem>
                <MenuItem value="abstract">Abstract</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Price (birr)"
              type="number"
              name="price"
              value={price}
              fullWidth
              onChange={(e) => setPrice(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start">birr</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={6} >
            <Button variant="contained" onClick={handleUpload} color="primary"  >
              Add Art
            </Button>
            <Button variant="outlined" style={{ margin: '15px' }} component={Link} to="/" color="primary">
              Cancel
            </Button>
            <Typography variant="body1" style={{ textAlign: 'center', marginTop: '20px' }}>{msg}</Typography>
          </Grid>
        </Grid>
      </Container>
      <Container sx={{ height: '20px', maxWidth: '325px', bgcolor: '#fffff' }} />
      <Footer />
    </>
  );
}

export default AddArt;
