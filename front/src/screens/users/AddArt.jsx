import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Select, MenuItem, FormControl, InputLabel, InputAdornment } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from '../../components/users/Footer';

function AddArt() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [art, setArt] = useState(null);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleUpload = async (event) => {
    
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("price", price);
      formData.append('art', art);
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token is not available');
        return;
      }

      // Decode the token to extract user id
      const user = JSON.parse(atob(token.split(".")[1]));
      const userId = user.id;
      const artist = user.name;

      // Append userId to form data
      formData.append('user_id', userId);
      formData.append('artist', artist);
      console.log("Form Data User ID:", formData.get('user_id'));

      const response = await axios.post('http://localhost:8081/art/upload', formData);

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
        <Grid container spacing={3} component="form" onSubmit={handleUpload}>
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
                <MenuItem value="Abstract">Abstract</MenuItem>
                <MenuItem value="Animals">Animals</MenuItem>
                <MenuItem value="Anime/Manga">Anime/Manga</MenuItem>
                <MenuItem value="Character Design">Character Design</MenuItem>
                <MenuItem value="Concept Art">Concept Art</MenuItem>
                <MenuItem value="Cyberpunk">Cyberpunk</MenuItem>
                <MenuItem value="Fantasy">Fantasy</MenuItem>
                <MenuItem value="Fan Art">Fan Art</MenuItem>
                <MenuItem value="Graffiti">Graffiti</MenuItem>
                <MenuItem value="Horror">Horror</MenuItem>
                <MenuItem value="Landscapes">Landscapes</MenuItem>
                <MenuItem value="Minimalism">Minimalism</MenuItem>
                <MenuItem value="Nature">Nature</MenuItem>
                <MenuItem value="Pixel Art">Pixel Art</MenuItem>
                <MenuItem value="Pop Art">Pop Art</MenuItem>
                <MenuItem value="Portraits">Portraits</MenuItem>
                <MenuItem value="Sci-Fi">Sci-Fi</MenuItem>
                <MenuItem value="Steampunk">Steampunk</MenuItem>
                <MenuItem value="Surreal">Surreal</MenuItem>
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
              required
            />
          </Grid>
          <Grid item xs={6} >
            <Button variant="contained" color="primary" type='submit' >
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
