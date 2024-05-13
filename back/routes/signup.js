import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'

export default async function signup(db, req, res) {


  const check = "SELECT * From users where email = ?";
  const { email, name, password, passwordConfirm } = req.body
  const hashedPassword = await bcrypt.hash(password,10)





  // const transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     user: 'robelaklilu100@gmail.com',
  //     pass: 'A12a12!!',
  //   },
  // });
  // const verificationCode = Math.random().toString(36).substr(2, 6);

  // const mailOptions = {
  //   from: 'your_email@gmail.com',
  //   to: email,
  //   subject: 'Email Verification',
  //   text: `Your verification code is: ${verificationCode}`,
  // };









  

  if (password == passwordConfirm) {
    db.query(check, [email], (err, result) => {
      if (err) return res.json({ Message: "Query error" })
      if (result.length == 0) {
        const sql = "INSERT INTO users (`name`,`email`,`password`,`role`) Values (?,?,?,?)";
        db.query(sql, [name, email, hashedPassword, 'buyer'], (err, data) => {
          if (err) return res.json({ Message: "query error" });
          return res.json({ signup: true, Message: 'You have Registered successfuly' });

        })
      }
      else {
        return res.json({ signup: false, Message: 'Email already exist' })
      }
    })
  }
  else return res.json({ signup: false, Message: "Password doesnt match" })
}
