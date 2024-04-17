export default async function AddArt(db, req, res) {
  try {
    const sql = "INSERT INTO artwork (`title`, `description`, `category`, `price`, `art`, `user_id`) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [
      req.body.title || '',
      req.body.description || '',
      req.body.category || '',
      req.body.price || '',
      req.file ? req.file.filename : null,
      req.body.user_id || null 
    ];
    db.query(sql, values, (err, result) => {
      if (err) {
        console.log("Error in SQL Query:", err);
        return res.status(500).json({ error: "Error in database query" });
      }
      return res.json({ status: "Success" });
    });
  } catch (error) {
    console.error("Error adding artwork:", error);
    return res.status(500).json({ error: "Server error" });
  }
}
