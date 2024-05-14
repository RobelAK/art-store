export default function displayArt(db, req, res) {
  const category = req.query.category; // Assuming the category is provided in the query parameters

  let sql = 'SELECT * FROM artwork WHERE status=true AND deleted = "false"';
  const params = [];

  if (category) {
    sql += ' AND category = ?';
    params.push(category);
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error('Error fetching artwork:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results);
  });
};
