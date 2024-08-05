import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import jwt from 'jsonwebtoken';

import express from "express";
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
import PostedArt from "./routes/PostedArt.js";
import toggleArtBookmark from "./routes/ArtBookmark.js";
import Bookmarks from "./routes/Bookmarks.js";
import RemoveBookmark from "./routes/RemoveBookmark.js";
import AddAvatar from "./routes/AddAvatar.js";
import Notifications from "./routes/Notifications.js";
import Rating from "./routes/Rating.js";
import RatingAverage from "./routes/RatingAverage.js";
import { Chapa } from "chapa-nodejs";
import AddBranch from "./routes/AddBranch.js";
import AddAdmin from "./routes/AddAdmin.js";
import AddToCart from "./routes/AddToCart.js";
import AverageRating from "./routes/AverageRating.js";
import Withdrawal from "./routes/Withdrawal.js";
import delete_art from "./routes/delete_art.js";
import WithdrawRequest from "./routes/WithdrawRequest.js";
import ApprovePayment from "./routes/ApprovePayment.js";
import AddedSales from "./routes/AddedSales.js";
import WithdrawalList from "./routes/WithdrawalList.js";
import SalesList from "./routes/SalesList.js";
import BranchPrinted from "./BranchPrinted.js";

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
const Add = multer({ storage }).single("avatar");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "robelaklilu100@gmail.com",
    pass: "tjti wqiy retb nytd",
  },
});

app.post("/profile/changeavatar", Add, (req, res) => {
  AddAvatar(db, req, res);
});

const chapa = new Chapa({
  secretKey: "CHASECK_TEST-IJqQnyTRn7UAJGsBKOM0RJZn3Jr4XIQy",
});

app.post("/signup", async (req, res) => {
  signup(transporter,db, req, res);
});


