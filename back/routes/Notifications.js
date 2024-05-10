export default function Notifications(db, req, res) {
  const token = req.headers.authorization;
  console.log("autorization token :" , req.headers.authorization)
  if (!token) {
    console.error('Token is not available');
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const [, tokenValue] = token.split(' ');
  const user = JSON.parse(atob(tokenValue.split(".")[1]));
  const userId = user.id;
  
  console.log('Decoded token:', user);

  const sql = 'SELECT * FROM notifications WHERE user_id = ? AND status = true ';
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('Error retrieving notifications:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    console.log('Notifications retrieved:', result);
    res.json(result);
  });
}
