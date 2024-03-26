export default function ApproveArt(db, req, res) {
  const id = req.params.id;
  const sql = 'UPDATE artwork SET status = true WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error approving artwork:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json({ message: 'Artwork approved successfully' });
  });
}