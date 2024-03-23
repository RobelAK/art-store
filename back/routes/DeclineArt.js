export default function declineArt(db, req, res) {
  const id = req.params.id;
  const sql = 'DELETE FROM artwork WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error declining artwork:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json({ message: 'Artwork declined successfully' });
  });
}