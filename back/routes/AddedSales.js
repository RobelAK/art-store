export default function AddedSales(db, req, res) {
  const {artId ,userId} = req.body;
  const sql = "UPDATE artwork SET sales = sales + 1 , total_sales = total_sales + 1  WHERE id = ?";
  const sqlInsert = 'INSERT INTO notifications (user_id, message) VALUES (?, ?)';

  db.beginTransaction(function(err) {
    if (err) { 
      console.error('Error beginning transaction:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    // Update withdraw status
    db.query(sql, [artId], function(err, result) {
      if (err) {
        db.rollback(function() {
          console.error('Error updating withdraw:', err);
          return res.status(500).json({ error: 'Internal server error' });
        });
      }
      db.query(sqlInsert, [userId, "Your art has been sold"], function(err, result) {
        if (err) {
          db.rollback(function() {
            console.error('Error inserting notification:', err);
            return res.status(500).json({ error: 'Internal server error' });
          });
        }

        db.commit(function(err) {
          if (err) {
            db.rollback(function() {
              console.error('Error committing transaction:', err);
              return res.status(500).json({ error: 'Internal server error' });
            });
          }
          res.json({ message: 'Withdraw approved successfully' });
        });
      });
    });
  });
}
