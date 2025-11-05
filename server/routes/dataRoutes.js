// server/routes/dataRoutes.js
const express = require('express');
const router = express.Router();

// Взимаме функциите от localDB
const selectInitialData = require('../../LDB/selectSampleData').selectSampleData;
// const insertSampleData = require('../../LDB/insertSampleData');

// GET – взима данни от базата
router.get('/sample', async (req, res) => {
  try {
    const data = await selectInitialData();
    res.json(data);
    console.log(data);
  } catch (err) {
    console.error('❌ Error fetching data:', err);
    res.status(500).json({ error: 'Database error' });
  }
});



module.exports = router;
