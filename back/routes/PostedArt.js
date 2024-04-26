export default function PostedArt(db, req, res) {
  const token = req.headers.authorization;

  if (!token) {
    console.error('Token is not available');
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  // Extract the token from the Authorization header
  const [, tokenValue] = token.split(' ');

  // Decode the token to extract user id
  const user = JSON.parse(atob(tokenValue.split(".")[1]));
  const userId = user.id;
  
  console.log('Decoded token:', user);

  const sql = 'SELECT * FROM artwork WHERE user_id = ?';
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('Error retrieving artworks:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    console.log('Artworks retrieved:', result);
    res.json(result);
  });
}
