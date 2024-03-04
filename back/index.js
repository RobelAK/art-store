import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import bcrypt from 'bcrypt'


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
  else return res.json({ signup: false, Message: "Password doesnt match" })

})
app.post('/login', async (req, res) => {
  const { email, password } = req.body
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
  const {id} = req.body
  const sql = "SELECT * From users Where id = ?"
  db.query(sql , [id],(err,result) =>{
    if(err) return res.json({Message: "query error"})
    else{
      const name = result[0].name
      const email = result[0].email
      return res.json(email)
    }
  })
})

app.post('/profile/changename', (req, res) => {
  const { newname, id } = req.body;
  const sql = "UPDATE users SET name = ? WHERE id = ?";

  db.query(sql, [newname, id], (err, result) => {
    if (err) return res.json({ Message: "Query error" });
    else return res.json({ Message: "Successful" });
  });
});


app.listen(8081, () => {
  console.log("server is running")
})