export default function HideArts(db , req ,res) {

    const id = req.params.id;
    const sql = 'UPDATE artwork SET status = False WHERE id = ?';
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error('Error Hiding artwork:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.json({ message: 'Artwork Hidden successfully' });
    });
  }