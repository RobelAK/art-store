export default function DeleteSeller(db, req, res) {
  const id = req.params.id;
  
  const deleteFromSellers = 'DELETE FROM sellers WHERE user_id = ?';
  const deleteFromArtwork = 'DELETE FROM artwork WHERE user_id = ?';
  
  db.query(deleteFromSellers, [id], (errSellers, resultSellers) => {
    if (errSellers) {
      console.error('Error declining seller (sellers table):', errSellers);
      return res.status(500).json({ error: 'Internal server error' });
    }

    db.query(deleteFromArtwork, [id], (errArtwork, resultArtwork) => {
      if (errArtwork) {
        console.error('Error declining seller (artwork table):', errArtwork);
        return res.status(500).json({ error: 'Internal server error' });
      }

      const deleteFromUsers = 'DELETE FROM users WHERE id = ?';
      db.query(deleteFromUsers, [id], (errUsers, resultUsers) => {
        if (errUsers) {
          console.error('Error declining seller (users table):', errUsers);
          return res.status(500).json({ error: 'Internal server error' });
        }

        res.json({ message: 'Seller declined successfully' });
      });
    });
  });
}
