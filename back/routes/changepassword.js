
export default async function changepassword(db,req,res) {
  
  const {newPassword, newPasswordConfirm, currentPassword, id} = req.body
  const sql = "SELECT * From users Where id = ?"

  const hashedNewPassword = await bcrypt.hash(newPassword,10)

  db.query(sql, [id], async (err,result) =>{
    if (err) {return res.json({ Message: "Query error"})} 
    else{
      const pa = result[0].password
      const isValidPassword = await bcrypt.compare(currentPassword, pa);
      if(!isValidPassword){
        return res.json({Message: "Current password incorrect!"})
      }
      else{
        const changePassword = "UPDATE users SET password = ? WHERE id = ?"
        db.query(changePassword,[hashedNewPassword,id], (err,result)=>{
          if(err) {return res.json({Message: "Query is this error"})}
          else{
            return res.json({Message: "Password changed successfuly"})
          }
        })
      }
    }
  }) 
}
