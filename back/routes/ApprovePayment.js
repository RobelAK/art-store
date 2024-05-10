export default function ApprovePayment(db, req, res) {
  const id = req.params.id;
  const {userId} = req.body;
  const sqlUpdate = 'UPDATE withdraw SET status = 1 WHERE id = ?';
  const sqlInsert = 'INSERT INTO notifications (user_id, message) VALUES (?, ?)';

  db.beginTransaction(function(err) {
    if (err) { 
      console.error('Error beginning transaction:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    // Update withdraw status
    db.query(sqlUpdate, [id], function(err, result) {
      if (err) {
        db.rollback(function() {
          console.error('Error updating withdraw:', err);
          return res.status(500).json({ error: 'Internal server error' });
        });
      }
      db.query(sqlInsert, [userId, "Your payment has been sent!"], function(err, result) {
        if (err) {
          db.rollback(function() {
            console.error('Error inserting notification:', err);
            return res.status(500).json({ error: 'Internal server error' });
          });
        }

        // Commit the transaction if both queries are successful
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
