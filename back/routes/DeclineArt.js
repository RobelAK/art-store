export default function declineArt(db, req, res) {
  const id = req.params.id;
  
  const sqlGetUserId = 'SELECT user_id FROM artwork WHERE id = ?';
  const sqlDelete = 'DELETE FROM artwork WHERE id = ?';
  const sqlInsert = 'INSERT INTO notifications (user_id, message) VALUES (?, ?)';

  db.beginTransaction(function(err) {
    if (err) {
      console.error('Error beginning transaction:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

      db.query(sqlGetUserId, [id], function(err, rows) {
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

    db.query(sqlDelete, [id], function(err, result) {
      if (err) {
        db.rollback(function() {
          console.error('Error declining artwork:', err);
          return res.status(500).json({ error: 'Internal server error' });
        });
      }

        db.query(sqlInsert, [userId, "your art is not approved"], function(err, result) {
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
            res.json({ message: 'Artwork declined successfully' });
          });
        });
      });
    });
  });
}
