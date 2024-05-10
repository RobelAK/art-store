export default function HideArts(db , req ,res) {

  const artId = req.params.id;
  const sql = 'UPDATE artwork SET status = False WHERE id = ?';
  const sqlInsert = 'INSERT INTO notifications (user_id, message) VALUES (?, ?)';
  const sqlGetUserId = 'SELECT user_id FROM artwork WHERE id = ?';

  db.beginTransaction(function(err) {
    if (err) { 
      console.error('Error beginning transaction:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    db.query(sql, [artId], (err, result) => {
      if (err) {
        db.rollback(function() {
          console.error('Error updating artwork:', err);
          return res.status(500).json({ error: 'Internal server error' });
        });
      }
      db.query(sqlGetUserId, [artId], function(err, rows) {
        if (err) {
          db.rollback(function() {
            console.error('Error fetching user ID:', err);
            return res.status(500).json({ error: 'Internal server error' });
          });
        }
  
        const userId = rows[0].user_id;
  
        // Insert notification
        db.query(sqlInsert, [userId, "your art has been Suspended by admin"], function(err, result) {
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
            res.json({ message: 'Artwork approved successfully' });
          });
        });
      });
    });
  });
  }
  