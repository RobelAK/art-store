export default function SalesList(db, req, res) {

  const sql = "SELECT * FROM payment_detail WHERE print_status = 'printed' " ;

db.query(sql, (err, results) => {
  if (err) {
    console.error('Error fetching data:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
  res.json(results);
});
}