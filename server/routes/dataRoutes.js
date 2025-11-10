
// server/routes/dataRoutes.js
import express from 'express';
import { fetchAllCards } from '../../LDB/database.js';
import { addNewCard } from '../../LDB/database.js';

const router = express.Router();
// GET – взима данни от базата
router.get("/index", async (req, res) => {
  const cards = await fetchAllCards();
  res.json(cards);

});

// GET - взима данни за конкретна тема
router.get("/card/topic/:id", async (req, res) => {
 //to be implemented
});

// POST – добавя нови данни в базата
router.post('/add', async (req, res) => {
  try {
    const { title, description, topics } = req.body;
    await addNewCard(title, description, topics);
    res.status(201).json({ message: 'Card added successfully' });
  } catch (err) {
    console.error('❌ Error adding data:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

export default router;
