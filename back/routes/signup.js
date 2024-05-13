
export default async function signup(transporter, db, req, res) {


  const check = "SELECT * From users where email = ?";
  const { email, name, password, passwordConfirm } = req.body;

  if (password == passwordConfirm) {
    try {
      db.query(check, [email], async (err, result) => {
        if (err) return res.json({verificationSent: false, Message: "Query error" });
        if (result.length == 0) {

          const verificationCode = Math.random().toString(36).substr(2, 6);

          const mailOptions = {
            from: "robelaklilu100@gmail.com",
            to: email,
            subject: "Email Verification",
            text: `Your verification code is: ${verificationCode}`,
          };

          await transporter.sendMail(mailOptions);
          console.log("email sent :)");


          const selectSql = "SELECT * FROM pending_user WHERE email = ?"
          const sql = "INSERT INTO pending_user (`email`,`verificationCode`) Values (?,?)";
          const setSql = "UPDATE pending_user SET verificationCode = ? WHERE email = ?"
          db.query(selectSql,[email],(err,result)=>{
            if(result.length == 0){
              db.query(sql, [email, verificationCode], (err, data) => {
                if (err) return res.json({verificationSent: false, Message: "query error" });
                return res.json({verificationSent: true, Message: "Verification code sent to your email"});
              });
            }
            else{
              db.query(setSql,[verificationCode,email],(err,result) => {
                if(err) return res.json({verificationSent: false,Message: 'query error'})
                else res.json({verificationSent: true, Message: "Verification code sent to your email"});
              })
            }
          })
        } else {
          return res.json({ verificationSent: false, Message: "Email already exist" });
        }
      });
    } catch (error) {
      console.log("ERROR OCCURED: " + error);
      return res.json(error);
    }
  } else return res.json({ verificationSent: false, Message: "Password doesnt match" });
}
