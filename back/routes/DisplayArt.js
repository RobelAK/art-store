import express from 'express';
import path from 'path';

const app = express();

// Determine the directory path dynamically
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Serve static images
app.use('/images/artwork', express.static(path.join(__dirname, 'images/artwork')));

// Define function to display artwork
export default function displayArt(db) {
  return (req, res) => {
    const sql = 'SELECT * FROM artwork';
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error fetching artwork:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.json(results);
    });
  };
}