app.post("/forgotpassword/sendcode",(req,res)=>{
  try {
    const {email} = req.body;
    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql,[email],(err,result)=>{
      if(err) throw err;
      if(result.length === 0){
        return res.json("user not found");
      }
      
      const token = jwt.sign( 
        {email},
        "jwt_secret_key",
        { expiresIn: "60m" }
      ); 
      const insertSql = "INSERT INTO reset_tokens (`email`,`token`) VALUES (?,?)";
      db.query(insertSql,[email,token],(err,result)=>{
        if(err) throw err;
        const resetLink = `http://localhost:5173/updatepassword/${token}`;  
        const mailOptions = {
          from: 'robelaklilu100@gmail.com',
          to: email,
          subject: 'Password reset',
          text: `click this: ${resetLink}`
        };
        transporter.sendMail(mailOptions, (err, info) => { 
          if (err) {
            console.error('Error sending email: ', err);
            throw err;
          }
          console.log('Email sent: ', info.response);
          return res.json("success");
        });
      });
    });
  } catch (error) {
    console.error('An error occurred: ', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


app.post("/resetpassword",async (req,res)=>{
  const {email,password} = req.body
  const hashedPassword = await bcrypt.hash(password, 10);
  const sql = "UPDATE users SET password = ? WHERE email = ?"
  
  db.query(sql,[hashedPassword,email],(err,result)=>{
    if(err) return res.json({status: false, err})
    return res.json({Message: "Your password has been reseted successfully", status: true})
  })
})


app.post("/signup/verify",async (req,res)=>{
  const {name,email,password,verificationCode} = req.body 
  const hashedPassword = await bcrypt.hash(password, 10);
  const sql = "SELECT verificationCode FROM pending_user WHERE email = ?"
  db.query(sql,[email],(err,result)=>{
    if(err) return res.json({signup: false,Message: "Query error"})
    else{
      if(verificationCode == result[0].verificationCode){
        const insertSql = "INSERT INTO users (`name`,`email`,`password`,`role`) Values (?,?,?,?)";
        const deletePending = "DELETE FROM pending_user WHERE email = ?"
        db.query(deletePending,[email])
        db.query(insertSql, [name, email, hashedPassword, 'buyer'], (err, data) => {
          if (err) return res.json({signup: false, Message: "query error" });
          return res.json({ signup: true, Message: 'You have Registered successfuly' });
        })
      }
      else return res.json({signup: false,Message: 'verification code not correct'})
    }
  })
})

app.post("/addbranch", async (req, res) => {
  AddBranch(db, req, res);
});

app.post("/addadmin", async (req, res) => {
  AddAdmin(db, req, res);
});

app.post("/login", async (req, res) => {
  login(db, req, res);
});

app.post("/api/art/bookmark/:id", (req, res) => {
  toggleArtBookmark(db, req, res);
});

app.get("/api/bookmarked-art/:userId", async (req, res) => {
  Bookmarks(db, req, res);
});

app.delete("/api/bookmarks/:userId/:artId", async (req, res) => {
  RemoveBookmark(db, req, res);
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

app.get("/admin/branches", (req, res) => {
  const sql = "SELECT * FROM users WHERE role = 'branch' ";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/api/bookmarks/:userId", async (req, res) => {
  const { userId } = req.params;

  const selectQuery = "SELECT art_id FROM bookmarks WHERE user_id = ?";

  db.query(selectQuery, [userId], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    const bookmarkedArtIds = result.map((row) => row.art_id);
    return res.status(200).json(bookmarkedArtIds);
  });
});

app.get("/userinfo", (req, res) => {
  const sql = "SELECT * FROM users WHERE id = ? ";
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

app.get("/user/art", (req, res) => {
  PostedArt(db, req, res);
});

app.get("/api/notifications", (req, res) => {
  Notifications(db, req, res);
});

app.get("/Withdraw/request", (req, res) => {
  WithdrawRequest(db, req, res);
});

app.get("/Withdraw/all", (req, res) => {
  WithdrawalList(db, req, res);
});
app.get("/sales/list", (req, res) => {
  SalesList(db, req, res);
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

app.post("/withdraw", (req, res) => {
  Withdrawal(db, req, res);
});

app.post("/api/rating", (req, res) => {
  Rating(db, req, res);
});

app.get("/api/rating/average/:art_id", (req, res) => {
  RatingAverage(db, req, res);
});

app.put("/art/approve/:id", (req, res) => {
  ApproveArt(db, req, res);
});
app.put("/seller/approve/:id", (req, res) => {
  ApproveSeller(db, req, res);
});

app.put("/payed/user/:id", (req, res) => {
  ApprovePayment(db, req, res);
});

app.get("/art/:id/average-rating", (req, res) => {
  AverageRating(db, req, res);
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

app.delete("/art/delete/:id", (req, res) => {
  delete_art(db, req, res);
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

app.get("/user/art/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM artwork WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Artwork not found" });
    }

    return res.status(200).json(result[0]); // Return only the first result
  });
});


app.delete("/user/art/:id", (req, res) => {
  const { id } = req.params;
  const sql = "UPDATE artwork SET deleted = 1 WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Artwork not found" });
    }

    return res.status(200).json({ message: "Artwork deleted successfully" });
  });
});

app.post("/addtocart", (req, res) => {
  AddToCart(db, req, res);
});

app.post("/cart", (req, res) => {
  const userId = req.body.userId;
  const sql = "SELECT * FROM cart WHERE user_id = ?";
  db.query(sql, [userId], (err, result) => {
    if (err) return res.json(err);
    else return res.json(result);
  });
});

app.post("/sold", (req, res) => {
  const userId = req.body.userId;
  const sql = "SELECT * FROM artwork WHERE user_id = ? and sales != 0";
  db.query(sql, [userId], (err, result) => {
    if (err) return res.json(err);
    else return res.json(result);
  });
});

app.post("/seles", (req, res) => {
  AddedSales(db, req, res);
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

app.put("/api/notifications/:id", (req, res) => {
  const notificationId = req.params.id;
  db.query(
    "UPDATE notifications SET status = false WHERE id = ?",
    [notificationId],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Internal server error" });
      }
      res.status(200).json({ message: "Notification updated successfully" });
    }
  );
});

app.post("/removecartitem", (req, res) => {
  const { id } = req.body;
  const sql = "DELETE FROM cart WHERE id=?";
  db.query(sql, [id], (err, response) => {
    if (err) return res.json(err);
    return res.json("item deleted successfully");
  });
});
app.post("/payment/pay", async (req, res) => {
  const tx_ref = await chapa.generateTransactionReference({
    prefix: "TX",
    size: 20,
  });
  const {
    cartData,
    totalPrice,
    fname,
    lname,
    user_Id,
    email,
    location,
    phoneNo,
  } = req.body;
  const cartDataJson = JSON.stringify(cartData);
  const options = {
    method: "POST",
    headers: {
      Authorization: "Bearer CHASECK_TEST-IJqQnyTRn7UAJGsBKOM0RJZn3Jr4XIQy",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: totalPrice,
      currency: "ETB",
      email: email,
      first_name: fname,
      last_name: lname,
      phone_number: "+251" + phoneNo,
      tx_ref: tx_ref,
      return_url: "http://localhost:5173/postpayed",
    }),
  };

  fetch("https://api.chapa.co/v1/transaction/initialize", options)
    .then((response) => response.json())
    .then((data) => {
      if (data.status == "success") {
        const sql =
          "INSERT INTO payment_detail (`user_id`,`fname`,`lname`,`phone_no`,`email`,`location`,`data`,`tx_ref`) VALUES (?,?,?,?,?,?,?,?)";
        db.query(
          sql,
          [
            user_Id,
            fname,
            lname,
            phoneNo,
            email,
            location,
            cartDataJson,
            tx_ref,
          ],
          (err, result) => {
            if (err) {
              console.log(err);
              return res.status(500).json({
                error: "An error occurred while inserting cart data.",
              });
            }
            return res.json(data);
          }
        );
      } else {
        return res.json(data);
      }
    })
    .catch((error) => console.error("Error:", error));
});
app.post("/branch", (req, res) => {
  const branchName = req.body.branchName;
  const sql =
    "SELECT * FROM payment_detail WHERE location = ? and print_status ='waiting'";
  db.query(sql, [branchName], (err, results) => {
    if (err) return res.json(err);
    else {
      return res.json(results);
    }
  });
});
app.post("/branch/approve", (req, res) => {
  const { paymentId, branchName } = req.body;
  const sql =
    "UPDATE payment_detail SET print_status = 'approved' WHERE id = ?";
  const AddCount = " ";

  db.query(sql, [paymentId], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

app.post("/branch/approved", (req, res) => {
  const branchName = req.body.branchName;
  const sql =
    "SELECT * FROM payment_detail WHERE location = ? and print_status = 'approved'";
  db.query(sql, [branchName], (err, results) => {
    if (err) return res.json(err);
    else {
      return res.json(results);
    }
  });
});
app.post("/branch/printed", (req, res) => {
  const branchName = req.body.branchName;
  const sql =
    "SELECT * FROM payment_detail WHERE location = ? and print_status = 'printed'";
  db.query(sql, [branchName], (err, results) => {
    if (err) return res.json(err);
    else {
      return res.json(results);
    }
  });
});

app.post("/print/complete", (req, res) => {
  const orderId = req.body.orderId;
  const sql = "UPDATE payment_detail SET print_status = 'printed' WHERE id = ?";
  db.query(sql, [orderId], (err, result) => {
    if (err) return res.json(err);
    else return res.json("Art added to printed");
  });
});

app.post("/print/complete", (req,res) =>{
  BranchPrinted(db,req,res)
});

app.post("/branch/deliver", (req,res) =>{
  const tx_ref = req.body.tx_ref
  const sql = "UPDATE payment_detail SET print_status = 'delivered' WHERE tx_ref = ?"
  db.query(sql,[tx_ref],(err,result)=>{
    if(err) return res.json(err)
    else return res.json("Art added to delivered")
  })
})
app.post("/branch/delivered", (req,res) =>{
  const branchName = req.body.branchName
  const sql = "SELECT * FROM payment_detail WHERE location = ? AND print_status = 'delivered'"
  db.query(sql,[branchName],(err,result)=>{
    if(err) return res.json(err)
    else return res.json(result)
  })
})




app.post('/postpayment',(req,res)=>{ 
  const {userId} = req.body
  const sql = 'DELETE FROM cart WHERE user_id = ?'
  db.query(sql,[userId],(err,result)=>{
    if(err) return res.json(err)
    else return res.json("Payment successful")
  })
})






app.post("/branch/deliver", (req, res) => {
  const tx_ref = req.body.tx_ref;
  const sql =
    "UPDATE payment_detail SET print_status = 'delivered' WHERE tx_ref = ?";
  db.query(sql, [tx_ref], (err, result) => {
    if (err) return res.json(err);
    else return res.json("Art added to delivered");
  });
});
app.post("/branch/delivered", (req, res) => {
  const branchName = req.body.branchName;
  const sql =
    "SELECT * FROM payment_detail WHERE location = ? AND print_status = 'delivered'";
  db.query(sql, [branchName], (err, result) => {
    if (err) return res.json(err);
    else return res.json(result);
  });
});

app.post("/postpayment", (req, res) => {
  const { userId } = req.body;
  const sql = "DELETE FROM cart WHERE user_id = ?";
  db.query(sql, [userId], (err, result) => {
    if (err) return res.json(err);
    else return res.json("Payment successful");
  });
});

app.post("/branch/verifypayment", async (req, res) => {
  try {
    const { tx_ref } = req.body;
    const response = await chapa.verify({
      tx_ref: tx_ref,
    });
    return res.json(response);
  } catch (error) {
    console.error("Error verifying payment:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while verifying the payment." });
  }
});
app.post("/branch/delete", async (req, res) => {
  try {
    const { tx_ref } = req.body;
    const sql = "DELETE FROM payment_detail WHERE tx_ref = ?";
    db.query(sql, [tx_ref], (err, results) => {
      if (err) return res.json(err);
      else {
        return res.json("order deleted successfully");
      }
    });
  } catch (error) {
    return res.json(error);
  }
});

app.get("/fetchBranch", async (req, res) => {
  try {
    const sql = "SELECT * FROM users WHERE role = 'branch' ";
    db.query(sql, (err, result) => {
      if (err) return res.json(err);
      else {
        return res.json(result);
      }
    });
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});
app.post("/ordereditems", async (req, res) => {
  try {
    const id = req.body.userId;
    const sql =
      "SELECT * FROM payment_detail WHERE user_id = ? AND print_status != 'delivered'";
    db.query(sql, [id], (err, result) => {
      if (err) return res.json(err);
      else {
        return res.json(result);
      }
    });
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});
app.get("/admin/admins", (req, res) => {
  const sql = "SELECT * FROM users WHERE role = 'admin' ";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.get("/price", (req, res) => {
  const sql = "SELECT * FROM print_price";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    else return res.json(data);
  });
});

app.get("/categories", (req, res) => {
  const sql = "SELECT * FROM category";
  db.query(sql, (err, result) => {
    if (err) return res.json(err);
    else return res.json(result);
  });
});

app.delete("/category/delete/:id", (req, res) => {
  const id = req.params.id;
  const deleteCategory = "DELETE FROM category WHERE id = ?";
  db.query(deleteCategory, id, (error, results) => {
    if (error) {
      res.json({ error: "Internal server error" });
    } else {
      res.json({ Message: "User deleted succefully" });
    }
  });
});

app.post("/addCategory", (req, res) => {
  const { categoryName } = req.body;
  const sql = "INSERT INTO category (`name`) VALUES (?)";
  db.query(sql, [categoryName], (err, result) => {
    if (err) return res.json(err);
    else return res.json(result);
  });
});

app.get("/printPrices", (req, res) => {
  // return res.json('something')
  const sql = "SELECT * FROM print_price";
  db.query(sql, (err, result) => {
    if (err) return res.json(err);
    else {
      return res.json(result);
    }
  });
});
app.post("/changePrintPrice", (req, res) => {
  const { size, newPrice } = req.body;
  const sql = "UPDATE print_price SET price = ? WHERE size = ?";
  db.query(sql, [newPrice, size], (err, result) => {
    if (err) return res.json(err);
    else {
      return res.json(size + " size print price changed successful!");
    }
  });
});

app.post("/navbarInfo", (req, res) => {
  const { userId } = req.body;
  const sql = "SELECT role FROM users WHERE id = ?";
  db.query(sql, [userId], (err, result) => {
    if (err) return res.json(err);
    else {
      return res.json(result[0].role);
    }
  });
});

app.get("/overview", (req, res) => {
  const usersQuery = "SELECT COUNT(*) AS userCount FROM users";
  const adminsQuery =
    "SELECT COUNT(*) AS adminCount FROM users WHERE role = 'admin'";
  const sellersQuery =
    "SELECT COUNT(*) AS sellerCount FROM users WHERE role = 'seller'";
  const buyersQuery =
    "SELECT COUNT(*) AS buyerCount FROM users WHERE role = 'buyer'";
  const artsQuery = "SELECT COUNT(*) AS artCount FROM artwork WHERE status = 1";
  const branchsQuery =
    "SELECT COUNT(*) AS branchCount FROM users WHERE role = 'branch'";
  let userCount, artCount, branchCount, adminCount, sellerCount, buyerCount;
  db.query(usersQuery, (err, userResult) => {
    if (err) {
      console.error("Error executing user SQL query:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    userCount = userResult[0].userCount;
    db.query(artsQuery, (err, artResult) => {
      if (err) {
        console.error("Error executing art SQL query:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      artCount = artResult[0].artCount;
      db.query(branchsQuery, (err, branchResult) => {
        if (err) return res.json(err);
        branchCount = branchResult[0].branchCount;
        db.query(adminsQuery, (err, adminResult) => {
          if (err) return res.json(err);
          adminCount = adminResult[0].adminCount;
          db.query(sellersQuery, (err, sellerReslut) => {
            if (err) return res.json(err);
            sellerCount = sellerReslut[0].sellerCount;
            db.query(buyersQuery, (err, buyerResult) => {
              if (err) return res.json(err);
              buyerCount = buyerResult[0].buyerCount;

              res.json({
                userCount,
                artCount,
                branchCount,
                adminCount,
                sellerCount,
                buyerCount,
              });
            });
          });
        });
      });
    });
  });
});

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
