const AverageRating = async (db, req, res) => {
  try {
    const { id } = req.params;
    
    // Query the database to calculate average rating
    const sql = 'SELECT AVG(rating) AS averageRating FROM rating WHERE art_id = ?';
    
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error('Error fetching average rating:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      const averageRating = result[0]?.averageRating || 0;
      res.status(200).json({ averageRating });
    });
  } catch (error) {
    console.error('Error calculating average rating:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export default AverageRating;
