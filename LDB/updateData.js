
export async function updateExample(db, name, description, example, topic_id) {
    db.run(`UPDATE examples 
            SET 
                name = COALESCE(?, name),
                description = COALESCE(?, description),
                example = COALESCE(?, example),
            WHERE id = ?
                `,
        [name, description, example, topic_id])
}