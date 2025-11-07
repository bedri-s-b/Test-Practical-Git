
export function getAllCards(db) {
  return db.all('SELECT * FROM topics');
}