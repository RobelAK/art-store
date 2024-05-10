export default function AddAvatar(db, req, res) {

    const { id } = req.body;

    const avatarFilename = req.file.filename;
    const updateAvatarQuery = "UPDATE users SET avatar = ? WHERE id = ?";
    db.query(updateAvatarQuery, [avatarFilename, id], (err, result) => {
      if (err) {
        console.error("Error updating avatar:", err);
        return res.status(500).json({ message: "Error updating avatar" });
      }
      res.json({ message: "Avatar changed successfully" });
    });
  }
  

