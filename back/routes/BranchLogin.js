const BranchLogin = (db, req, res) => {
  console.log('Request body:', req.body);
  const { name, password } = req.body;

  // Query the database to check if the branch exists
  db.query('SELECT * FROM branches WHERE name = ? AND password = ?', [name, password], (error, results) => {
    if (error) {
      console.error('Error executing SQL query:', error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }

    // Check if the branch exists
    if (results.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Branch exists, send success response
    res.status(200).json({ success: true, message: 'Login successful' });
  });
};

export default BranchLogin;
