
export async function createTables(db) {

    await db.exec(`
    CREATE TABLE IF NOT EXISTS topics (
      topic_id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      short_descr TEXT
    )
  `);

    await db.exec(`
    CREATE TABLE IF NOT EXISTS topics_topics (
      topic_id INTEGER NOT NULL,
      connected_topic_id INTEGER NOT NULL,
      PRIMARY KEY (topic_id, connected_topic_id),
      FOREIGN KEY (topic_id) REFERENCES topics(topic_id),
      FOREIGN KEY (connected_topic_id) REFERENCES topics(topic_id)
    )
  `);

    await db.exec(`
    CREATE TABLE IF NOT EXISTS examples (
      example_id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      example TEXT,
      source TEXT,
      topic_id INTEGER NOT NULL,
      FOREIGN KEY (topic_id) REFERENCES topics(topic_id)
    )
  `);

    console.log('✅ Таблиците са готови.');
}
