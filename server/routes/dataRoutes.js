import express from 'express';
import { fetchAllCards, addNewCard, fetchNamesOfTopics } from '../../LDB/database.js';

const router = express.Router();

// Всички карти
router.get("/index", async (req, res) => {
  const cards = await fetchAllCards();
  res.json(cards);
});

// Добавяне на нова карта
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

// Вземане на иманата всички теми
router.get('/topics/names', async (req, res) => {
  try {
    const names = await fetchNamesOfTopics();
    res.json(names);
  } catch (err) {
    console.error('❌ Error fetching topic names:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

export default router;
