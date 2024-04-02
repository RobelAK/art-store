export default function ApproveSeller(db, req, res) {
  const id = req.params.id;
  const sql = 'UPDATE users SET role = "seller" WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error approving seller:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json({ message: 'seller approved successfully' });
  });
}