import express from 'express';
import { fetchTopicById, fetchRelatedTopicNames, fetchRelatedExamples, addNewExample } from '../../LDB/database.js';


const routerApi = express.Router();

//Записване на пример в базата
routerApi.post("/example/:id", async (req, res) => {
    try {
        const { title, description, example, tipicId } = req.body;
        await addNewExample(title, description, example, tipicId)
        res.status(201).json({ message: 'Example added successfully' });
    } catch (error) {
        onsole.error('❌ Error adding data:', err);
        res.status(500).json({ error: 'Database error' });
    }

});

// Данни за конкретна карта
routerApi.get("/card/:id", async (req, res) => {
    const topicId = req.params.id;
    const topic = await fetchTopicById(topicId);
    topic.relatetTopics = await fetchRelatedTopicNames(topicId);
    topic.examples = await fetchRelatedExamples(topicId);
    if (!topic) return res.status(404).json({ error: 'Topic not found' });
    res.json(topic);
});


export default routerApi;
