
export function getAllCards(db) {
  return db.all('SELECT * FROM topics');
}

// Fetch topic by ID
export async function getTopicById(db, id) {
  return db.get('SELECT * FROM topics WHERE topic_id = ?', [id]);
} 