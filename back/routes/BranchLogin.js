import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default function BranchLogin(db, req, res) {
  const { name, password } = req.body;
  const sql = "SELECT * FROM users WHERE name = ? AND role = 'branch'";
  
  db.query(sql, [name], async (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      const isValidPassword = await bcrypt.compare(password, result[0].password);
      if (!isValidPassword) {
        return res.json({ loginStatus: false, Error: "Wrong name or password" });
      } else {
        // Remove existing tokens if any
        delete req.headers['authorization'];

        const id = result[0].id;
        const email = result[0].email;
        const role = result[0].role;

        // Generate new token
        const token = jwt.sign(
          { id, name, email, role },
          "jwt_secret_key",
          { expiresIn: "1d" }
        );
        
        return res.json({ loginStatus: true, token });
      }
    } else {
      return res.json({ loginStatus: false, Error: "Wrong name or password" });
    }
  });
}
