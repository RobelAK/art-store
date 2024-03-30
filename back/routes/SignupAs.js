export default async function SignupAs(db, req, res) {
  try {
    // Extract user ID and request body parameters
    const userId = req.params.userId;
    const { name, email, portfolioLink, description } = req.body;

    // Validate input parameters
    if (!userId || !name || !email || !portfolioLink || !description) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const query = `
      UPDATE users
      SET name = ?, email = ?, portfolio_link = ?, description = ?
      WHERE id = ?
    `;
    db.query(query, [name, email, portfolioLink, description, userId], (err, results) => {
      if (err) {
        console.error('Error updating user: ', err);
        return res.status(500).json({ error: 'Error updating user' });
      }
      console.log('User updated successfully');
      return res.status(200).json({ message: 'User updated successfully' });
    });
  } catch (error) {
    console.error('Error in SignupAs:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
