// Backend code to fetch data from both users and sellers tables
export default function WaitingSellers(db, req, res) {
  const sql = `
    SELECT u.id, u.name, u.email, s.portfolio_link
    FROM users u
    LEFT JOIN sellers s ON u.id = s.user_id
    WHERE u.role = 'buyer' AND s.portfolio_link IS NOT NULL
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results);
  });
}
