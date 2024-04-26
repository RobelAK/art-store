export default async function toggleArtBookmark(db, req, res) {
  const { artId, userId } = req.body;

  const checkQuery = 'SELECT * FROM bookmarks WHERE art_id = ? AND user_id = ?';
  const deleteQuery = 'DELETE FROM bookmarks WHERE art_id = ? AND user_id = ?';
  const insertQuery = 'INSERT INTO bookmarks (art_id, user_id) VALUES (?, ?)';

  db.query(checkQuery, [artId, userId], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (result.length === 0) {
      // If bookmark doesn't exist, insert it
      db.query(insertQuery, [artId, userId], (err, result) => {
        if (err) {
          console.error('Error executing query:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(200).json({ message: 'Added to bookmark', bookmarked: true }); // Include the updated bookmark status
      });
    } else {
      // If bookmark exists, delete it
      db.query(deleteQuery, [artId, userId], (err, result) => {
        if (err) {
          console.error('Error executing query:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(200).json({ message: 'Removed from bookmark', bookmarked: false }); // Include the updated bookmark status
      });
    }
  });
}
