import express from 'express';
import { upDateExampleById } from '../../LDB/database.js';

import path from 'path';
import { deleteExampleById } from '../../LDB/database.js'

const routerCard = express.Router();

// Страница за конкретна карта
routerCard.get('/:id', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'card.html'));
});

// Добавяне на пример
routerCard.get("/example/:id", async (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'card.html'));
})

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

//Триене на Пример

routerCard.delete('/example/delete/:id',async (req, res) =>{
    try{
        const id = req.params.id;

        const result = deleteExampleById(id);
        res.json({
            message: 'Example delete seccessfuly',
            changes: result 
        });
        
    } catch (err){
        console.log(err);
        res.status(500).json({error: 'DB error while deleting'});
    }
});

export default routerCard;