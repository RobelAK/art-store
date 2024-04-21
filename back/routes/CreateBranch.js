export default async function CreateBranch(db,req, res) {
  const { name, location, password } = req.body;

  try {
    const result = await db.query('INSERT INTO branches (name, location, password) VALUES (?, ?, ?)', [name, location, password]);
    const insertedBranchId = result.insertId;
    res.status(201).json({ success: true, message: 'Branch added successfully', insertedBranchId });
  } catch (error) {
    console.error('Error adding branch:', error);
    res.status(500).json({ success: false, message: 'Failed to add branch' });
  }
}