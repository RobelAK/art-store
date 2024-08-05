export default function BranchPrinted(db, req, res) {
  const orderId = req.body.orderId
  const {user_id} = req.body;
  const sql = "UPDATE payment_detail SET print_status = 'printed' WHERE id = ?"
  const sqlInsert = 'INSERT INTO notifications (user_id, message) VALUES (?, ?)';
  

  db.beginTransaction(function(err) {
    if (err) { 
      console.error('Error beginning transaction:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    db.query(sql,[orderId], function(err,result) {
      if (err) {
        db.rollback(function() {
          console.error('Error updating withdraw:', err);
          return res.status(500).json({ error: 'Internal server error' });
        });
      }
      db.query(sqlInsert, [user_id, "Your orders have been printed"], function(err, result) {
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
          res.json({ message: 'sales added successfully' });
        });
      });
    });
  });
}

