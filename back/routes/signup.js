import bcrypt from 'bcrypt'

export default async function signup(db, req, res) {
  
  const check = "SELECT * From users where email = ?";
  const { email, name, password, passwordConfirm } = req.body
  const hashedPassword = await bcrypt.hash(password,10)
  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
      password
    );

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar
    );
  }; 

  if (password == passwordConfirm) {
    db.query(check, [email], (err, result) => {
      if (err) return res.json({ Message: "Query error" })
      if (result.length == 0) {
        const sql = "INSERT INTO users (`name`,`email`,`password`,`role`) Values (?,?,?,?)";
        db.query(sql, [name, email, hashedPassword, 'buyer'], (err, data) => {
          if (err) return res.json({ Message: "query error" });
          return res.json({ signup: true, Message: 'You have Registered successfuly' });

        })
      }
      else {
        return res.json({ signup: false, Message: 'Email already exist' })
      }
    })
  }
  else return res.json({ signup: false, Message: "Password doesnt match" })
}
