import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Select, MenuItem, FormControl, InputLabel, InputAdornment } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import Footer from './Footer';
import { Link,  } from 'react-router-dom';
import axios from 'axios';

function AddArt () {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [art, setArt] = useState(null);
  const [msg, setMsg] = useState("");
 
  const handleUpload = () => {
    const formData = new FormData()
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    formData.append('art', art);
  
    axios.post('http://localhost:8081/add/upload', formData)
      .then((response) => {
        console.log(response);
        if(response.data.Status === 'Success') {
          setMsg("");
          window.location.href = '/message'; 
        } else {
          setMsg(response.data.message || "Unknown error occurred"); 
        }
      })
      .catch(err => {
        console.log(err);
        setMsg("Network error occurred. Please try again.");
      });
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
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              label="Description" 
              name="description"
              multiline
              rows={4} 
              onChange={(e) => setDescription(e.target.value)}
              fullWidth 
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
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
              fullWidth
              onChange={(e) => setPrice(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start">birr</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={6} >
            <Button variant="contained" onClick={handleUpload} color="primary" component={Link} to="/message" >
              Add Art
            </Button>
            <Button variant="outlined" style={{ margin: '15px' }} component={Link} to="/" color="primary">
              Cancel
            </Button>
            <h1 style={{fontSize: '15px', textAlign: 'center', marginTop: '20px'}}>{msg}</h1>
          </Grid>
        </Grid>
      </Container>
      <Container sx={{ height: '20px', maxWidth: '325px', bgcolor: '#fffff' }} />
      <Footer />
    </>
  );
};

export default AddArt;
