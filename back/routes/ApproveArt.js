export default function ApproveArt(db, req, res) {
  const artId = req.params.id;
  const sqlUpdate = 'UPDATE artwork SET status = true WHERE id = ?';
  const sqlInsert = 'INSERT INTO notifications (user_id, message) VALUES (?, ?)';
  const sqlGetUserId = 'SELECT user_id FROM artwork WHERE id = ?';

  db.beginTransaction(function(err) {
    if (err) { 
      console.error('Error beginning transaction:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    // Update artwork status
    db.query(sqlUpdate, [artId], function(err, result) {
      if (err) {
        db.rollback(function() {
          console.error('Error updating artwork:', err);
          return res.status(500).json({ error: 'Internal server error' });
        });
      }

      // Get user ID associated with the artwork
      db.query(sqlGetUserId, [artId], function(err, rows) {
        if (err) {
          db.rollback(function() {
            console.error('Error fetching user ID:', err);
            return res.status(500).json({ error: 'Internal server error' });
          });
        }

        const userId = rows[0].user_id;

        // Insert notification
        db.query(sqlInsert, [userId, "Your art has been approved!"], function(err, result) {
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
