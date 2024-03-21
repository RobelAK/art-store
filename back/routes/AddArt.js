
export default async function AddArt(db, req, res) {

    const sql = "INSERT INTO artwork (`title`, `description`, `category`, `price`, `art`) VALUES (?, ?, ?, ?, ?)";
    const values = [
      req.body.title,
      req.body.description,
      req.body.category,
      req.body.price, 
      req.file ? req.file.filename : null
    ];

    db.query(sql, values, (err, result) => {
      if(err) {
        console.log("Error in SQL Query:", err);
        return res.json({ error: "Error in database query" });
      }
      return res.json({ status: "Success" });
    });
  
}
