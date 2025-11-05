

import  express  from 'express';
import { initializeDatabase } from '../LDB/database.js';
import { fetchAllCards } from '../LDB/database.js';

// const selectSampleData = require('../localDB/selectSampleData');
// const dataRoutes = require('./routes/dataRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Инициализация на базата данни
let db;
(async () => {
  db = await initializeDatabase();
})();

// Middlewares
app.use(express.json());
app.use(express.static('public'));

// Маршрути
app.get("/index", async (req, res) => {
  const cards = await fetchAllCards();
  res.json(cards);
  
});

// Стартиране на сървъра
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


