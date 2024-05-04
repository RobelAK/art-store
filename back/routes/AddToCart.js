export default function AddToCart(db,req,res) {
  const { artId, userId, artPrice, quantity, size, artTitle,art, sellerName} = req.body;
  const check = "SELECT * FROM cart WHERE user_id = ? And art_id = ? AND size = ?";
  const sql = "INSERT INTO cart (`user_id`,`art_id`,`price`,`quantity`,`size`,`art`,`art_title`,`seller_name`) Values (?,?,?,?,?,?,?,?)";
  db.query(check, [userId, artId, size], (err, result) => {
    if (err){
      console.log(err)
      return res.json("query error");  
    }
    if (result.length == 0) {
      db.query(sql, [userId, artId, artPrice, quantity, size,art,artTitle,sellerName], (err, result) => {
        if (err) return res.json(err);
        return res.json("Item added to cart");
      });
    } else return res.json("Item already in cart");
  });
}
