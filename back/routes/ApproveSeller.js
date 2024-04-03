export default async function ApproveSeller(db, req, res) {
  const id = req.params.id;
  const updateUser = 'UPDATE users SET role = "seller" WHERE id = ?';
  const deletePendingSeller = "DELETE FROM sellers WHERE user_id = ?";
  db.query(deletePendingSeller, [id], async (err, result) => {});
  db.query(updateUser, [id], async (err, result) => {});
  res.json({ Message: "Seller approved successfully" });
}
