export default async function RemoveBookmark(db, req, res) {
  const { userId, artId } = req.params;
  const deleteQuery = 'DELETE FROM bookmarks WHERE user_id = ? AND art_id = ?';
  
  db.query(deleteQuery, [userId, artId], (err, result) => {
    if (err) {
      console.error('Error removing bookmark:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    
    // Send a success response
    return res.status(200).json({ message: 'Bookmark removed successfully' });
  });
}
