const sqlite3 = require('sqlite3').verbose();

// Създаваме или отваряме база cheat_sheets.db
const db = new sqlite3.Database('cheat_sheets.db', (err) => {
    if (err) {
        console.error('Грешка при отваряне на базата', err.message);
    } else {
        console.log('Базата е готова!');
    }
});


// Създаваме всички таблици в един serialize блок
db.serialize(() => {
    // Таблица topics
    db.run(`
        CREATE TABLE IF NOT EXISTS topics (
            topic_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            short_descr TEXT
        )
    `);

    // Таблица topics_topics (с връзки към topics)
    db.run(`
        CREATE TABLE IF NOT EXISTS topics_topics (
            topic_id INTEGER NOT NULL,
            connected_topic_id INTEGER NOT NULL,
            PRIMARY KEY (topic_id, connected_topic_id),
            FOREIGN KEY (topic_id) REFERENCES topics(topic_id),
            FOREIGN KEY (connected_topic_id) REFERENCES topics(topic_id)
        )
    `);

    // Таблица examples (с външен ключ към topics)
    db.run(`
        CREATE TABLE IF NOT EXISTS examples (
            example_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(255) NOT NULL,
            description TEXT,
            example MEDIUMTEXT,
            topic_id INT NOT NULL,
            FOREIGN KEY (topic_id) REFERENCES topics(topic_id)
        )
    `);
});


module.exports = db;
// Експортираме обекта на базата данни за използване в други файлове
