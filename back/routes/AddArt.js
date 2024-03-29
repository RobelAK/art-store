import jwt from 'jsonwebtoken'; // Import JWT library

export default async function AddArt(db, req, res) {
  try {
    // Retrieve the token from cookies
    const token = req.cookies.token;
    
    // Verify the token
    jwt.verify(token, "jwt_secret_key", (err, decoded) => {
      if (err) {
        console.log("Error verifying token:", err);
        return res.status(401).json({ error: "Unauthorized" });
      }

      // Extract user ID from decoded token
      const userId = decoded.id;

      // Prepare SQL query to insert artwork data
      const sql = "INSERT INTO artwork (`title`, `description`, `category`, `price`, `art`, `user_id`) VALUES (?, ?, ?, ?, ?, ?)";
      const values = [
        req.body.title || '',
        req.body.description || '',
        req.body.category || '',
        req.body.price || '',
        req.file ? req.file.filename : null,
        userId // User ID extracted from the token
      ];

      // Execute the SQL query
      db.query(sql, values, (err, result) => {
        if (err) {
          console.log("Error in SQL Query:", err);
          return res.status(500).json({ error: "Error in database query" });
        }
        return res.json({ status: "Success" });
      });
    });
  } catch (error) {
    console.error("Error in AddArt function:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
