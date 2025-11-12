
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