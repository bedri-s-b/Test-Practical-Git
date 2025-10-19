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


// Добавяне на още примерни данни
// Примерни теми
const topics = [
    { name: 'JavaScript', short_descr: 'Основи на JavaScript' },
    { name: 'Node.js', short_descr: 'Сървърна платформа с JS' },
    { name: 'React', short_descr: 'Frontend библиотека' },
    { name: 'HTML', short_descr: 'Език за маркиране на страници' },
    { name: 'CSS', short_descr: 'Стилизиране на страници' },
    { name: 'SQL', short_descr: 'Език за бази данни' },
    { name: 'SQLite', short_descr: 'Лека база данни' },
    { name: 'MongoDB', short_descr: 'NoSQL база данни' },
    { name: 'Express', short_descr: 'Node.js framework' },
    { name: 'Git', short_descr: 'Система за контрол на версиите' },
    { name: 'GitHub', short_descr: 'Онлайн хостинг за Git' },
    { name: 'Linux', short_descr: 'Операционна система' },
    { name: 'Python', short_descr: 'Програмен език' },
    { name: 'Java', short_descr: 'Обектно-ориентиран език' },
    { name: 'Spring Boot', short_descr: 'Java framework за бекенд' },
    { name: 'TypeScript', short_descr: 'JS с типове' },
    { name: 'Docker', short_descr: 'Контейнеризация' },
    { name: 'Kubernetes', short_descr: 'Оркестрация на контейнери' },
    { name: 'REST API', short_descr: 'Архитектурен стил за API' },
    { name: 'GraphQL', short_descr: 'Алтернатива на REST API' },
];

// Вкарваме темите в базата
db.serialize(() => {
    const stmt = db.prepare("INSERT INTO topics(name, short_descr) VALUES (?, ?)");

    topics.forEach(topic => {
        stmt.run(topic.name, topic.short_descr);
    });

    stmt.finalize();

    // Примери за някои теми (topic_id трябва да знаете предварително или да ги вземете)
    const examples = [
        { name: 'Hello World JS', description: 'Основен пример', example: 'console.log("Hello World");', topic_id: 1 },
        { name: 'Node Server', description: 'Прост сървър', example: 'const http = require("http");', topic_id: 2 },
        { name: 'React Component', description: 'Функционален компонент', example: 'function App() { return <h1>Hello</h1>; }', topic_id: 3 },
        { name: 'SQL Select', description: 'Избиране на данни', example: 'SELECT * FROM topics;', topic_id: 6 },
        { name: 'SQLite Create Table', description: 'Създаване на таблица', example: 'CREATE TABLE test(id INTEGER);', topic_id: 7 },
    ];

    const stmtEx = db.prepare("INSERT INTO examples(name, description, example, topic_id) VALUES (?, ?, ?, ?)");
    examples.forEach(ex => {
        stmtEx.run(ex.name, ex.description, ex.example, ex.topic_id);
    });
    stmtEx.finalize();
});

