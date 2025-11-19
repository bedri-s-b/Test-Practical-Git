// local Database Module

import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

import { createTables } from './createTables.js';
import { addCard, insertData } from './insertData.js';
import { getAllCards, getTopicById, getAllTopicNames, getRelatedTopicNames, getRelatedExamples } from './selectData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, 'cheat_sheets.db');

let db;

// Отваряме базата данни
async function openDB() {
    const connection = await open({
        filename: dbPath,
        driver: sqlite3.Database
    });
    return connection;
}

export async function initializeDatabase() {
    if (!db) db = await openDB();
    console.log('✅ Свързан с базата cheat_sheets.db');
    await createTables(db); 
    await insertData(db);
    return db;
}

export async function fetchAllCards() {
    if (!db) db = await openDB();
    const cards = await getAllCards(db);
    return cards;
}

export async function addNewCard(title, description, topics) {
    return addCard(db, title, description, topics);
}

export async function fetchTopicById(id) {
    if (!db) db = await openDB();
    const topic = await getTopicById(db, id);
    return topic;
}

export async function fetchNamesOfTopics() {
    if (!db) db = await openDB();
    const names = await getAllTopicNames(db);
    return names;
}

export async function fetchRelatedTopicNames(topicIds) {
    if (!db) db = await openDB();
    const relatedNames = await getRelatedTopicNames(db, topicIds);
    return relatedNames;
}

export async function fetchRelatedExamples(topicId) {
    if (!db) db = await openDB();
    const relatedExamples = await getRelatedExamples(db, topicId)
    return relatedExamples;
}

// export default db;

