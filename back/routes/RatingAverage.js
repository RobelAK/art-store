export default function RatingAverage(db, req, res) {
  const { art_id } = req.params;
  console.log("art id :", art_id);

  const sql = 'SELECT AVG(rating) AS averageRating FROM rating WHERE art_id = ?';
  db.query(sql, [art_id], (err, result) => {
    if (err) {
      console.error('Error fetching average rating:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    const averageRating = result[0]?.averageRating || 0;
    console.log('Average rating:', averageRating);
    res.status(200).json({ averageRating });
  });
}
