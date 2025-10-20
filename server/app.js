const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = process.env.PORT || 3000;  
// const selectSampleData = require('./localDB/cheadt_sheets.db');

// Свързваме се с базата
const db = new sqlite3.Database(path.join(__dirname, '../localDB/cheat_sheets.db'), (err) => {
    if (err) console.error('Грешка при свързване с базата:', err.message);
    else console.log('✅ Свързване с базата успешно!');
});
app.locals.db = db;

// Middleware за статични файлове
app.use(express.static(path.join(__dirname, 'public')));

// Middleware за парсване на JSON тела
app.use(express.json());

// Рутер за извличане на примерни данни
app.get('/api/sample-data', async (req, res) => {
  try {
    const data = await selectSampleData();
    res.json(data);
  } catch (error) {
    console.error('Error fetching sample data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Стартиране на сървъра
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
