export default function displayArt(db , req ,res) {

    const sql = 'SELECT * FROM artwork WHERE status=true';

    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error fetching artwork:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.json(results);
    });
  };