import bcrypt from 'bcrypt';

export default async function CreateAdmin(db, req, res) {
  const { email, name, password } = req.body;
  
  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = "INSERT INTO users (`name`, `email`, `password`, `role`) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, email, hashedPassword, 'admin'], (err, data) => {
    if (err) return res.json({ Message: "Query error" });
    return res.json({ signup: true, Message: 'You have registered successfully' });
  });
}
