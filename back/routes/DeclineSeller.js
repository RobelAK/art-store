export default function DeclineSeller(db, req, res) {
  const id = req.params.id;

  const deleteFromSellers = 'DELETE FROM sellers WHERE user_id = ?';

  db.query(deleteFromSellers, [id], (errSellers, resultSellers) => {
    if (errSellers) {
      console.error('Error declining seller (sellers table):', errSellers);
      return res.status(500).json({ error: 'Internal server error' });
    }

    res.json({ message: 'Seller declined successfully' });
  });
}
