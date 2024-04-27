export default async function AddArt(db, req, res) {
  try {
    const sql = "INSERT INTO artwork (`title`, `description`, `category`, `price`, `art`, `user_id`, `artist`) VALUES (?,?, ?, ?, ?, ?, ?)";
   
  const title = req.body.title;
  const description = req.body.description;
  const category = req.body.category;
  const price = req.body.price;
  const art = req.file ? req.file.filename : null;
  const userId = req.body.user_id;
  const artist = req.body.artist;
    db.query(sql,[title,description,category,price,art,userId,artist], (err, result) => {
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
