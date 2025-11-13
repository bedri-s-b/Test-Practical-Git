import express from 'express';
import { fetchAllCards, addNewCard, fetchTopicById, fetchNamesOfTopics, fetchRelatedTopicNames } from '../../LDB/database.js';
import path from 'path';

const router = express.Router();

// Всички карти
router.get("/index", async (req, res) => {
  const cards = await fetchAllCards();
  res.json(cards);
});

// Страница за конкретна карта
router.get('/card/:id', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'card.html'));
});

// Данни за конкретна карта
router.get("/api/card/:id", async (req, res) => {
  const topicId = req.params.id;
  const topic = await fetchTopicById(topicId);
  const getRelatedTopicNames = await fetchRelatedTopicNames(topicId);
  topic.relatetTopics = getRelatedTopicNames;
  if (!topic) return res.status(404).json({ error: 'Topic not found' });
  res.json(topic);
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
