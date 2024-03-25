import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import multer from "multer";
import login from './routes/login.js';
import signup from './routes/signup.js';
import profile from './routes/profile.js';
import changename from './routes/changename.js';
import changepassword from './routes/changepassword.js';
import AddArt from './routes/AddArt.js';
import displayArt from './routes/DisplayArt.js';

const app = express();

app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ['GET', 'POST', 'PUT'],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage }).single('art');


app.post('/signup', async (req, res) => {
  signup(db, req, res);
});

app.post('/login', async (req, res) => {
  login(db, req, res);
});

app.post('/profile', (req, res) => { 
  profile(db, req, res);
});

app.post('/profile/changename', (req, res) => {
  changename(db, req, res);
});

app.post('/profile/changepassword', async (req, res) => {
  changepassword(db, req, res);
});

app.get('/admin/userstable', (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, data) =>{
    if(err) return res.json(err);
    return res.json(data);
  });
});

app.put('/admin/deleteuser/:id', (req, res) => {
  const sql = "DELETE FROM users WHERE id = ?";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if(err) return res.json("query error");
    return res.json("successful");
  });
});

app.post('/add/upload', upload, async (req, res) => {
  AddArt(db, req, res);
});

app.get('/art',upload, async (req, res) => {
  displayArt(db, req, res);
});


const db = mysql.createConnection({ 
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'art'   
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + db.threadId);
});



app.post('/profile/changepassword', async (req,res)=>{
  changepassword(db,req,res)
})

app.get('/admin/userstable', (req,res)=>{
  const sql = "SELECT * FROM users"
  db.query(sql, (err, data) =>{
    if(err) return res.json(err)
    return res.json(data) 
  }) 
})
app.put('/admin/deleteuser/:id', (req, res) => {
  const sql = "DELETE FROM users WHERE id = ?";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.json({ error: "Query error" });
    }
    return res.json({Message: "User deleted successfully"}); 
  });
});

app.post('/add/upload', async (req, res) => {
  AddArt(db, req, res) 
})


app.listen(8081, () => {
  console.log("server is running") 
})  
// const PORT = process.env.PORT || 8081;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
