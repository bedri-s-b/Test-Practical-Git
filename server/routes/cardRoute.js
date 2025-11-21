import express from 'express';
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

export default routerCard;