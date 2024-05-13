// export default async function signup(transporter, db, req, res) {
//   try {
//     const { email, name, password, passwordConfirm } = req.body;

//     // Check if password matches confirmation
//     if (password !== passwordConfirm) {
//       return res.json({ verificationSent: false, message: "Password doesn't match" });
//     }

//     // Check if email already exists in users table
//     const checkUserQuery = "SELECT * FROM users WHERE email = ?";
//     db.query(checkUserQuery, [email], async (err, userResult) => {
//       if (err) {
//         console.error("Error checking existing user:", err);
//         return res.json({ verificationSent: false, message: "Database error" });
//       }
      
//       if (userResult.length > 0) {
//         return res.json({ verificationSent: false, message: "Email already exists" });
//       }

//       // Generate random verification code
//       const verificationCode = Math.random().toString(36).substr(2, 6);

//       // Insert or update verification code in pending_user table
//       const selectSql = "SELECT * FROM pending_user WHERE email = ?";
//       const selectResult = await queryDb(db, selectSql, [email]);

//       let query, queryParams;
//       if (selectResult.length === 0) {
//         query = "INSERT INTO pending_user (email, verificationCode) VALUES (?, ?)";
//         queryParams = [email, verificationCode];
//       } else {
//         query = "UPDATE pending_user SET verificationCode = ? WHERE email = ?";
//         queryParams = [verificationCode, email];
//       }

//       await queryDb(db, query, queryParams);

//       // Send verification email
//       const mailOptions = {
//         from: "robelaklilu100@gmail.com",
//         to: email,
//         subject: "Email Verification",
//         text: `Your verification code is: ${verificationCode}`,
//       };

//       await transporter.sendMail(mailOptions);
//       console.log("Email sent.");

//       return res.json({ verificationSent: true, message: "Verification code sent to your email" });
//     });
//   } catch (error) {
//     console.error("Error occurred:", error);
//     return res.json({ verificationSent: false, message: "Internal server error" });
//   }
// }

// async function queryDb(db, query, params) {
//   return new Promise((resolve, reject) => {
//     db.query(query, params, (err, result) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(result);
//       }
//     });
//   });
// }






























export default async function signup(transporter, db, req, res) {
  try {
    const { email, name, password, passwordConfirm } = req.body;

    if (password !== passwordConfirm) {
      return res.json({ verificationSent: false, message: "Password doesn't match" });
    }

    const checkUserQuery = "SELECT * FROM users WHERE email = ?";
    
    const userResult = await queryDb(db, checkUserQuery, [email]);

    if (userResult.length > 0) {
      return res.json({ verificationSent: false, message: "Email already exists" });
    }

    const verificationCode = generateRandomCode();

    const selectSql = "SELECT * FROM pending_user WHERE email = ?";
    const selectResult = await queryDb(db, selectSql, [email]);

    let query, queryParams;
    if (selectResult.length === 0) {
      query = "INSERT INTO pending_user (email, verificationCode) VALUES (?, ?)";
      queryParams = [email, verificationCode];
    } else {
      query = "UPDATE pending_user SET verificationCode = ? WHERE email = ?";
      queryParams = [verificationCode, email];
    }

    await queryDb(db, query, queryParams);

    const mailOptions = {
      from: "robelaklilu100@gmail.com",
      to: email,
      subject: "Email Verification",
      text: `Your verification code is: ${verificationCode}`,
    };

    await sendVerificationEmail(transporter, mailOptions);

    console.log("Email sent.");

    return res.json({ verificationSent: true, message: "Verification code sent to your email" });
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).json({ verificationSent: false, message: "Internal server error" });
  }
}

async function queryDb(db, query, params) {
  return new Promise((resolve, reject) => {
    db.query(query, params, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function generateRandomCode() {
  return Math.random().toString(36).substr(2, 6);
}

async function sendVerificationEmail(transporter, mailOptions) {
  
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
}
