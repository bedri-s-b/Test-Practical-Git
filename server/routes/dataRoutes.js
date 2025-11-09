// server/routes/dataRoutes.js
 import express from 'express';

  const router = express.Router();
// Взимаме функциите от localDB
import { fetchAllCards } from '../../LDB/database.js';
// const insertSampleData = require('../../LDB/insertSampleData');

// GET – взима данни от базата
router.get("/index", async (req, res) => {
  const cards = await fetchAllCards();
  res.json(cards);
  
});

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
