export default function profile(db,req,res) {
  const {id} = req.body
  const sql = "SELECT * From users Where id = ?"
  db.query(sql , [id],(err,result) =>{
    if(err) return res.json({Message: "query error"})
    else{
      const name = result[0].name
      const email = result[0].email
      return res.json(name)
    }
  })
}
