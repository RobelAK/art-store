// RatingComponent.jsx
import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Rating } from '@mui/material';
import axios from 'axios';

const RatingComponent = ({ art_id, user_id }) => {
  const [open, setOpen] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    fetchAverageRating();
  }, [art_id]); // Fetch average rating whenever art_id changes

  const fetchAverageRating = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/rating/average/${art_id}`);
      setAverageRating(response.data.averageRating);
    } catch (error) {
      console.error('Error fetching average rating:', error);
    }
  };

  const handleRatingChange = (event) => {
    setUserRating(event.target.value);
  };

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };
  
  const handleSubmitRating = async () => {
    try {
      await axios.post("http://localhost:8081/api/rating", {
        user_id,
        art_id,
        rating: userRating,
      });
      console.log("Rating submitted successfully");
      handleDialogClose(); // Fix: Add parentheses to call the function
    } catch (error) {
      console.error("Error submitting rating:", error);
      // Optionally, handle error cases
    }
  };

  return (
    <div>
      <Button sx={{margin:'5px'}} fullWidth size='small' variant="text" onClick={handleDialogOpen}>
        Rate Art
      </Button>

      <Dialog open={open} onClose={handleDialogClose}>
        <DialogTitle>Rate This Art</DialogTitle>
        <DialogContent>
          <Rating
            value={userRating}
            onChange={handleRatingChange}
            name="rating"
            precision={0.5}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleSubmitRating}>Submit</Button>
        </DialogActions>
      </Dialog>

      <div>
        <Rating
          value={averageRating}
          name="rating"
          precision={0.5}
        />
      </div>
    </div>
  );
};

export default RatingComponent;
