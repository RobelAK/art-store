export default async function Bookmarks(db, req, res) {
  const { userId } = req.params;

  // Query to retrieve bookmarked artworks for the user
  const selectQuery = 'SELECT * FROM artwork WHERE id IN (SELECT art_id FROM bookmarks WHERE user_id = ?)';

  // Execute the query
  db.query(selectQuery, [userId], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    // Log the result for debugging
    console.log('Retrieved artworks:', result);

    // Send the retrieved artworks as a response
    return res.status(200).json(result);
  });
}
