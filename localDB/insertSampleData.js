const db = require('./database');

db.run(`INSERT INTO topics (name, short_descr) VALUES (?, ?)`,
  ['Machine Learning', 'Основи на машинното обучение'],
  function(err) {
    if (err) return console.error(err.message);
    console.log("Добавена тема с ID:", this.lastID);

    db.run(`INSERT INTO examples (name, description, example, topic_id)
            VALUES (?, ?, ?, ?)`,
            ['Линейна регресия', 'Основен модел', 'y = a*x + b', this.lastID],
            function(err) {
              if (err) console.error(err.message);
              else console.log("Добавен пример с ID:", this.lastID);
            });
});
