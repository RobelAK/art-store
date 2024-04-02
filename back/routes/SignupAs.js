export default async function SignupAs(db, req, res) {
  const { id, portfolioLink, description } = req.body;
    const insertSeller = "INSERT INTO sellers (portfolio_link, description, user_id) VALUES (?, ?, ?)"
    db.query(insertSeller, [portfolioLink,description,id], (err,result) =>{
      if(err) return res.json({Message: "Error inserting seller details"})
      return res.json({Message: "Inserting Seller successful"})
    });
}
