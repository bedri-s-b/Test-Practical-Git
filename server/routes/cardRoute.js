import express from 'express';
import { upDateExampleById} from '../../LDB/database.js';

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
routerCard.put('/example/edit/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id);

    await upDateExampleById()
    // res.json({
    //     message: "Updated successfully",
    //     changes: this.changes
    // });
})

export default routerCard;