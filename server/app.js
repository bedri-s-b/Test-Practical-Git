
import  express  from 'express';
import { initializeDatabase } from '../LDB/database.js';
import { fetchAllCards } from '../LDB/database.js';
import os from 'os';
import router from './routes/dataRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;
const interfaces = os.networkInterfaces();
const localIp = Object.values(interfaces)
  .flat()
  .find(i => i.family === 'IPv4' && !i.internal)?.address;

// Инициализация на базата данни
let db;
(async () => {
  db = await initializeDatabase();
})();

// Middlewares
app.use(express.json());
app.use(express.static('public'));
app.use('/', router);

// Стартиране на сървъра
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on:`);
  console.log(`→ Local:  http://localhost:${PORT}`);
  console.log(`→ LAN:    http://${localIp}:${PORT}`);
});


