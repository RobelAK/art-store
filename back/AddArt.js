import multer from "multer";

export default async function AddArt(db, req, res) {

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, "./images/Artwork");
  },
  filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({storage});

app.post('/add/upload', upload.single('art'), (req, res) => {
  const sql = "INSERT INTO artwork (`title`, `description`, `category`, `price`, `art`) VALUES (?, ?, ?, ?, ?)";
  const values = [
      req.body.title,
      req.body.description,
      req.body.category,
      req.body.price, 
      req.file.filename
  ];
  db.query(sql, values, (err, result) => {
      if(err) {
          console.log("Error in SQL Query:", err);
          return res.json({ error: "Error in database query" });
      }
      return res.json({ status: "Success" });
  });
});
}
