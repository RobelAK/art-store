export default function Withdrawal() {
  const { fname, lname, Phone_no, bank, user_id, total_revenue, Account_no } = req.body;

  // Check if all required fields are present
  if (!fname || !lname || !Phone_no || !bank || !user_id || !total_revenue || !Account_no) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  // Execute SQL query to insert withdrawal data into the database
  const sql = "INSERT INTO withdraw (fname, lname, Phone_no, bank, user_id, total_revenue, Account_no) VALUES (?, ?, ?)";
  db.query(sql, [fname, lname, Phone_no, bank, user_id, total_revenue, Account_no], (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    return res.status(200).json({ message: "Withdrawal data inserted successfully" });
  });
}
