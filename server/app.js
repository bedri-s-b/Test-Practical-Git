
import express from 'express';
import { initializeDatabase } from '../LDB/database.js';
import router from './routes/dataRoutes.js';

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
app.use('/', router)

// Стартиране на сървъра
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


