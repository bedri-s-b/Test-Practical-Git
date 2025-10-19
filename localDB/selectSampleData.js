const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('cheat_sheets.db', (err) => {
  if (err) return console.error(err.message);
});

// Покажи всички теми
db.all("SELECT * FROM topics ORDER BY topic_id", [], (err, rows) => {
  if (err) return console.error(err.message);
  console.log("=== TOPICS ===");
  console.table(rows);
});

// Покажи всички примери
db.all("SELECT * FROM examples ORDER BY example_id", [], (err, rows) => {
  if (err) return console.error(err.message);
  console.log("=== EXAMPLES ===");
  console.table(rows);
});

// Join: примери + име на тема
db.all(`
  SELECT e.example_id, e.name AS example_name, e.description, e.example, t.name AS topic_name
  FROM examples e
  LEFT JOIN topics t ON e.topic_id = t.topic_id
  ORDER BY e.example_id
`, [], (err, rows) => {
  if (err) return console.error(err.message);
  console.log("=== EXAMPLES WITH TOPIC ===");
  console.table(rows);
});

// Покажи връзките между темите
db.all("SELECT * FROM topics_topics ORDER BY topic_id, connected_topic_id", [], (err, rows) => {
  if (err) return console.error(err.message);
  console.log("=== TOPICS TOPICS ===");
  console.table(rows);
});

// Затваряне (малко закъснение за асинхронните заявки да приключат)
setTimeout(() => db.close(), 500);
