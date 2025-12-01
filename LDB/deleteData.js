export async function deleteExampleByIdDB(db, id) {
    return db.run(`DELETE FROM examples WHERE example_id = ?`, [id])
}