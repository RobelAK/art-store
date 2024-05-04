export default async function ApproveSeller(db, req, res) {
  const id = req.params.id;
  const updateUser = 'UPDATE users SET role = "seller" WHERE id = ?';
  const deletePendingSeller = "DELETE FROM sellers WHERE user_id = ?";
  const insertNotification = 'INSERT INTO notifications (user_id, message) VALUES (?, ?)';
  const message = "Congrats!, you are now a seller"; 
  
  db.query(deletePendingSeller, [id], async (err, result) => {
    if (err) {
      console.error('Error deleting pending seller:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    console.log('Deleted pending seller successfully');

    db.query(updateUser, [id], async (err, result) => {
      if (err) {
        console.error('Error updating user role:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      console.log('Updated user role to seller successfully');

      // Insert notification
      db.query(insertNotification, [id, message], (err, result) => {
        if (err) {
          console.error('Error inserting notification:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }

        console.log('Inserted notification successfully');

        res.json({ Message: "Seller approved successfully" });
      });
    });
  });
}
