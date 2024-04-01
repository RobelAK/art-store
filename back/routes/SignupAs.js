export default async function SignupAs(db, req, res) {
  try {
    const user_id = req.params.user_id;
    console.log('User ID:', user_id); 
    const { name, email, portfolioLink, description } = req.body; // Extract form data

    if (!user_id || !name || !email || !portfolioLink || !description) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Update user details in the users table
    const updateUserQuery = `
      UPDATE users
      SET name = ?, email = ?
      WHERE id = ?
    `;
    db.query(updateUserQuery, [name, email, user_id], (err, updateResults) => {
      if (err) {
        console.error('Error updating user: ', err);
        return res.status(500).json({ error: 'Error updating user' });
      }

      // Insert seller details into the sellers table
      const insertSellerQuery = `
        INSERT INTO sellers (portfolio_link, description, user_id)
        VALUES (?, ?, ?)
      `;
      db.query(insertSellerQuery, [portfolioLink, description, user_id], (sellerErr, sellerResults) => {
        if (sellerErr) {
          console.error('Error inserting seller details: ', sellerErr);
          return res.status(500).json({ error: 'Error inserting seller details' });
        }
        
        console.log('User and seller details updated successfully');
        return res.status(200).json({ message: 'User and seller details updated successfully' });
      });
    });
  } catch (error) {
    console.error('Error in SignupAs:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
