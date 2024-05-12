export default function WithdrawRequest(db, req, res) {

  const sql = "SELECT * FROM withdraw WHERE status = 0 " ;

db.query(sql, (err, results) => {
  if (err) {
    console.error('Error fetching data:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
  res.json(results);
});
}