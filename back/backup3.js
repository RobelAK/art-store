import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'


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



app.post('/signup', (req,res) => {
    const check = "SELECT * From users where email = ?";
    const {email,name,password} = req.body
    db.query(check,[req.body.email], (err,result) =>{
        if(err) return res.json({Message: "Query error"})
        if(result.length == 0){
            const sql = "INSERT INTO users (`name`,`email`,`password`) Values (?,?,?)"; 
            db.query(sql,[req.body.name, req.body.email, req.body.password], (err,data) =>{
                if(err) return res.json({Error: "query error"});
                return res.json({signup: true,Message: 'You have Registered successfuly'});
                
            })
        } 
        else{
            return res.json({signup: false,Message: "Email already exist"})
        }
    })
})
app.post('/login', (req,res) =>{
    const email = req.body.email
    const password = req.body.password
    const sql = "SELECT * From users Where email = ? and password = ?";
    db.query(sql,[email, password], (err,result) =>{ 
        if(err) return res.json({loginStatus: false, Error: "Query error"})
        if(result.length > 0){
            const id = result[0].id;
            const email = result[0].email;
            const name = result[0].name
            const token = jwt.sign(
                {id,email,name},
                "jwt_secret_key",
                {expiresIn: "1d"}
            );
            res.cookie(id, token)
            return res.json({loginStatus: true, token,user: {id: id,email: email}}) 

        }
        else{
            return res.json({loginStatus: false, Error: "Wrong email or password"}) 
        }
    })
}) 

// const verifyuser = (req, res, next)=>{
//     const token = req.cookie.token
//     if(!token){
//         return res.json({Error: 'no token found'})
//     }
//     else{
//         jwt.verify(token,"jwt_secret_key",(err,decoded) =>{
//             if(err){
//                 return res.json({Error: "Token is not okey"})
//             }
//             else{
//                 req.name = decoded.name;
//                 next();
//             }
//         })
//     }
// }

app.post('/profile', (req,res) =>{
    
})


app.listen(8081,()=> {
    console.log("server is running")
})