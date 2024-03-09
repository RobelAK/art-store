import { promisify } from "util";
import crypto from 'crypto';
import transporter from "./node_mailer.js";

const ResetPassword = async (db, req, res) => {
  const { email } = req.body;
  console.log(email)
  // Check if user exists in the database
  const getUserQuery = 'SELECT * FROM users WHERE email = ?';
  const promisifiedQuery = promisify(db.query).bind(db);

  try {
    const result = await promisifiedQuery(getUserQuery, [email]);
    console.log(result)

    if (result.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    let token;
    let expires;

    // Ensure the generated token is unique
    do {
      token = crypto.randomBytes(20).toString('hex');
      const checkTokenQuery = 'SELECT * FROM reset_tokens WHERE token = ?';
      const tokenCheckResult = await promisifiedQuery(checkTokenQuery, [token]);
      console.log("Error ",tokenCheckResult)
      if (tokenCheckResult.length === 0) {
        // If token is unique, break from the loop
        console.log("DONE")
        break;
      }
    } while (true);

    expires = Date.now() + 3600000; // Token expires in 1 hour

    const insertTokenQuery = 'INSERT INTO reset_tokens (user_id, email, token, expires) VALUES (?, ?, ?, ?)';
    await promisifiedQuery(insertTokenQuery, [result[0].id, email, token, expires]);
    
    
    // Send reset email with the token link
    const resetLink = `http://localhost:8081/users/resetPassword/${token}`;
    const mailOptions = {
      from: 'nahomgore@gmail.com',
      to: email,
      subject: 'Password Reset',
      text: `Click the following link to reset your password: ${resetLink}`,
    };

    transporter.sendMail(mailOptions, async (mailError) => {
      if (mailError) {
       // console.log(mailError);
        return res.status(500).json({ message: 'Failed to send reset email' });
      }

      // Set a timeout to remove the token after one hour
      setTimeout(async () => {
        const deleteTokenQuery = 'DELETE FROM reset_tokens WHERE token = ?';
        await promisifiedQuery(deleteTokenQuery, [token]);
      }, 3600000);

      return res.json({ message: 'Reset email sent successfully' });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Database error' });
  }
};

export default ResetPassword;