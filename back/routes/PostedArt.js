export default function PostedArt(db, req, res) {
  const token = req.headers.authorization;
  console.log("autorization token :" , req.headers.authorization)
  if (!token) {
    console.error('Token is not available');
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const [, tokenValue] = token.split(' ');
  const user = JSON.parse(atob(tokenValue.split(".")[1]));
  const userId = user.id;
  
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
