export default async function SignupAs(db, req, res) {
  const { id, portfolioLink, description } = req.body;
  const check = "SELECT * From sellers where user_id = ?";
  const insertSeller = "INSERT INTO sellers (portfolio_link, description, user_id) VALUES (?, ?, ?)"
  db.query(check,[id],(err,result)=>{
    if(result.length == 0){
      db.query(insertSeller, [portfolioLink,description,id], (err,result) =>{
        if(err) return res.json({Message: "Error inserting seller details"})
        return res.json({Message: "Submit successful"})
      });
    }
    else{
      return res.json({Message: "You already submited seller form"})
    }
  })
}
