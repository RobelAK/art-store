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
import { Chapa } from 'chapa-nodejs';


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

const chapa = new Chapa({
  secretKey: "CHASECK_TEST-IJqQnyTRn7UAJGsBKOM0RJZn3Jr4XIQy",
});

app.post("/signup", async (req, res) => {
  signup(db, req, res);
});

app.post("/login", async (req, res) => {
  login(db, req, res);
});


app.post('/api/art/bookmark/:id', (req, res) => {
  toggleArtBookmark(db, req, res);
});


app.get('/api/bookmarked-art/:userId', async (req, res) => {
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

app.get('/api/bookmarks/:userId', async (req, res) => {
  const { userId } = req.params;

  const selectQuery = 'SELECT art_id FROM bookmarks WHERE user_id = ?';

  db.query(selectQuery, [userId], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    const bookmarkedArtIds = result.map(row => row.art_id);
    return res.status(200).json(bookmarkedArtIds);
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

app.get('/user/art', (req, res) => {
  PostedArt(db, req, res);
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
app.post("/payment/pay", async (req, res) => {
  const tx_ref = await chapa.generateTransactionReference({
    prefix: "TX",
    size: 20,
  });

  const currentDateAndTime = new Date();

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
      phone_number : ('+251' + phoneNo),
      tx_ref: tx_ref,
      // "callback_url": "https://webhook.site/077164d6-29cb-40df-ba29-8a00e59a7e60",
      return_url: "http://localhost:5173/payed",
      customization: {
        title: "Payment",
        description: "I love online payments",
      },
    }),
  };

  fetch("https://api.chapa.co/v1/transaction/initialize", options)
    .then((response) => response.json())
    .then((data) => {
      if (data.status == "success") {
        const sql =
          "INSERT INTO payment_detail (`user_id`,`fname`,`lname`,`phone_no`,`email`,`location`,`data`,`tx_ref`,`datetime`) VALUES (?,?,?,?,?,?,?,?,?)";
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
            currentDateAndTime,
          ],
          (err, result) => {
            if (err) {
              return res
                .status(500)
                .json({
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




app.get('/branch',(req, res) => {

  const sql = "SELECT * FROM payment_detail"
  db.query(sql, (err,results)=>{
    if(err) return res.json(err)
    else{
      const somethingincart = results
      return res.json(somethingincart)
  }
  })
})

app.post('/branch/verifypayment', async (req, res) => {
  try {
    const {tx_ref} = req.body;
    const response = await chapa.verify({
      tx_ref: tx_ref,
    });
    return res.json(response);
  } catch (error) {
    console.error("Error verifying payment:", error);
    return res.status(500).json({ error: "An error occurred while verifying the payment." });
  }
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
