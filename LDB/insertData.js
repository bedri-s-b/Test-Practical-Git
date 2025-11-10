// localDB/insertData.js

export async function insertData(db) {
  try {
    // Проверка дали вече има данни
    const row = await db.get('SELECT COUNT(*) as count FROM topics');
    if (row.count > 0) {
      console.log('ℹ️ Данните вече съществуват.');
      return;
    }

    // Примерни теми
    const topics = [
      { name: 'Machine Learning', short_descr: 'Основи на машинното обучение' },
      { name: 'JavaScript', short_descr: 'Основи на JavaScript' },
      { name: 'Node.js', short_descr: 'Сървърна платформа с JS' },
      { name: 'React', short_descr: 'Frontend библиотека' },
      { name: 'HTML', short_descr: 'Език за маркиране на страници' },
      { name: 'CSS', short_descr: 'Стилизиране на страници' },
      { name: 'SQL', short_descr: 'Език за бази данни' },
      { name: 'SQLite', short_descr: 'Лека база данни' },
    ];

    // Вмъкваме темите една по една
    for (const topic of topics) {
      await db.run(
        'INSERT INTO topics (name, short_descr) VALUES (?, ?)',
        [topic.name, topic.short_descr]
      );
    }

    console.log('✅ Темите са добавени.');

    // Примерни примери
    const examples = [
      { name: 'Линейна регресия', description: 'Основен модел', example: 'y = a*x + b', topic_id: 1 },
      { name: 'Hello World JS', description: 'Основен пример', example: 'console.log("Hello World");', topic_id: 2 },
      { name: 'Node Server', description: 'Прост сървър', example: 'const http = require("http");', topic_id: 3 },
      { name: 'React Component', description: 'Функционален компонент', example: 'function App() { return <h1>Hello</h1>; }', topic_id: 4 },
      { name: 'SQL Select', description: 'Избиране на данни', example: 'SELECT * FROM topics;', topic_id: 7 },
      { name: 'SQLite Create Table', description: 'Създаване на таблица', example: 'CREATE TABLE test(id INTEGER);', topic_id: 8 },
    ];

    for (const ex of examples) {
      await db.run(
        'INSERT INTO examples (name, description, example, topic_id) VALUES (?, ?, ?, ?)',
        [ex.name, ex.description, ex.example, ex.topic_id]
      );
    }

    console.log('✅ Примерите са добавени.');
  } catch (err) {
    console.error('❌ Грешка при добавяне на данни:', err.message);
  }
}

// Add New card into table
export async function addCard(db, title, description, topics) {
  try {
    const topic = await db.run('INSERT INTO topics (name, short_descr) VALUES (?, ?)',
        [title, description]);
    const topics_topics = topics.map(t => db.run(
      'INSERT INTO topics_topics (topic_id, connected_topic_id) VALUES (?, ?)',
      [topic.lastID, t]));
    await Promise.all(topics_topics);
    console.log('✅ Новият cheat sheet е добавен успешно.');
  } catch (err) {
    console.error('❌ Грешка при добавяне на нов cheat sheet:', err.message);
  }  
}