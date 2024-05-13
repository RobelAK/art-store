export default function AddedSales(db, req, res) {
  const {art_id} = req.body;

  const sqlGetUserId = 'SELECT user_id FROM artwork WHERE id = ?';
  const sql = "UPDATE artwork SET sales = sales + 1 , total_sales = total_sales + 1  WHERE id = ?";
  const sqlInsert = 'INSERT INTO notifications (user_id, message) VALUES (?, ?)';

db.beginTransaction(function(err) {
    if (err) {
      console.error('Error beginning transaction:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

      db.query(sqlGetUserId, [art_id], function(err, rows) {
        if (err) {
          db.rollback(function() {
            console.error('Error fetching user ID:', err);
            return res.status(500).json({ error: 'Internal server error' });
          });
        }

        if (rows.length === 0) {
          db.rollback(function() {
            console.error('No user found for the artwork ID:', id);
            return res.status(404).json({ error: 'User not found' });
          });
        }
        const userId = rows[0].user_id;

        db.query(sql, [art_id], function(err, result) {
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
              res.json({ message: 'sales added successfully' });
            });
        });
      });
    });
  });
}
