import express from 'express';
import { upDateExampleById } from '../../LDB/database.js';

import path from 'path';

const routerCard = express.Router();

// Страница за конкретна карта
routerCard.get('/:id', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'card.html'));
});

// Добавяне на пример
routerCard.get("/example/:id", async (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'card.html'));
})

// //Вземане на формрата
// routerCard.get('/example/edit/:id', async (req, res) => {
//     res.sendFile(path.join(process.cwd(), 'public', 'card.html'));
// })



//Редактиране на на Пример
routerCard.patch('/example/edit/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const { title, description, example } = req.body;

        const result = await upDateExampleById(
            id,
            title,
            description,
            example
        );

        res.json({
            message: "Updated successfully",
            changes: result
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "DB error" });
    }
});

export default routerCard;