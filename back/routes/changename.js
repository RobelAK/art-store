import jwt from 'jsonwebtoken';

export default function changename(db, req, res) {
  
  const {name, id, email, role} = req.body
  const sql = "UPDATE users SET name = ? WHERE id = ?";

  db.query(sql, [name, id], (err, result) => {
    if (err) return res.json({ Message: "Query error"});
    else{
      const token = jwt.sign(
        { id, name, email, role },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      return res.json({Message: "Name succefully changed", token})
    }
  });
}
