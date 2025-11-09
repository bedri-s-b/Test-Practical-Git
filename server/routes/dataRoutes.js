import express from 'express';

const router = express.Router();

// Взимаме функциите от localDB
// Взимаме функциите от localDB
// Взимаме функциите от localDB
import { initializeDatabase } from '../../LDB/database.js';
import { fetchAllCards } from '../../LDB/database.js';
import e from 'express';

// const insertSampleData = require('../../LDB/insertSampleData');

// GET – взима данни от базата
router.get("/index", async (req, res) => {
  const cards = await fetchAllCards();
  res.json(cards);
  
});



export default router;
