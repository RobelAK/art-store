export default function Rating(db, req, res) {
  const { user_id, art_id, rating } = req.body;

  const check = "SELECT * From rating where user_id = ? AND art_id = ? ";
  const sql = "INSERT INTO rating (`user_id`, `art_id`, `rating`) VALUES (?, ?, ?)";
  db.query(check,[user_id,art_id],(err,result)=>{
    if(result.length == 0){
      db.query(sql, [user_id, art_id, rating], (err,result) =>{
        if(err) return res.json({Message: "Error rating the art"})
        return res.json({Message: "rating successful"})
      });
    }
    else{
      return res.json({Message: "You already rated the art"})
    }
  })
}