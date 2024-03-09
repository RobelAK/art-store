import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import bcrypt from 'bcrypt'
import ResetPassword from './forgot_password/password_reset.jsx';
import UpdatePassword from './forgot_password/password_update.jsx';
 

const app = express()
app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ['GET', 'POST', 'PUT'],
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'art'
})

app.post('/signup', async (req, res) => {
  const check = "SELECT * From users where email = ?";
  const { email, name, password, passwordConfirm } = req.body

  if (password == passwordConfirm) {
    db.query(check, [email], (err, result) => {
      if (err) return res.json({ Message: "Query error" })
      if (result.length == 0) {
        const sql = "INSERT INTO users (`name`,`email`,`password`,`role`) Values (?,?,?,?)";
        db.query(sql, [name, email, password, 'buyer'], (err, data) => {
          if (err) return res.json({ Message: "query error" });
          return res.json({ signup: true, Message: 'You have Registered successfuly' });

        })
      }
      else {
        return res.json({ signup: false, Message: 'Email already exist' })
      }
    })
  }
  else return res.json({ signup: false, Message: "Password doesn't match" })

})
app.post('/login', async (req, res) => {
  const email = req.body.email
  const password = req.body.password
  const sql = "SELECT * From users Where email = ? and password = ?";
  db.query(sql, [email, password], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" })
    if (result.length > 0) {
      const id = result[0].id
      const email = result[0].email
      const name = result[0].name
      const password = result[0].password
      const token = jwt.sign(
        { id, name, email, password },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      res.cookie('token', token)
      return res.json({ loginStatus: true })
    }
    else {
      return res.json({ loginStatus: false, Error: "Wrong email or password" })
    }
  })
})


app.post('/profile', (req, res) => {
  return res.json(req.body.id)
})
app.post('/resetpassword', (req, res) => {
  const email = req.body.email;
  const newPassword = req.body.newPassword;
  const resetCode = req.body.resetCode; 
  const sql = "UPDATE users SET password = ? WHERE email = ?";
  db.query(sql, [newPassword, email], (err, result) => {
    if (err) {
      console.error(err);
      return res.json({ resetPasswordStatus: false, message: 'Internal server error' });
    }

    return res.json({ resetPasswordStatus: true, message: 'Password reset successfully' });
  });
});





app.post('/forgotpassword', (req, res) => {
  const {email} = req.body;
  UserModel.findOne({email: email})
  .then(user => {
      if(!user) {
          return res.send({Status: "User not existed"})
      } 
      const token = jwt.sign({id: user._id}, "jwt_secret_key", {expiresIn: "1d"})
      var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'youremail@gmail.com',
            pass: 'your password'
          }
        });
        
        var mailOptions = {
          from: 'youremail@gmail.com',
          to: 'user email@gmail.com',
          subject: 'Reset Password Link',
          text: `http://localhost:5173/reset_password/${user._id}/${token}`
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            return res.send({Status: "Success"})
          }
        });
  })
})


app.post('/reset-password/:id/:token', (req, res) => {
  const {id, token} = req.params
  const {password} = req.body

  jwt.verify(token, "jwt_secret_key", (err, decoded) => {
      if(err) {
          return res.json({Status: "Error with token"})
      } else {
          bcrypt.hash(password, 10)
          .then(hash => {
              UserModel.findByIdAndUpdate({_id: id}, {password: hash})
              .then(u => res.send({Status: "Success"}))
              .catch(err => res.send({Status: err}))
          })
          .catch(err => res.send({Status: err}))
      }
  })
})
app.post('/user/resetPassword', async (req, res) => {
  await ResetPassword(db, req, res)
})

// Endpoint to validate token and update user password
app.post("/user/updatePassword", async (req, res) =>{
  await UpdatePassword(db, req, res)
})
app.post('/user/confirmEmail/:token', async (req, res) => {
  await EmailConfirm(db, req, res)
})

app.listen(8081, () => {
  console.log("server is running")
})
