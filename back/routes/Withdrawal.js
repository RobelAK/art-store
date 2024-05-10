export default function Withdrawal(db, req, res) {
  const { fname, Lastname, Phone_no, bank, user_id, total_revenue, Account_no } = req.body;
  console.log('Request body:', req.body);

  if (!fname || !Lastname || !Phone_no || !bank || !user_id || !total_revenue || !Account_no) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const insertSql = "INSERT INTO withdraw (fname, Lastname, Phone_no, bank, user_id, total_revenue, Account_no) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(insertSql, [fname, Lastname, Phone_no, bank, user_id, total_revenue, Account_no], (err, result) => {
    if (err) { 
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: "Internal server error" });
    } 
    
    // Update artwork table sales column
    const updateSql = "UPDATE artwork SET sales = 0 WHERE user_id = ?";
    db.query(updateSql, [user_id], (updateErr, updateResult) => {
      if (updateErr) { 
        console.error("Error executing SQL update query:", updateErr);
        return res.status(500).json({ error: "Internal server error" });
      }
      
      return res.status(200).json({ message: "Withdrawal data inserted successfully" });
      
    });
  });
}
