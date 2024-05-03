export default async function DeclineSeller(db, req, res) {
  const id = req.params.id;

  const deleteFromSellers = 'DELETE FROM sellers WHERE user_id = ?';
  const insertNotification = 'INSERT INTO notifications (user_id, message) VALUES (?, ?)';
  const message = "sorry! ,your not approved as a seller"; 

  db.query(deleteFromSellers, [id], (errSellers, resultSellers) => {
    if (errSellers) {
      console.error('Error declining seller (sellers table):', errSellers);
      return res.status(500).json({ error: 'Internal server error' });
    }

    // Insert notification
    db.query(insertNotification, [id, message], (errNotification, resultNotification) => {
      if (errNotification) {
        console.error('Error inserting notification:', errNotification);
        return res.status(500).json({ error: 'Internal server error' });
      }

      res.json({ message: 'Seller declined successfully' });
    });
  });
}
