import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default function login(db, req, res) {
  
  
  const { email, password } = req.body
  const sql = "SELECT id, name, email, role, password FROM users WHERE email = ?";
  db.query(sql, [email], async (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" })  
    if (result.length > 0) {
      const id = result[0].id
      const email = result[0].email
      const name = result[0].name
      const role = result[0].role
      const isValidPassword = await bcrypt.compare(password, result[0].password);
      if (!isValidPassword){
        return res.json({ loginStatus: false, Error: "Wrong email or password"})
      }
      else{
        const token = jwt.sign(
          { id, name, email, role},
          "jwt_secret_key",
          { expiresIn: "60m" }
        ); 
        return res.json({ loginStatus: true, token })
      }
    }
    else {
      return res.json({ loginStatus: false, Error: "Wrong email or password" })
    }
  })
}
