import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import bcrypt from 'bcrypt'
import multer from "multer";
import login from './login.js'
import signup from './signup.js'
import profile from './profile.js'
import changename from './changename.js'
import changepassword from './changepassword.js'
import AddArt from './AddArt.js'

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
  signup(db, req, res)
})
app.post('/login', async (req, res) => {
  login(db, req, res)
})

app.post('/profile', (req, res) => { 
  profile(db,req,res)
})

app.post('/profile/changename', (req, res) => {
  changename(db,req,res)
});

app.post('/profile/changepassword', async (req,res)=>{
changepassword(db,req,res)
})

app.post('/admintables', async (req,res)=>{

})

app.post('/add/upload', async (req, res) => {
  AddArt(db, req, res)
})


app.listen(8081, () => {
  console.log("server is running")
})

