import express from "express";
import { Chapa } from 'chapa-nodejs';



// import request from 'request';


import mysql from "mysql";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import login from "./routes/login.js";
import signup from "./routes/signup.js";
import changename from "./routes/changename.js";
import changepassword from "./routes/changepassword.js";
import AddArt from "./routes/AddArt.js";
import displayArt from "./routes/DisplayArt.js"; 
import WaitingArt from "./routes/WaitingArt.js";
import ApproveArt from "./routes/ApproveArt.js";
import declineArt from "./routes/DeclineArt.js";
import HideArts from "./routes/HideArts.js";
import ApproveSeller from "./routes/ApproveSeller.js";
import DeleteSeller from "./routes/DeleteSeller.js";
import SignupAs from "./routes/SignupAs.js";
import WaitingSellers from "./routes/WaitingSellers.js";
import DeclineSeller from "./routes/DeclineSeller.js";
import Payment from "./routes/Payment.js"; 

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage }).single("art");

app.post("/signup", async (req, res) => {
  signup(db, req, res);
});

app.post("/payment/pay", async (req, res) => {
  try {
    const { name, email, id, amount } = req.body;
    const secretKey = "CHASECK_TEST-6mk5uDbs3okiwBBvaIfAOpBsLi0memZO";
    const chapa = new Chapa({
      secretKey: secretKey,
    });

    const tx_ref = await chapa.generateTransactionReference({
      prefix: "TX",
      size: 20,
    });

    const paymentResponse = await chapa.initialize({
      first_name: name,
      last_name: "Doe",
      email: "john@gmail.com",
      currency: "ETB",
      amount: "100",
      tx_ref: tx_ref,
      callback_url: "",
      return_url: "",
      customization: {
        title: "Test Title",
        description: "Test Description",
      },
    });
    const sql = "INSERT INTO payment (`user_id`,`tx_ref`) Values (?,?)";
    db.query(sql, [id, tx_ref], (err, data) => {
      if (err) return res.json({ Message: "query error" });
      return res.json(
        paymentResponse.data.checkout_url
      );
    });

    // const verifyResponse = await chapa.verify({
    //   tx_ref: tx_ref,
    // });

    // return res.json({ paymentResponse });
  } catch (error) {
    console.log("Error during payment processing:", error);

    return res.status(500).json({
      error: "An error occurred during payment processing.",
      details: error.message,
    });
  }
});




app.post("/login", async (req, res) => {
  login(db, req, res);
});

app.post("/profile/changename", (req, res) => {
  changename(db, req, res);
});

app.post("/profile/changepassword", async (req, res) => {
  changepassword(db, req, res);
});

app.get("/admin/userstable", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/admin/sellerstable", (req, res) => {
  const sql = "SELECT * FROM users WHERE role = 'seller' ";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.post("/art/upload", upload, async (req, res) => {
  AddArt(db, req, res);
});

app.get("/art", upload, async (req, res) => {
  displayArt(db, req, res);
});

app.get("/art/waiting", upload, async (req, res) => {
  WaitingArt(db, req, res);
});
app.get("/sellers/waiting", upload, async (req, res) => {
  WaitingSellers(db, req, res);
});
app.put("/art/hide/:id", upload, async (req, res) => {
  HideArts(db, req, res);
});

app.post("/signupas", (req, res) => {
  SignupAs(db, req, res);
});

app.put("/art/approve/:id", (req, res) => {
  ApproveArt(db, req, res);
});
app.put("/seller/approve/:id", (req, res) => {
  ApproveSeller(db, req, res);
});
app.delete("/seller/delete/:id", (req, res) => {
  DeleteSeller(db, req, res);
});
app.delete("/seller/decline/:id", (req, res) => {
  DeclineSeller(db, req, res);
});
app.delete("/art/decline/:id", (req, res) => {
  declineArt(db, req, res);
});
app.post("/product", (req, res) => {
  const id = req.body.id;
  const sql = "SELECT * FROM artwork WHERE id =?";
  const username = "SELECT * FROM users WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.json(err);
    const art = result[0];
    db.query(username, [result[0].user_id], (err, result) => {
      if (err) return res.json("error happned and i dont know what it is");
      return res.json({ artInfo: art, sellerinfo: result[0] });
    });
  });
});
app.post("/addtocart", (req, res) => {
  const { artId, userId, artPrice, quantity, size, artTitle,art, sellerName} = req.body;
  const check = "SELECT * FROM cart WHERE user_id = ? And art_id = ? AND size = ?";
  const sql = "INSERT INTO cart (`user_id`,`art_id`,`price`,`quantity`,`size`,`art`,`art_title`,`seller_name`) Values (?,?,?,?,?,?,?,?)";
  db.query(check, [userId, artId, size], (err, result) => {
    if (err) return res.json("query error"); 
    if (result.length == 0) {
      db.query(sql, [userId, artId, artPrice, quantity, size,art,artTitle,sellerName], (err, result) => {
        if (err) return res.json(err);
        return res.json("item added to cart");
      });
    } else return res.json("item already in cart");
  });
});
app.post("/cart", (req,res)=>{
  const userId = req.body.userId
  const sql = "SELECT * FROM cart WHERE user_id = ?" 
  db.query(sql, [userId], (err,result)=>{
    if(err) return res.json(err) 
    else return res.json(result)
  })
})

app.delete("/user/delete/:id", (req, res) => {
  const id = req.params.id;
  const deleteUser = "DELETE FROM users WHERE id = ?";
  db.query(deleteUser, id, (error, results) => {
    if (error) {
      res.json({ error: "Internal server error" });
    } else {
      res.json({ Message: "User deleted succefully" });
    }
  });
});
app.post('/removecartitem', (req,res)=>{
  const {id} = req.body
  const sql = "DELETE FROM cart WHERE id=?"
  db.query(sql,[id], (err,response)=>{ 
    if(err) return res.json(err)
    return res.json('item deleted successfully')
  })
})

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "art",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: " + err.stack);
    return;
  }
  console.log("Connected to MySQL as id " + db.threadId);
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});