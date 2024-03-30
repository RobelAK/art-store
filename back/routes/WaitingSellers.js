
export default function WaitingSellers(db, req, res) {
  const sql = 'SELECT * FROM users WHERE role = "buyer" AND portfolio_link IS NOT NULL';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching artwork:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results);
  });
}
