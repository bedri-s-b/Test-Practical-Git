
export async function updateExample(db, example_id, name, description, example) {
   return await db.run(`UPDATE examples 
            SET 
                name = COALESCE(?, name),
                description = COALESCE(?, description),
                example = COALESCE(?, example)
            WHERE example_id = ?
                `,
        [name, description, example, example_id])
}