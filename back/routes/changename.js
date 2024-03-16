import jwt from 'jsonwebtoken';

export default function changename(db, req, res) {
  
  const {name, id, email} = req.body
  const sql = "UPDATE users SET name = ? WHERE id = ?";

  db.query(sql, [name, id], (err, result) => {
    if (err) return res.json({ Message: "Query error"});
    else{
      const token = jwt.sign(
        { id, name, email },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      res.clearCookie('token')
      res.cookie('token', token) 
      return res.json({Message: "Name succefully changed"})
    }
  });
}
