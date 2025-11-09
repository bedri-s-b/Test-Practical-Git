
// server/routes/dataRoutes.js
 import express from 'express';

  const router = express.Router();
import { fetchAllCards } from '../../LDB/database.js';

// GET – взима данни от базата
router.get("/index", async (req, res) => {
  const cards = await fetchAllCards();
  res.json(cards);
  
});
// POST – добавя нови данни в базата
router.post('/add', async (req, res) => {
  try {
    // Here you would handle the insertion logic using the data from req.body
    // For example:
    // await insertSampleData(req.body);
    res.status(200).json({ message: 'Data added successfully' });
  } catch (err) {
    console.error('❌ Error adding data:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

export default router;
