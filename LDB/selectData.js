
export function getAllCards(db) {
  return db.all('SELECT * FROM topics');
}

// Fetch topic by ID
export async function getTopicById(db, id) {
  return db.get('SELECT * FROM topics WHERE topic_id = ?', [id]);
}

// Fethch names ot all topics
export async function getAllTopicNames(db) {
  return db.all('SELECT name FROM topics');
}

//Fetch names of related topics by IDs
export async function getRelatedTopicNames(db, topicIds) {
  const data = await db.all(
    `SELECT connected_topic_id FROM topics_topics WHERE topic_id = ?`, [topicIds]);
  return data;
};

//Fetch all examples related to a topic
export async function getRelatedExamples(db, topicId) {
  const data = await db.all(`SELECT * FROM examples WHERE topic_id = ?`, [topicId]);
  return data
}

//Fetch one example
export async function getOneExample(db, exampleId) {
  return await db.all(`SELECT * FROM examples WHERE example_id = ?`, [exampleId]);
} 