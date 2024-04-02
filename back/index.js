import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import multer from "multer";
import login from './routes/login.js';
import signup from './routes/signup.js';
import changename from './routes/changename.js';
import changepassword from './routes/changepassword.js';
import AddArt from './routes/AddArt.js';
import displayArt from './routes/DisplayArt.js';
import WaitingArt from './routes/WaitingArt.js';
import ApproveArt from './routes/ApproveArt.js';
import declineArt from './routes/DeclineArt.js';
import HideArts from './routes/HideArts.js';
import ApproveSeller from './routes/ApproveSeller.js';
import DeleteSeller from './routes/DeleteSeller.js';
import SignupAs from './routes/SignupAs.js';
import WaitingSellers from './routes/WaitingSellers.js';
import DeclineSeller from './routes/DeclineSeller.js';

const app = express();

app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ['GET', 'POST', 'PUT','DELETE'],
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

app.get('/admin/sellerstable', (req, res) => {
  const sql = "SELECT * FROM users WHERE role = 'seller' ";
  db.query(sql, (err, data) =>{
    if(err) return res.json(err);
    return res.json(data);
  });
});
app.post('/add/upload', upload, async (req, res) => {
  AddArt(db, req, res);
});

app.get('/art',upload, async (req, res) => {
  displayArt(db, req, res);
});

app.get('/art/waiting',upload, async (req, res) => {
  WaitingArt(db, req, res);
});
app.get('/sellers/waiting',upload, async (req, res) => {
  WaitingSellers(db, req, res);
});
app.put('/art/hide/:id',upload, async (req, res) => {
  HideArts(db, req, res);
});

app.post('/signupas', (req, res) => {
  SignupAs (db, req, res)
});

// app.put('/art/approve/:id', (req, res) =>{
//   ApproveArt(db,req, res);
// });
// app.put('/seller/approve/:id', (req, res) =>{
//   ApproveSeller(db,req, res);
// });
// app.delete('/seller/delete/:id', (req, res) => {
//   DeleteSeller(db,req, res);
// })
// app.delete('/seller/decline/:id', (req, res) => { 
//   DeclineSeller(db,req, res);
// })
// app.delete('/art/decline/:id', (req, res) => {
//   declineArt(db,req, res);
// })
app.put('/user/delete/:id'), (req,res)=>{
  const id = req.params.id;
  const deleteUser = 'DELETE FROM users WHERE id = ?';
  db.query(deleteUser,[id], (err,res)=>{
    if (err) return res.json({Message: "unable to delete user"})
    else return res.json({Message: "user deleted successfully"})
  })
  return res.json(id)
}


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


const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
